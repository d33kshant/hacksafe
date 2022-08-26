import { getUserFromSession } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

const ITEMS_PER_PAGE = 10

export async function getBlogs(req: NextApiRequest, res: NextApiResponse) {
	const _page = Array.isArray(req.query.page) ? req.query.page[0] : req.query.page
	const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id
	const author = Array.isArray(req.query.author) ? req.query.author[0] : req.query.author
	const user = await getUserFromSession(req, res)
	const page = parseInt(_page) || 1
	const offset = (page - 1) * ITEMS_PER_PAGE

	try {
		if (id) {
			const blog = await prisma.blog.findUnique({
				where: { id }
			})
			await prisma.blog.update({
				where: { id },
				data: { views: { increment: 1 } }
			})
			if (blog) {
				const author = await prisma.user.findUnique({
					where: {
						id: blog.author
					},
					include: {
						rewards: {
							where: { item: id }
						}
					}
				})
				return res.json({
					...blog,
					author: {
						id: author.id,
						name: author.name,
						image: author.image
					},
					likes: blog.likes.length,
					liked: blog.likes.indexOf(user?.id) !== -1,
					earned: author.rewards.length > 0
				})
			}
			else return res.status(404).json({
				error: "Blog not found"
			})
		} else if (author) {
			const blogs = await prisma.blog.findMany({
				where: { author }
			})
			const user = await getUserFromSession(req, res)
			if (user?.id === author) {
				res.json(blogs)
			} else {
				for (const blog of blogs) {
					delete blog.status
				}
				res.json(blogs)
			}
		} else {
			const total = await prisma.blog.count()
			const blogs = await prisma.blog.findMany({
				where: {
					status: "Published"
				},
				skip: offset,
				take: ITEMS_PER_PAGE,
				select: {
					id: true,
					title: true,
					tags: true,
					banner: true,
					points: true,
					createdAt: true,
					views: true,
					likes: true
				}
			})

			if (page <= Math.ceil(total / ITEMS_PER_PAGE)) {
				res.setHeader("Content-range", `${offset}-${offset + blogs.length}/${total}`)
			}
			res.json(blogs.map((post) => {
				return { ...post, likes: post.likes.length }
			}))
		}
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}

export async function createBlog(req: NextApiRequest, res: NextApiResponse) {
	const user = await getUserFromSession(req, res)
	if (!user) return res.status(400).json({ error: "Authentication required" })

	const title: string = req.body.title
	const body: string = req.body.body
	const banner: string = req.body.banner

	if (!title || !body) return res.json({ error: "Missing `title` and `body` field in request body." })

	const _tags: string = req.body.tags || ""
	const tags = _tags
		.trim()
		.split(",")
		.filter((tag) => tag !== "")
		.map((tag) => tag.trim().toLowerCase().replace(" ", "-"))

	try {
		const post = await prisma.blog.create({
			data: {
				title,
				body,
				banner,
				tags,
				author: user.id,
				status: 'Pending'
			}
		})
		res.json(post)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}

export async function updateBlog(req: NextApiRequest, res: NextApiResponse) {

}

export async function deleteBlog(req: NextApiRequest, res: NextApiResponse) {

}

export async function likeBlog(req: NextApiRequest, res: NextApiResponse) {
	const id: string = Array.isArray(req.query.blog) ? req.query.blog[0] : req.query.blog
	const user = await getUserFromSession(req, res)
	if (!user) return res.status(400).json({ error: "Authentication required" })

	try {
		const { likes } = await prisma.blog.findUnique({
			where: { id },
			select: { likes: true },
		})
		if (likes.indexOf(user.id) !== -1) {
			await prisma.blog.update({
				where: { id },
				data: {
					likes: {
						set: likes.filter((value) => value !== user.id),
					},
				},
			})
			res.json({ liked: false })
		} else {
			await prisma.blog.update({
				where: { id },
				data: {
					likes: {
						push: user.id,
					},
				},
			})
			res.json({ liked: true })
		}
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}