import { getUserFromSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

const ITEMS_PER_PAGE = 10

export async function getQuiz(req: NextApiRequest, res: NextApiResponse) {

	const _page = Array.isArray(req.query.page) ? req.query.page[0] : req.query.page
	const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id
	const page = parseInt(_page) || 1
	const offset = (page - 1) * ITEMS_PER_PAGE
	const user = await getUserFromSession(req, res)

	try {
		if (id) {
			const _quiz = await prisma.quiz.findUnique({
				where: { id },
				include: {
					questions: {
						select: {
							id: true,
							multiple: true,
							question: true,
							options: true,
						}
					},
					_count: true
				}
			})
			if (_quiz) {
				const isSubmitted = await prisma.quizSubmission.findMany({
					where: {
						userId: user?.id
					}
				})
				const quiz = { ..._quiz, likes: _quiz.likes.length, submissions: _quiz._count.submissions }
				await prisma.quiz.update({
					where: { id },
					data: { views: { increment: 1 } }
				})
				res.json({
					...quiz,
					submitted: isSubmitted.length <= 0
				})
			} else {
				res.status(404).json({ error: "Quiz not found." })
			}
		} else {
			const _quizzes = await prisma.quiz.findMany({
				skip: offset,
				take: ITEMS_PER_PAGE,
				include: {
					_count: true
				}
			})
			const quizzes = _quizzes.map(quiz => {
				const questions = quiz._count.questions
				const likes = quiz.likes.length
				const submissions = quiz._count.submissions
				delete quiz.likes
				delete quiz._count
				return { ...quiz, likes, questions, submissions }
			})
			res.json(quizzes)
		}
	} catch (error) {
		res.status(500).json({
			error: "Something went wrong.",
			payload: error,
		})
	}
}
