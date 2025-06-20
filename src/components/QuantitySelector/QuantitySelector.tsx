import "./QuantitySelector.scss";

interface Props {
	quantity: number;
	addQuantity: () => void;
	subQuantity: () => void;
}

function QuantitySelector({ quantity, addQuantity, subQuantity }: Props) {
	return (
		<div className="quantity__content__selector">
			<div className="quantity__content__selector-btn" onClick={subQuantity}>
				-
			</div>
			<div className="quantity__content__selector-btn">{quantity}</div>
			<div className="quantity__content__selector-btn" onClick={addQuantity}>
				+
			</div>
		</div>
	);
}

export default QuantitySelector;
