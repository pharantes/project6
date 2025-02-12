import dbConnect from "../../../../db/connect";
import Comment from "../../../../db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const { id } = request.query;
      const foundComments = await Comment.find({ placeId: id });
      response.status(200).json(foundComments);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  if (request.method === "POST") {
    try {
      const commentData = request.body;
      console.log(commentData);
      await Comment.create(commentData);
      response.status(201).json({ status: "Comment created" });
      return;
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    const { id } = request.query;
    await Comment.findByIdAndDelete(id);
    response
      .status(200)
      .json({ status: `Comment ${id} successfully deleted.` });
  }

  response.status(405).json({ message: "Method not allowed" });
}
