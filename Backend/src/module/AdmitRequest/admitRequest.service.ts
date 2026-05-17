// ======================================
// admitRequest.service.ts
// ======================================

import AdmitRequest from "./admitRequest.model";

import Room from "../Room/room.model";

// CREATE

const createAdmitRequest =
    async (
        payload: any
    ) => {

        return await AdmitRequest.create(
            payload
        );
    };

// GET ALL

const getAllAdmitRequests =
    async () => {

        return await AdmitRequest.find()
            .populate({
                path: "patient",
                populate: {
                    path: "user",
                },
            })
            .populate({
                path: "doctor",
                populate: {
                    path: "user",
                },
            })
            .populate("room")
            .sort({
                createdAt: -1,
            });
    };

// ADMIT PATIENT

const admitPatient =
    async (
        id: string,
        roomId: string
    ) => {

        const room =
            await Room.findById(
                roomId
            );

        if (!room) {

            throw new Error(
                "Room not found"
            );
        }

        room.status =
            "Occupied";

        await room.save();

        return await AdmitRequest.findByIdAndUpdate(
            id,
            {
                room:
                    roomId,

                status:
                    "Admitted",
            },
            {
                new: true,
            }
        );
    };

// ADD DOCTOR VISIT

const addDoctorVisit =
    async (
        id: string,
        payload: any
    ) => {

        const admit =
            await AdmitRequest.findById(
                id
            );

        if (!admit) {

            throw new Error(
                "Admit request not found"
            );
        }

        admit.doctorVisits?.push(
            payload
        );

        await admit.save();

        return admit;
    };

// ADD MEDICINE

const addMedicine =
    async (
        id: string,
        medicines: any[]
    ) => {

        const admit =
            await AdmitRequest.findById(
                id
            );

        if (!admit) {

            throw new Error(
                "Admit request not found"
            );
        }

        admit.medicines?.push(
            ...medicines
        );

        await admit.save();

        return admit;
    };

// ADD TEST REQUEST

const addTestRequest =
    async (
        id: string,
        tests: any[]
    ) => {

        const admit =
            await AdmitRequest.findById(
                id
            );

        if (!admit) {

            throw new Error(
                "Admit request not found"
            );
        }

        admit.testRequests?.push(
            ...tests
        );

        await admit.save();

        return admit;
    };

// UPDATE LAB TEST STATUS

const updateLabTestStatus =
    async (
        admitId: string,
        index: number,
        payload: any
    ) => {

        const admit =
            await AdmitRequest.findById(
                admitId
            );

        if (!admit) {

            throw new Error(
                "Admit request not found"
            );
        }

        const test =
            admit.testRequests?.[
            index
            ];

        if (!test) {

            throw new Error(
                "Test not found"
            );
        }

        if (
            payload.status
        ) {

            test.status =
                payload.status;
        }

        if (
            payload.report
        ) {

            test.report =
                payload.report;
        }

        if (
            payload.reportPdf
        ) {

            test.reportPdf =
                payload.reportPdf;
        }

        admit.markModified(
            "testRequests"
        );

        await admit.save();

        return admit;
    };

// RELEASE PREVIEW

const releasePatient =
    async (
        id: string
    ) => {

        const admit =
            await AdmitRequest.findById(
                id
            )
                .populate(
                    "room"
                )
                .populate({
                    path: "patient",
                    populate: {
                        path: "user",
                    },
                });

        if (!admit) {

            throw new Error(
                "Admit request not found"
            );
        }

        const room: any =
            admit.room;

        const admitDate =
            admit.createdAt
                ? new Date(
                    admit.createdAt
                )
                : new Date();

        const today =
            new Date();

        const diffTime =
            Math.abs(
                today.getTime() -
                admitDate.getTime()
            );

        const stayDays =
            Math.ceil(
                diffTime /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            ) || 1;

        let roomBill =
            0;

        if (room) {

            roomBill =
                room.price *
                stayDays;
        }

        const testBill =
            admit.testRequests?.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    Number(
                        item.price
                    ),
                0
            ) || 0;

        const doctorBill =
            admit.doctorVisits?.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    Number(
                        item.fee
                    ),
                0
            ) || 0;

        admit.bills = [];

        if (room) {

            admit.bills.push(
                {
                    title:
                        `Room Charge (${stayDays} Days)`,

                    amount:
                        roomBill,
                }
            );
        }

        admit.testRequests?.forEach(
            (
                test
            ) => {

                admit.bills?.push(
                    {
                        title:
                            `Lab Test - ${test.testName}`,

                        amount:
                            test.price,
                    }
                );
            }
        );

        admit.doctorVisits?.forEach(
            (
                visit
            ) => {

                admit.bills?.push(
                    {
                        title:
                            `Doctor Visit - ${visit.doctorName}`,

                        amount:
                            visit.fee,
                    }
                );
            }
        );

        admit.totalBill =
            roomBill +
            testBill +
            doctorBill;

        await admit.save();

        return {
            admit,
            stayDays,
            roomBill,
            testBill,
            doctorBill,
            totalBill:
                admit.totalBill,
        };
    };

// CONFIRM BILL

const confirmBill =
    async (
        id: string
    ) => {

        const admit =
            await AdmitRequest.findById(
                id
            );

        if (!admit) {

            throw new Error(
                "Admit request not found"
            );
        }

        admit.status =
            "Released";

        admit.isBillConfirmed =
            true;

        admit.releasedAt =
            new Date();

        if (
            admit.room
        ) {

            await Room.findByIdAndUpdate(
                admit.room,
                {
                    status:
                        "Available",
                }
            );
        }

        await admit.save();

        return admit;
    };

export const AdmitRequestServices =
{
    createAdmitRequest,

    getAllAdmitRequests,

    admitPatient,

    addDoctorVisit,

    addMedicine,

    addTestRequest,

    updateLabTestStatus,

    releasePatient,

    confirmBill,
};