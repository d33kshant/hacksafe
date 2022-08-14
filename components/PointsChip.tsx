import { Stars } from "@mui/icons-material"
import { Chip } from "@mui/material"

export default function ({ value }) {
	return <Chip icon={<Stars fontSize="small" />} color="warning" label={value + " points"} />
}
