import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function GET(req, { params }) {
  try {
    const { newsID } = params;

    const news = await prisma.news.findUnique({
      where: {
        newsID: newsID,
      },
    });

    if (!news) {
      return NextResponse.json(
        {
          Error: "News not found",
          Message:
            "The requested news does not exist in the system. Please verify the news ID and try again.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { newsID } = params;
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

    const news = await prisma.news.findUnique({
      where: { newsID: newsID },
    });

    if (!news) {
      return NextResponse.json(
        {
          Error: "News not found",
          Message:
            "The requested news does not exist in the system. Please verify the news ID and try again.",
        },
        { status: 404 },
      );
    }

    const newData = await prisma.news.update({
      where: {
        newsID: newsID,
      },
      data: {
        title: title,
        imageUrl: imageUrl,
        imageDesc: imageDesc,
        content: content,
        author: author,
      },
    });

    return NextResponse.json({
      message: "Success",
      data: newData,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { newsID } = params;

    const news = await prisma.news.findUnique({
      where: {
        newsID: newsID,
      },
    });

    if (!news) {
      return NextResponse.json(
        {
          Error: "News not found",
          Message:
            "The requested news does not exist in the system. Please verify the news ID and try again.",
        },
        { status: 404 },
      );
    }

    await prisma.news.delete({
      where: {
        newsID: newsID,
      },
    });

    return NextResponse.json({
      message: "Sucess delete news",
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
