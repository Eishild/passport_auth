import { useState } from "react";
import { Link, redirect } from "react-router-dom";
import axios from "axios";

export const Register = (props) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await axios.post("http://localhost:8000/register", {
			username,
			email,
			password,
		});
		if (response.data.isRegistered) {
			redirect("/");
		}
		setUsername("");
		setEmail("");
		setPassword("");
	};

	return (
		<>
			<div className="register-container">
				<h1>S'enregistrer</h1>
				<form className="form-register" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="User name"
						name="username"
						id="username"
						onChange={(e) => setUsername(e.target.value)}
						required
						autoComplete="off"
					/>
					<input
						type="email"
						placeholder="Adresse e-mail"
						name="email"
						id="email"
						onChange={(e) => setEmail(e.target.value)}
						required
						autoComplete="off"
					/>
					<input
						type="password"
						placeholder="Mot de passe"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						autoComplete="off"
					/>
					<div>
						<button className="button">S'enregistrer</button>
					</div>
				</form>
				<div className="container-signin">
					<p>
						Vous êtes déja enregistré ?{" "}
						<Link to={"/login"}>Connectez vous!</Link>.
					</p>
				</div>
			</div>
		</>
	);
};
