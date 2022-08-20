import { redeemPoints } from "@/controllers/points";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'POST': return redeemPoints(req, res)
		default: res.status(405).json({ error: `Invalid method '${req.method}'` })
	}
}