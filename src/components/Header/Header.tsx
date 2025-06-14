import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router";

import "./Header.scss";
import CartIcon from "../../assets/images/cart.png";
import UserIcon from "../../assets/images/user.png";
import LogoutIcon from "../../assets/images/logout.png";

import { AUTH_TYPES } from "../../utils/helpers";
import { logout } from "../../app/authSlice";
import { openCart } from "../../app/cartSlice";
import { resetFilters, setCurrentPage } from "../../app/productSlice";
import { AppDispatch, RootState } from "../../app/store";

function Header() {
	const user = useSelector((state: RootState) => state.auth.user);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate("/auth");
	};

	const handleOpenCart = () => dispatch(openCart());

	const toProductsHandler = () => {
		dispatch(resetFilters());
		dispatch(setCurrentPage(1));
	};

	return (
		<div className="header__wrapper">
			<div className="header">
				<div className="header__section logo">FASCO</div>
				<div className={`header__section ${!user ? "flex-ended" : ""}`}>
					<NavLink className="header__section__link" to="/">
						Home
					</NavLink>
					<NavLink className="header__section__link" onClick={toProductsHandler} to="/shop/1" end={false}>
						Deals
					</NavLink>
					<NavLink className="header__section__link" to="/arriwals">
						Arriwals
					</NavLink>
					<NavLink className="header__section__link" to="/basket">
						Basket
					</NavLink>
				</div>
				<div className={`header__section ${user ? "flex-ended" : ""}`}>
					{!user ? (
						<>
							<NavLink
								className="header__section__link"
								to="/auth"
								state={{
									type: AUTH_TYPES.SIGN_IN,
								}}
							>
								Sign in
							</NavLink>
							<Link
								className="header__section__link black"
								to="/auth"
								state={{
									type: AUTH_TYPES.SIGN_UP,
								}}
							>
								Sign up
							</Link>
						</>
					) : (
						<>
							<img
								src={UserIcon}
								alt="#"
								className="header__section__link icon"
								onClick={() => {
									console.log("to profile");
								}}
							/>
							<img src={CartIcon} alt="#" className="header__section__link icon" onClick={handleOpenCart} />
							<img src={LogoutIcon} alt="#" className="header__section__link icon" onClick={handleLogout} />
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Header;
