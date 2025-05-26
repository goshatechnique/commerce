import "./Home.scss";
import Arrivals from "../../components/Arrivals/Arrivals";
import Deals from "../../components/Deals/Deals";
import Sales from "../../components/Sales/Sales";

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
		</div>
	);
}

export default Home;
