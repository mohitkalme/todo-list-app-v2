// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { id, value, completed } = req.body;
    if (completed) {
      const updateUser = await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          completed,
        },
      });
      res.status(201).json(updateUser);
    }
    if (value) {
      const updateUser = await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          value,
        },
      });
      res.status(201).json(updateUser);
    }
  } catch (e) {
    res.status(500).json({ message: "You must be logged in." });
  }
}
