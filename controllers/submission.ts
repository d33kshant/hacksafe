import prisma from "@/lib/prisma"
import { getUserFromSession } from "@/lib/auth"
import { NextApiRequest, NextApiResponse } from "next"

export async function getSubmission(req: NextApiRequest, res: NextApiResponse) {
	const id: string = Array.isArray(req.query.video) ? req.query.post[0] : req.query.video
	const user = await getUserFromSession(req, res)
	if (!user) return res.status(400).json({ error: "Authentication required" })

	try {
		const submission = await prisma.quizSubmission.findUnique({
			where: { id },
			include: {
				quiz: true
			}
		})

		if (submission.userId !== user.id) return res.json({ error: "Not allowed to view this submission." })

		res.json(submission)
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}

export async function createdSubmission(req: NextApiRequest, res: NextApiResponse) {
	const id: string = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id
	const user = await getUserFromSession(req, res)
	if (!user) return res.status(400).json({ error: "Authentication required" })

	const _submission = req.body

	// Validate submission format - Mapping<QuestionId, SelectedAnswersIndex>
	for (const question of Object.keys(_submission)) {
		const answers = _submission[question]
		_submission[question] = new String(answers)
	}

	try {
		const exist = ((await prisma.quiz.count({ where: { id } })) === 1)
		if (!exist) return res.status(404).json({ error: "Quiz not found." })

		const submission = await prisma.quizSubmission.create({
			data: {
				answers: JSON.stringify(_submission),
				quizId: id,
				userId: user.id
			}
		})
		res.json({
			message: "Answers submitted successfully.",
			submission
		})
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}