import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Stack,
	TextField,
} from "@mui/material"
import { ChangeEvent, useState } from "react"

const INITIAL_STATE = {
	reason: "",
	email: "",
	releventUrl: "",
}

export default function ReportDialog({
	contentId,
	contentType,
	onClose,
	open,
	...props
}) {
	const [formState, setFormState] = useState(INITIAL_STATE)

	const reportContent = async () => {
		const response = await fetch("/api/report", {
			method: "POST",
			headers: {
				Accepts: "application/json",
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				...formState,
				contentId,
				contentType,
			}),
		})
		const data = await response.json()
		if (data.error) return alert(data.error)
		alert(`${data.message}, your report id is ${data.id}`)
		onClose()
	}

	const onFormStateChange = (key: string, value: string) => {
		const _formState = { ...formState }
		_formState[key] = value
		setFormState(_formState)
	}

	const onInputChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => onFormStateChange(event.target.name, event.target.value)

	return (
		<Dialog open={open} onClose={onClose} {...props}>
			<DialogContent>
				<Stack gap={1}>
					<TextField
						name="reason"
						label="Reason"
						onChange={onInputChange}
					/>
					<TextField
						name="email"
						label="Contact Email"
						onChange={onInputChange}
					/>
					<TextField
						name="releventUrl"
						label="Relevent URL"
						onChange={onInputChange}
					/>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={reportContent}>Report</Button>
				<Button onClick={onClose}>Cancel</Button>
			</DialogActions>
		</Dialog>
	)
}
