import "./Footer.scss";

function Footer() {
	return (
		<div className="footer">
			<div className="footer-feedback">
				<div className="footer-feedback__logo">FASCO</div>
				<div className="footer-feedback__navigator">
					<button className="footer-feedback__navigator-link">Support center</button>
					<button className="footer-feedback__navigator-link">Invoicing</button>
					<button className="footer-feedback__navigator-link">Contract</button>
					<button className="footer-feedback__navigator-link">Careers</button>
					<button className="footer-feedback__navigator-link">Blog</button>
					<button className="footer-feedback__navigator-link">FAQ&apos;s</button>
				</div>
			</div>
			<div className="footer-copyrights">Copyright © 2025. Heorhi Yedziyeu.</div>
		</div>
	);
}

export default Footer;
