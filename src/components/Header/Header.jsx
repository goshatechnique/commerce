import { useSelector } from "react-redux";
import "./Header.scss";
import { useNavigate, NavLink } from "react-router";

// need to add alternate header for authenticated users

function Header() {
	const navigate = useNavigate();

	const user = useSelector((state) => state.auth.user);

	return (
		<div className="header">
			<div className="header-logo">FASCO</div>
			<div className="header-navigator">
				<NavLink className="header-navigator__link" to="/">
					Home
				</NavLink>
				<NavLink className="header-navigator__link" to="/shop">
					Deals
				</NavLink>
				<button className="header-navigator__link">New Arriwals</button>
				<button className="header-navigator__link">Packages</button>
				<NavLink className="header-navigator__link" to="/auth">
					Sign in
				</NavLink>
				<button className="header-navigator__link header-navigator__link-black" onClick={() => navigate("/auth")}>
					Sign up
				</button>
				{user ? <span>Hello {user?.email}</span> : null}
			</div>
		</div>
	);
}

export default Header;
