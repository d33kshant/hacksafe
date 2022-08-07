import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

const ITEMS_PER_PAGE = 10

export async function getPosts(req: NextApiRequest, res: NextApiResponse) {
	const _page = Array.isArray(req.query.page) ? req.query.page[0] : req.query.page
	const page = parseInt(_page) || 1
	const offset = (page - 1) * ITEMS_PER_PAGE

	try {
		const total = await prisma.post.count()
		const posts = await prisma.post.findMany({
			skip: offset,
			take: ITEMS_PER_PAGE,
		})

		if (page <= Math.ceil(total / ITEMS_PER_PAGE)) {
			res.setHeader("Content-range", `${offset}-${offset + posts.length}/${total}`)
		}

		res.json(posts)
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}

export async function createPost(req: NextApiRequest, res: NextApiResponse) {
	const user = req["user"]
	if (!user) return res.status(400).json({ error: "Authentication required" })

	const title = req.body.title
	const body = req.body.body
	const ref = req.body.ref

	const _tags: string = req.body.tags || ""
	const tags = _tags
		.trim()
		.split(",")
		.filter((tag) => tag !== "")
		.map((tag) => tag.trim().toLowerCase().replace(" ", "-"))

	try {
		const post = await prisma.post.create({
			data: {
				title,
				body,
				ref,
				authorId: user,
			},
		})
		res.json(post)
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}

export async function updatePost(req: NextApiRequest, res: NextApiResponse) {
	const id: string = Array.isArray(req.query.post) ? req.query.post[0] : req.query.post
	if (!id) return res.status(400).json({ error: "Missing 'post' in query parameter." })

	try {
		const _post = await prisma.post.findUnique({ where: { id } })
		if (!_post) return res.status(404).json({ error: `Video with id '${id}' not found.` })

		const _tags: string = req.body.tags
		const tags = _tags
			? _tags
					.trim()
					.split(",")
					.filter((tag) => tag !== "")
					.map((tag) => tag.trim().toLowerCase().replace(" ", "-"))
			: _post.tags

		const post = await prisma.post.update({
			where: { id },
			data: {
				title: req.body.title || _post.title,
				body: req.body.body || _post.body,
				tags,
			},
		})
		res.json(post)
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}

export async function deletePost(req: NextApiRequest, res: NextApiResponse) {
	const id: string = Array.isArray(req.query.post) ? req.query.post[0] : req.query.post

	if (!id) return res.status(400).json({ error: "Missing 'post' in query parameter." })

	try {
		const post = await prisma.post.delete({
			where: { id },
		})
		res.json(post)
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}
