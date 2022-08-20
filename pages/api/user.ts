import { getUser } from "@/controllers/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "GET":
			return getUser(req, res)
		default:
			return res.status(405).json({ error: `Invalid method '${req.method}'` })
	}
}