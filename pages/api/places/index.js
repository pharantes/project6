import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const places = await Place.find();

    res.status(200).json(places);
    return;
  }

  if (req.method === "POST") {
    try {
      const placeData = req.body;
      await Place.create(placeData);

      res.status(201).json({ status: "Place created" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
  res.status(405).json({ status: "Method not allowed." });
}
