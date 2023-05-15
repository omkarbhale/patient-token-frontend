import axios from "axios";

export const fetchAllUsers = async () => {
	const response = await axios.get("http://127.0.0.1:3001/tokens/");
	return response?.data;
};

export const nextTokenAPI = async (currentUserId, nextUserId) => {
	console.log("calling next token api");
	const response = await axios.post("http://127.0.0.1:3001/tokens/next", {
		currentUserId,
		nextUserId,
	});
	return response?.data;
	// return { user: { name: "abc", phone: 123, token: "T-102" } };
};

export const addUserAPI = async (name, phone, token) => {
	const response = await axios.post("http://127.0.0.1:3001/tokens/user", {
		name,
		phone,
		token,
	});
	return response?.data;
};
