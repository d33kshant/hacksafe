import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

const ITEMS_PER_PAGE = 10

export async function getOffers(req: NextApiRequest, res: NextApiResponse) {
	const _page = Array.isArray(req.query.page) ? req.query.page[0] : req.query.page
	const page = parseInt(_page) || 1
	const offset = (page - 1) * ITEMS_PER_PAGE
	try {
		const _offers = await prisma.offer.findMany({
			skip: offset,
			take: ITEMS_PER_PAGE,
			include: {
				_count: true
			}
		})
		const offers = _offers.map(offer => ({
			id: offer.id,
			points: offer.points,
			benefits: offer.benefits,
			redeemedBy: offer._count.redeemedBy
		}))
		res.json(offers)
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}