import "./Home.scss";
import Subscribe from "../../components/Subscribe/Subsribe";
import Reviews from "../../components/Reviews/Reviews";
import Features from "../../components/Features/Features";
import Arrivals from "../../components/Arrivals/Arrivals";
import Deals from "../../components/Deals/Deals";
import Sales from "../../components/Sales/Sales";
import Follow from "../../components/Follow/Follow";

function Home() {
	return (
		<div className="Home">
			<Sales />

			<div className="brands-carousel">
				<span>Louis Vuitton</span>
				<span>Nike</span>
				<span>Adidas</span>
				<span>CHANEL</span>
				<span>PRADA</span>
			</div>

			<Deals />

			<Arrivals />

			<Reviews />

			<Features />

			<Follow />

			<Subscribe />
		</div>
	);
}

export default Home;
