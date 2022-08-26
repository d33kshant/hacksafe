import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Stack,
	TextField,
	useMediaQuery,
	useTheme,
} from "@mui/material"
import { useState } from "react"

const INIT_STATE = {
	title: "",
	body: "",
	tags: "",
	ref: "",
}

export default function NewPostDialog({ reference, open, onClose, onSubmit }) {
	const theme = useTheme()
	const fullScreem = useMediaQuery(theme.breakpoints.down("md"))

	const [formState, setFormState] = useState(INIT_STATE)

	const onInputChange = (event) => {
		const _formState = { ...formState }
		_formState["ref"] = reference || ""
		_formState[event.target.name] = event.target.value
		setFormState(_formState)
	}

	return (
		<Dialog fullScreen={fullScreem} open={open} onClose={onClose}>
			<DialogTitle>{reference ? "Reply" : "Ask a question"}</DialogTitle>
			<DialogContent>
				<Stack sx={{ minWidth: "500px" }} gap={1}>
					{!reference && (
						<DialogContentText>
							Make sure to describe your question in way that
							people can uderstand it easly, It make your question
							get answered ASAP.
						</DialogContentText>
					)}
					{!reference && (
						<TextField
							name="title"
							value={formState.title}
							onChange={onInputChange}
							variant="filled"
							label="Title"
							placeholder="A short descriptive title"
						/>
					)}
					<TextField
						name="body"
						value={formState.body}
						onChange={onInputChange}
						multiline
						maxRows={10}
						minRows={4}
						variant="filled"
						label={reference ? "Reply" : "Description"}
						placeholder={
							reference
								? "Write a good reply here"
								: "Describe your question"
						}
					/>
					{!reference && (
						<TextField
							name="tags"
							value={formState.tags}
							onChange={onInputChange}
							variant="filled"
							label="Tags"
							placeholder="Tags help get answered fast. eg: first-question, learn, new-post etc."
						/>
					)}
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => {
						onSubmit(formState)
						setFormState(INIT_STATE)
					}}
				>
					{reference ? "Reply" : "Post Question"}
				</Button>
				<Button onClick={onClose} color="error">
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	)
}
