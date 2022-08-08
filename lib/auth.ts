import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"
import { config } from "pages/api/auth/[...nextauth]"

export async function getUserFromSession(req: NextApiRequest, res: NextApiResponse) {
	const session = await unstable_getServerSession(req, res, config)
	if (session?.user?.email) {
		const user = await prisma.user.findUnique({ where: { email: session.user.email } })
		return user
	}
	return null
}
