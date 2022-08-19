import { rewardPoint } from "@/controllers/points";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'POST': return rewardPoint(req, res)
		default: return res.status(405).json({ error: `Invalid method '${req.method}'` })
	}
}