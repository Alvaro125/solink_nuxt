import Link from "~/server/models/link";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    try {
      const link = new Link({
        content: body.content,
        redirect: body.redirect
      });
      const savedLink = await link.save();
      return savedLink;
    } catch (error:any) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      })
    }
  });