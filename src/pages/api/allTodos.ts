import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../prisma/prisma";

import { Prisma } from "@prisma/client";

import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session: any = await getServerSession(req, res, authOptions);

  if (!session) {
    res.json({ tasks: [] });
    return;
  }

  let user;

  if (session) {
    user = await prisma.user.findUnique({
      where: {
        email: session.user?.email,
      },
    });
  }
  const tasks = await prisma.post.findMany({
    where: { userId: user?.id },
    orderBy: {
      created_at: "desc",
    },
    include: {
      user: true,
    },
  });

  res.status(200).json({ tasks: tasks });
}
