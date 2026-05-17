// ======================================
// nurse.service.ts
// ======================================

import Nurse from "./nurse.model";

// CREATE NURSE

const createNurse =
    async (
        payload: any
    ) => {

        return await Nurse.create(
            payload
        );
    };

// GET ALL NURSES

const getAllNurses =
    async () => {

        return await Nurse.find()
            .populate(
                "user"
            )
            .sort({
                createdAt: -1,
            });
    };

// GET SINGLE NURSE

const getSingleNurse =
    async (
        id: string
    ) => {

        return await Nurse.findById(
            id
        ).populate(
            "user"
        );
    };

// UPDATE NURSE

const updateNurse =
    async (
        id: string,
        payload: any
    ) => {

        const nurse =
            await Nurse.findById(
                id
            );

        if (!nurse) {

            throw new Error(
                "Nurse not found"
            );
        }

        // UPDATE BASIC INFO

        nurse.phone =
            payload.phone;

        nurse.address =
            payload.address;

        // UPDATE USER INFO

        if (
            nurse.user &&
            payload.name
        ) {

            const User =
                (
                    await import(
                        "../User/user.model"
                    )
                ).default;

            await User.findByIdAndUpdate(
                nurse.user,
                {
                    name:
                        payload.name,

                    email:
                        payload.email,
                }
            );
        }

        await nurse.save();

        return await Nurse.findById(
            id
        ).populate(
            "user"
        );
    };

// DELETE NURSE

const deleteNurse =
    async (
        id: string
    ) => {

        return await Nurse.findByIdAndDelete(
            id
        );
    };

export const NurseServices =
{
    createNurse,

    getAllNurses,

    getSingleNurse,

    updateNurse,

    deleteNurse,
};