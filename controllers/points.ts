import { getUserFromSession } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

const ItemTypes = {
	VIDEO_TYPE: 'video',
	BLOG_TYPE: 'blog',
	QUIZ_TYPE: 'quiz'
}

function getClientForType(type: string) {
	switch (type) {
		case ItemTypes.VIDEO_TYPE: return prisma.video
		case ItemTypes.BLOG_TYPE: return prisma.blog
		case ItemTypes.QUIZ_TYPE: return prisma.quiz
		default: return { error: "Invalid item type '" + type + "'" }
	}
}

export async function rewardPoint(req: NextApiRequest, res: NextApiResponse) {
	const user = await getUserFromSession(req, res)
	if (!user) return res.status(400).json({ error: "Authentication required" })

	const id: string = req.body.id
	const type: string = req.body.type

	try {
		const client: any = getClientForType(type)
		if (client.error) return res.json({ error: client.error })

		const item = await client.findUnique({ where: { id } })
		if (!item) return res.status(404).json({ error: `'${type}' with id '${id}' not found.` })

		const issuedAt = new Date()
		const expiresAt = new Date(issuedAt.toDateString())
		expiresAt.setDate(issuedAt.getDate() + 3)

		const reward = await prisma.reward.create({
			data: {
				type,
				item: id,
				issuedAt,
				expiresAt,
				recipient: user.id,
				points: item.points
			}
		})
		res.json({ message: `You won ${item.points} points!`, reward })
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}

export async function redeemPoints(req: NextApiRequest, res: NextApiResponse) {
	try {
		// TODO: Redeem
		res.json({ message: "TODO: Redeem feature" })
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}