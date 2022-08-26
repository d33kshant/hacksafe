import { Stars } from "@mui/icons-material"
import { Chip } from "@mui/material"

export default function ({ value, sx, ...props }) {
	return (
		<Chip
			sx={sx}
			icon={<Stars fontSize="small" />}
			color="warning"
			label={value + " points"}
			{...props}
		/>
	)
}
