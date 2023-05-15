import axios from "axios";

export const currentTokenAPI = async () => {
	const response = await axios.get("http://127.0.0.1:3001/tokens/active");
	return response?.data;
	// return { user: { name: "abc", phone: 123, token: "T-102" } };
};
