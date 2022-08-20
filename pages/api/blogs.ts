import { createBlog, deleteBlog, getBlogs, updateBlog } from "@/controllers/blogs"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "GET":
			return getBlogs(req, res)
		case "POST":
			return createBlog(req, res)
		case "PUT":
			return updateBlog(req, res)
		case "DELETE":
			return deleteBlog(req, res)
		default:
			return res.status(405).json({ error: `Invalid method '${req.method}'` })
	}
}

