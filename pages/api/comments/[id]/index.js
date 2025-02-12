import dbConnect from "../../../../db/connect";
import Comment from "../../../../db/models/Comment";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const { id } = req.query;
    const foundComments = await Comment.find({ placeId: id });
    res.status(200).json(foundComments);
    return;
  }

  if (req.method === "POST") {
    try {
      const commentData = req.body;
      await Comment.create(commentData);
      res.status(201).json({ status: "Comment created" });
      return;
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    await Comment.findByIdAndDelete(id);
    res
      .status(200)
      .json({ status: `Comment ${id} successfully deleted.` });
  }

  res.status(405).json({ message: "Method not allowed" });
}
