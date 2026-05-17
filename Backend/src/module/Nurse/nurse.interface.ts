// ======================================
// nurse.interface.ts
// ======================================

import { Types } from "mongoose";

export interface INurse {

    user: Types.ObjectId;

    phone?: string;

    address?: string;

    createdAt?: Date;

    updatedAt?: Date;
}