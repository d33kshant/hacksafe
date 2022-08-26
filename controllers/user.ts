import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function getUser(req: NextApiRequest, res: NextApiResponse) {
	const email = Array.isArray(req.query.email) ? req.query.email[0] : req.query.email
	console.log
	if (!email) return res.json({ error: "Missing user id in query" })
	try {
		const user = await prisma.user.findUnique({
			where: { email },
			select: {
				id: true,
				email: true,
				image: true,
				name: true,
			}
		})
		const rewards = await prisma.reward.findMany({
			where: { recipient: user.id }
		})
		const points = rewards.reduce((p, c) => p + c.points, 0)
		if (user) return res.json({ ...user, points })
		res.json({ error: "User not found." })
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}