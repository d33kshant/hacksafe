import QuizCard from "@/components/QuizCard"
import QuizSkeleton from "@/components/QuizSkeleton"
import withAppBarAndDrwaer from "@/components/withAppBarAndDrwaer"
import { Paper, Stack } from "@mui/material"
import { useEffect, useState } from "react"

export default function QuizzesPage() {
	const [quizzes, setQuizzes] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchQuizzes = async () => {
			const response = await fetch("/api/quizzes")
			const data = await response.json()
			if (data.error) return alert(data.error)
			setQuizzes(data)
			setLoading(false)
		}
		fetchQuizzes()
	}, [])

	return (
		<Stack width="100%" alignItems="center" p={{ xs: 1, md: 2 }} gap={{ xs: 1, md: 2 }}>
			<Paper sx={{ width: "100%", maxWidth: "1200px" }}>Quizzes</Paper>
			<Paper sx={{ width: "100%", maxWidth: "1200px" }}>
				<Stack>{loading ? <QuizSkeleton /> : quizzes.map((quiz) => <QuizCard key={quiz.id} data={quiz} />)}</Stack>
			</Paper>
		</Stack>
	)
}

QuizzesPage.getLayout = withAppBarAndDrwaer
