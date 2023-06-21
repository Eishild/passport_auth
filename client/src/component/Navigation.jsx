import { Link } from "react-router-dom";

export const Navigation = (props) => {
	return (
		<div>
			<nav>
				<ul className="navbar">
					<Link to="login">
						<li>Connection</li>
					</Link>
					<Link to="register">
						{" "}
						<li>Enregistrement</li>
					</Link>
				</ul>
			</nav>
		</div>
	);
};
