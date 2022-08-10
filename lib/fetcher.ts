export default async function (args) {
	const response = await fetch(args)
	const _headers = response.headers
	const data = await response.json()
	return { ...data, _headers }
}