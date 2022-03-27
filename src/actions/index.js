export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const DELETE_POST = 'delete_post';

const ROOT_PATH = "blogs";

function getLocalStorage() {
	let data = JSON.parse(localStorage.getItem(ROOT_PATH));
	if (!data) {
		data = []
	}
	return data;
}

function pushLocalStorage(data) {
	localStorage.setItem(ROOT_PATH, JSON.stringify(data))
}

export function fetchPosts() {
	let data = getLocalStorage();
	return {
		type: FETCH_POSTS,
		payload: data
	};
}

export function createPost(values) {
	let data = getLocalStorage();
	data.push(values)
	pushLocalStorage(data);

	return {
		type: CREATE_POST,
		payload: null
	};
}

export function fetchPost(id) {
	let data = getLocalStorage();
	data = data.find(x => x.id === id)

	return {
		type: FETCH_POST,
		payload: data
	};
}

export function deletePost(id) {
	let data = getLocalStorage();
	var index = data.findIndex(function (o) {
		return o.id === id;
	})
	if (index !== -1) data.splice(index, 1);
	pushLocalStorage(data);

	return {
		type: DELETE_POST,
		payload: null
	}
}
