import { useEffect, useState } from "react";
import styles from "./TokenDashboard.module.css";
import {
	fetchAllUsers,
	nextTokenAPI,
	addUserAPI,
} from "./TokenDashboardServices";

const TokenDashboard = function () {
	const [users, setUsers] = useState([]);
	const [currentUser, setCurrentUser] = useState(-1);

	// `Add user` form states
	const [formName, setFormName] = useState("");
	const [formPhone, setformPhone] = useState("");
	const [formToken, setformToken] = useState("");

	const onNextTokenClick = async (e) => {
		if (currentUser === users.length - 1) {
			// if last user is already active
			return;
		}

		try {
			const data = await nextTokenAPI(
				currentUser === -1 ? null : users[currentUser].id,
				users[currentUser + 1].id
			);

			console.log(data);
			setCurrentUser((user) => user + 1);
		} catch (e) {
			console.error(e.message);
		}
	};

	const onAddUserClick = async (e) => {
		if (formName === "" || formPhone.length > 10) {
			console.error("Cannot add user with empty name or invalid number");
			return;
		}
		try {
			const data = await addUserAPI(formName, formPhone, formToken);
			setFormName("");
			setformPhone("");
			setUsers((users) => [...users, data.user]);
		} catch (e) {
			console.log(e.message);
		}
	};

	const updateAllUsers = async () => {
		const _users = await fetchAllUsers();
		setUsers(_users);
		setCurrentUser(_users.findIndex((user) => user.isactive));
	};

	useEffect(() => {
		// TODO set users dynamically
		updateAllUsers();
	}, []);

	useEffect(() => {
		setformToken("T-" + (users.length + 1));
	}, [users]);

	if (currentUser >= users.length) {
		console.log(`Current user at ${currentUser}th does not exist`);
	}

	return (
		<div className={styles.container}>
			<h1>Token Dashboard</h1>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Phone</th>
						<th>Token</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, i) => {
						return (
							<tr
								key={i}
								className={
									currentUser === i ? styles.active : ""
								}
							>
								<td>{user.name}</td>
								<td>{user.phone}</td>
								<td>{user.token}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className={styles.nextTokenContainer}>
				<button className={styles.button} onClick={onNextTokenClick}>
					Next token
				</button>
			</div>
			<div className={styles.formContainer}>
				<h2>Add user</h2>
				<div className={styles.form}>
					<div className={styles.inputs}>
						<input
							placeholder="Name"
							value={formName}
							onInput={(e) => setFormName(e.target.value)}
						/>
						<input
							placeholder="Phone"
							value={formPhone}
							onInput={(e) => setformPhone(e.target.value)}
						/>
						<input
							placeholder="Token"
							value={formToken}
							onInput={(e) => setformToken(e.target.value)}
						/>
					</div>
					<input
						type="button"
						value="Add"
						className={styles.button}
						onClick={onAddUserClick}
					/>
				</div>
			</div>
		</div>
	);
};

export default TokenDashboard;
