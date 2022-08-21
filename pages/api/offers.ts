import { getOffers } from "@/controllers/offers"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'GET': return getOffers(req, res)
		default: res.status(405).json({ error: `Invalid method '${req.method}'` })
	}
}