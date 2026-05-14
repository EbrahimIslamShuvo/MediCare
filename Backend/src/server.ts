import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";

import app from "./app";

async function main() {
  try {
    // =========================
    // DATABASE CONNECT
    // =========================

    await mongoose.connect(
      process.env.MONGO_URI as string
    );

    console.log(
      "MongoDB Connected"
    );

    // =========================
    // SERVER START
    // =========================

    const PORT =
      process.env.PORT ||
      3000;

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

main();