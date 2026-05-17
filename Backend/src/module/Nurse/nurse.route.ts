// ======================================
// nurse.route.ts
// ======================================

import express from "express";

import {
    NurseControllers,
} from "./nurse.controller";

const router =
    express.Router();

// CREATE

router.post(
    "/",
    NurseControllers.createNurse
);

// GET ALL

router.get(
    "/",
    NurseControllers.getAllNurses
);

// GET SINGLE

router.get(
    "/:id",
    NurseControllers.getSingleNurse
);

// UPDATE

router.patch(
    "/:id",
    NurseControllers.updateNurse
);

// DELETE

router.delete(
    "/:id",
    NurseControllers.deleteNurse
);

export const NurseRoutes =
    router;