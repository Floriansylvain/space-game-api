import express from "express";
import { z } from "zod";
import { prisma } from "../app";

export const scoreRouter = express.Router();

const scorePostValidator = z.object({
  nickname: z.string(),
  score: z.number(),
});

const scoreGetNicknameValidator = z.object({
  nickname: z.string(),
});

scoreRouter.post("/", async (req, res) => {
  try {
    const data = scorePostValidator.parse(req.body);

    const scores = await prisma.score.findMany({});
    scores.sort((a, b) => a.score + b.score);

    let i = 0;
    for (const score of scores) {
      if (score.score < data.score) break;
      i++;
    }
    const newScore = await prisma.score.create({
      data: { ...data, position: i },
    });
    res.json(newScore);
  } catch (e) {
    res.send(e);
  }
});

scoreRouter.get("/", async (req, res) => {
  try {
    const scores = await prisma.score.findMany({
      take: 5,
      orderBy: [{ score: "desc" }],
    });
    res.json(scores);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});
