import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function getUser(req: NextApiRequest, res: NextApiResponse) {
	const email = Array.isArray(req.query.email) ? req.query.email[0] : req.query.email
	if (!email) return res.json({ error: "Missing user id in query" })
	try {
		const user = await prisma.user.findUnique({
			where: { email },
			select: {
				id: true,
				email: true,
				image: true,
				name: true,
				points: true,
			}
		})
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}