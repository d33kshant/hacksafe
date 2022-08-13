import { Grid, Skeleton } from "@mui/material"

export default function () {
	return (
		<Grid item xs={12} sm={6} md={3}>
			<Skeleton variant="rectangular" height={170} />
			<Skeleton variant="rectangular" height={18} sx={{ my: 1 }} />
			<Skeleton variant="rectangular" height={16} width="60%" />
		</Grid>
	)
}
