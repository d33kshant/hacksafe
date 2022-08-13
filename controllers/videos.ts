import { getUserFromSession } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

const ITEMS_PER_PAGE = 10

export async function getVideos(req: NextApiRequest, res: NextApiResponse) {
	const _page = Array.isArray(req.query.page) ? req.query.page[0] : req.query.page
	const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id
	const page = parseInt(_page) || 1
	const offset = (page - 1) * ITEMS_PER_PAGE

	try {
		if (id) {
			const video = await prisma.video.findUnique({
				where: { id }
			})
			if (video) {
				return res.json({ ...video, likes: video.likes.length })
			}
			else return res.status(404).json({
				error: "Post not found"
			})
		} else {

			const total = await prisma.video.count()
			const videos = await prisma.video.findMany({
				skip: offset,
				take: ITEMS_PER_PAGE,
				select: {
					id: true,
					title: true,
					updatedAt: true,
					thumbnail: true,
					views: true,
					likes: true
				}
			})

			if (page <= Math.ceil(total / ITEMS_PER_PAGE)) {
				res.setHeader("Content-range", `${offset}-${offset + videos.length}/${total}`)
			}

			res.json(videos.map(video => ({ ...video, likes: video.likes.length })))
		}
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}

export async function postVideo(req: NextApiRequest, res: NextApiResponse) {
	const title: string = req.body.title
	const description: string = req.body.description
	const thumbnail: string = req.body.thumbnail
	const url: string = req.body.url

	if (!title || !description || !url || !thumbnail) {
		return res.status(400).json({ error: "Missing required field in request body." })
	}

	const _tags: string = req.body.tags || ""
	const tags = _tags
		.trim()
		.split(",")
		.filter((tag) => tag !== "")
		.map((tag) => tag.trim().toLowerCase().replace(" ", "-"))

	try {
		const video = await prisma.video.create({
			data: {
				url,
				tags,
				title,
				description,
				thumbnail,
			},
		})
		res.json(video)
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}

export async function updateVideo(req: NextApiRequest, res: NextApiResponse) {
	const id: string = Array.isArray(req.query.post) ? req.query.post[0] : req.query.post
	if (!id) return res.status(400).json({ error: "Missing 'post' in query parameter." })

	try {
		const _video = await prisma.video.findUnique({ where: { id } })
		if (!_video) return res.status(404).json({ error: `Video with id '${id}' not found.` })

		const _tags: string = req.body.tags
		const tags = _tags
			? _tags
				.trim()
				.split(",")
				.filter((tag) => tag !== "")
				.map((tag) => tag.trim().toLowerCase().replace(" ", "-"))
			: _video.tags

		const video = await prisma.video.update({
			where: { id },
			data: {
				title: req.body.title || _video.title,
				description: req.body.description || _video.description,
				tags,
			},
		})
		res.json(video)
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}

export async function deleteVideo(req: NextApiRequest, res: NextApiResponse) {
	const id: string = Array.isArray(req.query.post) ? req.query.post[0] : req.query.post

	if (!id) return res.status(400).json({ error: "Missing 'post' in query parameter." })

	try {
		const video = await prisma.video.delete({
			where: { id },
		})
		res.json(video)
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}

export async function likeVideo(req: NextApiRequest, res: NextApiResponse) {
	const id: string = Array.isArray(req.query.video) ? req.query.post[0] : req.query.video
	const user = await getUserFromSession(req, res)
	if (!user) return res.status(400).json({ error: "Authentication required" })

	try {
		const { likes } = await prisma.video.findUnique({
			where: { id },
			select: { likes: true },
		})
		if (likes.indexOf(user.id) !== -1) {
			await prisma.video.update({
				where: { id },
				data: {
					likes: {
						set: likes.filter((value) => value !== user.id),
					},
				},
			})
			res.json({ liked: false })
		} else {
			await prisma.video.update({
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
