// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { id } = req.body;
    if (id) {
      const deleteUser = await prisma.post.delete({
        where: {
          id: id,
        },
      });

      res.status(200).json({ message: "Task deleted" });
    }
  } catch (e) {
    res.status(500).json({ message: "You must be logged in.", e });
  }
}
