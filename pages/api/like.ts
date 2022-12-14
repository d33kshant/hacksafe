import { likeBlog } from "@/controllers/blogs"
import { likePost } from "@/controllers/posts"
import { likeVideo } from "@/controllers/videos"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const post = req.query.post
		const video = req.query.video
		const blog = req.query.blog

		if (post) return likePost(req, res)
		if (video) return likeVideo(req, res)
		if (blog) return likeBlog(req, res)

		return res.status(400).json({ error: "Must specify the type" })
	} else {
		return res.status(405).json({ error: `Method '${req.method}' not allowed.` })
	}
}
