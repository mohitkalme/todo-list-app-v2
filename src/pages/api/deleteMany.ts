import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { userEmail } = req.body;
    let user = null;
    if (userEmail) {
      user = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });
    }
    if (user) {
      const { count } = await prisma.post.deleteMany({
        where: {
          userId: user.id,
          completed: true,
        },
      });
      res.status(200).json({ message: `${count} Task deleted` });
    } else {
      res.status(200).json({ message: "User Doesn't Exist" });
    }
  } catch (e) {
    res.status(500).json({ message: "You must be logged in." });
  }
}
