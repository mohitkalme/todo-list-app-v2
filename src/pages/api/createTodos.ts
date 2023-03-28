// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../prisma/prisma";

import { Post, Prisma } from "@prisma/client";

import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | Error | Post>
) {
  const session: any = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const prismaUser: any = await prisma.user.findUnique({
    where: {
      email: session.user?.email,
    },
  });

  if (!prismaUser) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  try {
    const { value } = req.body;
    const post = await prisma.post.create({
      data: {
        userId: prismaUser?.id,
        value,
      },
    });

    res.status(201).json(post);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        res.status(500).json({
          message:
            "There is a unique constraint violation, a new user cannot be created with this email",
        });
      }
    }
  }
}
