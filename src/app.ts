import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { scoreRouter } from "./api/score";
import "dotenv/config";

export const prisma = new PrismaClient();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function initRoutes() {
  app.get("/v1", (_, res) =>
    res.json({ message: "space-game-api", version: "1.0.0" })
  );
  app.use("/v1/score", scoreRouter);
}

async function initServer() {
  initRoutes();

  app.listen(process.env.API_PORT, () => {
    console.log(`Server listening on :${process.env.API_PORT}`);
  });
}

initServer();
