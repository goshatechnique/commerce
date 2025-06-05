import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import Arrivals from "../../components/Arrivals/Arrivals";
import Deals from "../../components/Deals/Deals";
import Sales from "../../components/Sales/Sales";

import { changeFilters, resetFilters } from "../../app/productSlice";
import { BRANDS_LOGO } from "../../utils/helpers";
import "./Home.scss";

function Home() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function toProductsWithFilter(tag) {
		dispatch(resetFilters());
		dispatch(changeFilters({ category: "brand", tag }));
		navigate("/shop/1");
	}

	return (
		<div className="Home">
			<Sales />

			<div className="brands-navigator">
				{BRANDS_LOGO.map((brand, id) => (
					<img
						key={id}
						className="brands-navigator__link"
						src={brand.logo}
						alt={brand.brandname}
						onClick={() => toProductsWithFilter(brand.brandname)}
					/>
				))}
			</div>

			<Deals />

			<Arrivals />
		</div>
	);
}

export default Home;
