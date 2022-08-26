import { reportContent } from "@/controllers/report";
import { NextApiRequest, NextApiResponse } from "next";

export default function handleRequest(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'POST': return reportContent(req, res)
		default: return res.status(405).json({ error: `Method ${req.method} is not allowed.` })
	}
}