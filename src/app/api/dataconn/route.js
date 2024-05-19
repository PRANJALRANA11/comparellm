import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req) {
  try {
    const prisma = new PrismaClient();
    await prisma.test.create({
        data: {
          name: 'Rich',
          email: 'hello@prisma.com',
          posts: {
            create: {
              title: 'My first post',
              body: 'Lots of really interesting stuff',
              slug: 'my-first-post',
            },
          },
        },
      })
    
      const allUsers = await prisma.test.findMany({
        include: {
          posts: true,
        },
      })
      console.dir(allUsers, { depth: null })
    
    
    console.log(allUsers);
    return NextResponse.json(allUsers);
  } catch (error) {
    return NextResponse.json(error);
  }
}
