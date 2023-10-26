import prisma from "@/utils/prismaClient";

export const getNews = async () => {
  const news = await prisma.news.findMany();

  return news;
};

export const getNewsDetail = async (newsID) => {
  const news = await prisma.news.findUnique({
    where: {
      newsID: newsID,
    },
  });

  return news;
};

export const createNews = async (data) => {
  const { title, imageUrl, imageDesc, content, author } = data;

  const news = await prisma.news.create({
    data: {
      title: title,
      imageUrl: imageUrl,
      imageDesc: imageDesc,
      content: content,
      author: author,
    },
  });

  return news;
};

export const updateNews = async (newsID, data) => {
  const { title, imageUrl, imageDesc, content, author } = data;

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

  return newData;
};

export const deleteNews = async (newsID) => {
  const deletedNews = await prisma.news.delete({
    where: {
      newsID: newsID,
    },
  });

  return deletedNews;
};
