// These functions are thin wrappers around the native fetch API

function getURL(url: string) {
	return fetch(url, {
		method: "GET",
	})
}

function postURL(url: string, body: any) {
	return fetch(url, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify(body),
	})
}

function deleteURL(url: string) {
	return fetch(url, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "DELETE",
	})
}

const functions = {
	getURL,
	postURL,
	deleteURL,
}

export default functions
