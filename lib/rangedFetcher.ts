export default async function rangedFetcher(args: string) {
	const response = await fetch(args)
	const range = response.headers['Content-range']

	if (!range) throw new Error("Missing range in headers.")

	const data = await response.json()
	return { data, range }
}