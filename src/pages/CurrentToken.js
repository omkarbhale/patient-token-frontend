import { useEffect, useState } from "react";

import { socket } from "../socket";
import styles from "./CurrentToken.module.css";
import { currentTokenAPI } from "./CurrentTokenServices";

const CurrentToken = function () {
	const [token, setToken] = useState("-");
	const [isConnected, setIsConnected] = useState(false);

	const loadCurrentToken = async () => {
		const data = await currentTokenAPI();
		setToken(data.token);
	};

	useEffect(() => {
		// load token first time from API
		loadCurrentToken();

		// set up socket events
		socket.on("connect", () => {
			setIsConnected(true);
		});

		socket.on("disconnect", () => {
			setIsConnected(false);
		});

		socket.on("connect_error", () => {
			// Will retry
			console.log("Could not connect to socket");
		});

		socket.on("token-update", (token) => {
			console.log("token updated with args:", token);
			setToken(token);
		});
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div
					className={`${styles.socketstatus} ${
						isConnected ? styles.connected : ""
					}`}
				>
					{isConnected ? "Connected" : "Not connected"}
				</div>
				<div className={styles.header}>Current Token:</div>
				<div className={styles.tokentext}>{token}</div>
			</div>
		</div>
	);
};

export default CurrentToken;
