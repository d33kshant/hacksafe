export default function ({ src, ...props }) {
	return (
		<video controls controlsList="nodownload" {...props}>
			<source src={src} />
		</video>
	)
}
