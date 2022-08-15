import { Stars } from "@mui/icons-material"
import { Chip } from "@mui/material"

export default function ({ value, ...props }) {
	return <Chip icon={<Stars fontSize="small" {...props} />} color="warning" label={value + " points"} />
}
