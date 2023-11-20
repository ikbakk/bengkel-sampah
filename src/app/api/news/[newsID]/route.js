import { NextResponse } from "next/server";
import {
  getNewsDetail,
  updateNews,
  deleteNews,
} from "@/utils/prismaQueries/newsRoutes";
import { NotFoundError } from "@/utils/errors";
import { jwtVerify, invalidJwtResponse } from "@/utils/jwtVerify";

export async function GET(req, { params }) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { newsID } = params;

    const news = await getNewsDetail(newsID);

    if (!news) throw new NotFoundError("News not found!");

    return NextResponse.json(
      { message: "News found!", data: news },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.code },
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { newsID } = params;
    const { title, imageUrl, imageDesc, content, author } = await req.json();

    // if (!title || !imageUrl || !imageDesc || !content) {
    //   return NextResponse.json(
    //     {
    //       error: "Validation Error",
    //       message: "Please fill in all required fields.",
    //     },
    //     { status: 422 },
    //   );
    // }

    const news = await getNewsDetail(newsID);

    if (!news) throw new NotFoundError("News not found!");

    const newsData = {
      title,
      imageUrl,
      imageDesc,
      content,
      author,
    };

    const updatedNews = await updateNews(newsID, newsData);

    return NextResponse.json(
      {
        message: "Success update news",
        data: updatedNews,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.code },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const jwt = await jwtVerify();

    if (!jwt) {
      return invalidJwtResponse;
    }
    const { newsID } = params;

    const news = await getNewsDetail(newsID);

    if (!news) throw new NotFoundError("News not found!");

    await deleteNews(newsID);

    return NextResponse.json(
      {
        message: "Sucess delete news",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.code },
    );
  }
}
