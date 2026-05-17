import type {
    Request,
    Response,
} from "express";

import { RoomServices } from "./room.service";

// ======================================
// CREATE ROOM
// ======================================

const createRoom =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const result =
                await RoomServices.createRoom(
                    req.body
                );

            res.status(201).json({
                success: true,

                message:
                    "Room created successfully",

                data: result,
            });

        } catch (error: any) {

            res.status(400).json({
                success: false,

                message:
                    error.message,
            });
        }
    };

// ======================================
// GET ALL ROOMS
// ======================================

const getAllRooms =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const result =
                await RoomServices.getAllRooms();

            res.status(200).json({
                success: true,

                data: result,
            });

        } catch (error: any) {

            res.status(400).json({
                success: false,

                message:
                    error.message,
            });
        }
    };

// ======================================
// GET SINGLE ROOM
// ======================================

const getSingleRoom =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const result =
                await RoomServices.getSingleRoom(
                    req.params.id as string
                );

            res.status(200).json({
                success: true,

                data: result,
            });

        } catch (error: any) {

            res.status(400).json({
                success: false,

                message:
                    error.message,
            });
        }
    };

// ======================================
// UPDATE ROOM
// ======================================

const updateRoom =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const result =
                await RoomServices.updateRoom(
                    req.params.id as string,
                    req.body
                );

            res.status(200).json({
                success: true,

                message:
                    "Room updated successfully",

                data: result,
            });

        } catch (error: any) {

            res.status(400).json({
                success: false,

                message:
                    error.message,
            });
        }
    };

// ======================================
// DELETE ROOM
// ======================================

const deleteRoom =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            await RoomServices.deleteRoom(
                req.params.id as string
            );

            res.status(200).json({
                success: true,

                message:
                    "Room deleted successfully",
            });

        } catch (error: any) {

            res.status(400).json({
                success: false,

                message:
                    error.message,
            });
        }
    };

export const RoomControllers =
{
    createRoom,

    getAllRooms,

    getSingleRoom,

    updateRoom,

    deleteRoom,
};