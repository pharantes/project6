import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";
import Comment from "../../../../db/models/Comment";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const place = await Place.findById(id);
    if (!place) {
      res.status(404).json({ status: "Not Found" });
      return;
    }
    res.status(200).json(place);
    return;
  }

  if (req.method === "PUT") {
    const placeData = req.body;
    await Place.findByIdAndUpdate(id, placeData);
    res.status(200).json({ status: `Place ${id} updated!` });
    return;
  }

  if (req.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    await Comment.deleteMany({ placeId: id })
    res.status(200).json({ status: `Place ${id} successfully deleted.` });
    return;
  }
  res.status(405).json({ status: "Method not allowed." });
}
