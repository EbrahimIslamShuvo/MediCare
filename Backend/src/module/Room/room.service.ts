import Room from "./room.model";

// ======================================
// CREATE ROOM
// ======================================

const createRoom =
    async (
        payload: any
    ) => {

        return await Room.create(
            payload
        );
    };

// ======================================
// GET ALL ROOMS
// ======================================

const getAllRooms =
    async () => {

        return await Room.find().sort({
            createdAt: -1,
        });
    };

// ======================================
// GET SINGLE ROOM
// ======================================

const getSingleRoom =
    async (
        id: string
    ) => {

        return await Room.findById(
            id
        );
    };

// ======================================
// UPDATE ROOM
// ======================================

const updateRoom =
    async (
        id: string,
        payload: any
    ) => {

        return await Room.findByIdAndUpdate(
            id,

            payload,

            {
                new: true,
            }
        );
    };

// ======================================
// DELETE ROOM
// ======================================

const deleteRoom =
    async (
        id: string
    ) => {

        return await Room.findByIdAndDelete(
            id
        );
    };

export const RoomServices =
{
    createRoom,

    getAllRooms,

    getSingleRoom,

    updateRoom,

    deleteRoom,
};