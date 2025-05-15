import "./Header.scss";

// need to add alternate header for authenticated users

function Header() {
	return (
		<div className="header">
			<div className="header-logo">FASCO</div>
			<div className="header-navigator">
				<button className="header-navigator__link">Home</button>
				<button className="header-navigator__link">Deals</button>
				<button className="header-navigator__link">New Arriwals</button>
				<button className="header-navigator__link">Packages</button>
				<button className="header-navigator__link">Sign in</button>
				<button className="header-navigator__link header-navigator__link-black">Sign up</button>
			</div>
		</div>
	);
}

export default Header;
