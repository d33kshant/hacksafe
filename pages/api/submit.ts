import { createdSubmission, getSubmission } from "@/controllers/submission"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'GET': return getSubmission(req, res)
		case 'POST': return createdSubmission(req, res)
		default: return res.json({ error: `Method '${req.method}' allowed.` })
	}
}