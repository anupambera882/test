import { Request, Response } from 'express';
import { chats } from '../data';
import { Prisma, db } from '../db';

export class chatService {
  static async c(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const post = await db.chat.update({
        where: { id: Number(id) },
        data: {
          viewCount: {
            increment: 1,
          },
        },
      });

      res.json(post);
    } catch (error) {
      res.json({ error: `Post with ID ${id} does not exist in the database` });
    }
  }

  static async d(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const postData = await db.chat.findUnique({
        where: { id: Number(id) },
        select: {
          isGroupChat: true,
        },
      });

      const updatedPost = await db.chat.update({
        where: { id: Number(id) || undefined },
        data: { isGroupChat: !postData?.isGroupChat },
      });
      res.json(updatedPost);
    } catch (error) {
      res.json({ error: `Post with ID ${id} does not exist in the database` });
    }
  }

  static async f(req: Request, res: Response) {
    const { id } = req.params;
    const post = await db.chat.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(post);
  }

  static async e(req: Request, res: Response) {
    const users = await db.user.findMany();
    res.json(users);
  }

  static async g(req: Request, res: Response) {
    const { id } = req.params;

    const drafts = await db.user
      .findUnique({
        where: {
          id: Number(id),
        },
      })
      .chats({
        where: { isGroupChat: false },
      });

    res.json(drafts);
  }

  static async h(req: Request, res: Response) {
    const { id }: { id?: string } = req.params;

    const post = await db.chat.findUnique({
      where: { id: Number(id) },
    });
    res.json(post);
  }

  static async i(req: Request, res: Response) {
    const { searchString, skip, take, orderBy } = req.query;

    const or: Prisma.ChatWhereInput = searchString
      ? {
          OR: [
            { chatName: { contains: searchString as string } },
            { content: { contains: searchString as string } },
          ],
        }
      : {};

    const posts = await db.chat.findMany({
      where: {
        isGroupChat: true,
        ...or,
      },
      include: { groupAdmin: true },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        updatedAt: orderBy as Prisma.SortOrder,
      },
    });

    res.json(posts);
  }

  static async k(req: Request, res: Response) {
    res.send(chats);
  }

  static async l(req: Request, res: Response) {
    const chatId = req.params.id;
    const singleChat = chats.find((chat) => chat._id === chatId);
    res.send(singleChat);
  }
}
