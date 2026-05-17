import express from "express";

import { RoomControllers } from "./room.controller";

const router =
    express.Router();

// ======================================
// CREATE ROOM
// ======================================

router.post(
    "/",
    RoomControllers.createRoom
);

// ======================================
// GET ALL ROOMS
// ======================================

router.get(
    "/",
    RoomControllers.getAllRooms
);

// ======================================
// GET SINGLE ROOM
// ======================================

router.get(
    "/:id",
    RoomControllers.getSingleRoom
);

// ======================================
// UPDATE ROOM
// ======================================

router.patch(
    "/:id",
    RoomControllers.updateRoom
);

// ======================================
// DELETE ROOM
// ======================================

router.delete(
    "/:id",
    RoomControllers.deleteRoom
);

export const RoomRoutes =
    router;