import { getQuiz } from "@/controllers/quizzes"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "GET":
			return getQuiz(req, res)
		case "POST":
		// return createPost(req, res)
		case "PUT":
		// return updatePost(req, res)
		case "DELETE":
		// return deletePost(req, res)
		default:
			return res.status(405).json({ error: `Invalid method '${req.method}'` })
	}
}