import { deleteVideo, getVideos, postVideo, updateVideo } from "@/controllers/videos"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
	// TODO: Auth user and attach to req
	switch (req.method) {
		case "GET":
			return getVideos(req, res)
		case "POST":
			return postVideo(req, res)
		case "PUT":
			return updateVideo(req, res)
		case "DELETE":
			return deleteVideo(req, res)
		default:
			return res.status(405).json({ error: `Invalid method '${req.method}'` })
	}
}
