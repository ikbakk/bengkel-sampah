import { NextResponse } from "next/server";
import { getNews, createNews } from "@/utils/prismaQueries/newsRoutes";

export async function GET() {
  try {
    const news = await getNews();

    return NextResponse.json(
      { message: "Success get news", data: news },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.code },
    );
  }
}

export async function POST(req) {
  try {
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
    const data = {
      title,
      imageUrl,
      imageDesc,
      content,
      author,
    };

    const news = await createNews(data);

    return NextResponse.json(
      {
        message: "Success create news",
        data: news,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: "News Not Created!" }, { status: 500 });
  }
}
