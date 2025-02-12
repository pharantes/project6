import dbConnect from "../../../../db/connect";
import Comment from "../../../../db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const { id } = request.query;
      console.log(id);
      const foundComments = await Comment.find({ placeId: id });
      console.log(foundComments);
      response.status(200).json(foundComments);
      return;
    } catch (error) {
      console.log(error);
    }
  } else {
    response.status(405).json({ message: "Method not allowed" });
    return;
  }
}
