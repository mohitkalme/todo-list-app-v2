import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { userId } = req.body;
    if (userId) {
      const deleteUsers = await prisma.post.deleteMany({
        where: {
          userId: userId,
          completed: true,
        },
      });

      res.status(200).json({ message: "Task deleted" });
    } else {
      res.status(400).json({ message: "Nothing to delete" });
    }
  } catch (e) {
    res.status(500).json({ message: "You must be logged in." });
  }
}
