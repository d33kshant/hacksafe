import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"
import { config } from "pages/api/auth/[...nextauth]"

export async function authorize(req: NextApiRequest, res: NextApiResponse) {
	const session = await unstable_getServerSession(req, res, config)
	const user = session?.user
	if (user) {
		const email = user?.email
		if (email) {
			const _user = await prisma.user.findUnique({
				where: { email },
				select: { email: true, id: true, name: true },
			})
			if (_user) req["user"] = _user
		}
	}
}
