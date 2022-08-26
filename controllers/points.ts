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

		const _reward = await prisma.user.findUnique({
			where: { id: user.id },
			include: {
				rewards: {
					where: { item: id }
				}
			}
		})
		if (_reward.rewards.length > 0) return res.json({ error: "Points already claimed." })

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
		await prisma.user.update({
			where: { id: user.id },
			data: {
				points: {
					increment: item.points
				}
			}
		})
		res.json({ message: `You won ${item.points} points!`, reward, points: item.points })
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}

export async function redeemPoints(req: NextApiRequest, res: NextApiResponse) {
	const user = await getUserFromSession(req, res)
	if (!user) return res.status(400).json({ error: "Authentication required" })
	const id = Array.isArray(req.query.offer) ? req.query.offer[0] : req.query.offer
	try {
		const offer = await prisma.offer.findUnique({ where: { id } })
		if (!offer) return res.json({ error: "Offer not found" })

		const rewards = await prisma.reward.findMany({
			where: { recipient: user.id }
		})
		const points = rewards.reduce((p, c) => p + c.points, 0)

		if (points < offer.points) {
			return res.json({
				error: `You need ${offer.points - points} more points to redeem this offer`
			})
		}
		await prisma.user.update({
			where: { id: user.id },
			data: {
				points: {
					decrement: offer.points
				}
			}
		})
		res.json(offer)
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}