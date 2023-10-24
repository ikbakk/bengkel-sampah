import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function GET() {
  try {
    const news = await prisma.news.findMany();

    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { title, imageUrl, imageDesc, content, author } = await req.json();

    if (!title || !imageUrl || !imageDesc || !content) {
      return NextResponse.json(
        {
          error: "Validation Error",
          message: "Please fill in all required fields.",
        },
        { status: 422 },
      );
    }
    const newData = await prisma.news.create({
      data: {
        title: title,
        imageUrl: imageUrl,
        imageDesc: imageDesc,
        content: content,
        author: author,
      },
    });

    return NextResponse.json(
      {
        message: "Success",
        data: newData,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: "News Not Created!" }, { status: 500 });
  }
}
