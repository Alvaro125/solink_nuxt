import Link from "~/server/models/link";
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  try{
    const link = new Link()
    if(query.redirect){
      return await Link.findOne({content:query.redirect});
    }else{
      return await Link.find({});
    }
  }catch (error:any) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      })
    }

})
