import { getUserFromSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function reportContent(req: NextApiRequest, res: NextApiResponse) {
	const user = await getUserFromSession(req, res)

	const email: string = user ? user.email : req.body.email
	const contentId: string = req.body.contentId
	const contentType: string = req.body.contentType
	const originalUrl: string = req.body.originalUrl
	const reason: string = req.body.reason

	try {
		const report = await prisma.report.create({
			data: {
				contentId,
				contentType,
				email,
				originalUrl,
				reason,
			}
		})
		res.json({
			id: report.id,
			message: `Report was submitted successfully, further information will be provided to ${email}`,
		})
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong."
		})
	}
}