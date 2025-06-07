import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilters, changeFilterPrice } from "../../../app/productSlice";
import { formatTag } from "../../../utils/helpers";
import arrowDown from "../../../assets/images/arrow-down.svg";

function FiltersSection({ name, tags, category, specialStyles = "" }) {
	const [isVisible, setIsVisible] = useState(true);
	const { filters } = useSelector((state) => state.products);
	const dispatch = useDispatch();

	const toggleVisibility = useCallback(() => setIsVisible((prev) => !prev), []);

	const handleFilter = (tag) => dispatch(changeFilters(tag));

	const handlePriceFilter = ({ min, max }) => dispatch(changeFilterPrice({ min, max }));

	function renderFilterOptions() {
		if (!tags || tags.length === 0) return null;

		if (name === "Prices") {
			return renderPriceTags();
		}

		return renderRegularTags();
	}

	function renderPriceTags() {
		return tags.map((tag, id) => {
			const isActive = tag.min === filters.price.min && tag.max === filters.price.max;

			return (
				<div
					key={`price-${tag.min}-${tag.max}-${id}`}
					className={`tag ${isActive ? "active" : ""}`}
					onClick={() => handlePriceFilter({ min: tag.min, max: tag.max })}
				>
					${tag.min} - ${tag.max}
				</div>
			);
		});
	}

	function renderRegularTags() {
		return tags.map((tag, id) => {
			const isActive = filters[category]?.includes(tag);

			return (
				<div
					key={`${category}-${tag}-${id}`}
					className={`tag ${isActive ? "active" : ""}`}
					onClick={() => handleFilter({ category, tag })}
				>
					{formatTag(tag)}
				</div>
			);
		});
	}

	return (
		<div className="selector">
			<div className={`selector__hide ${isVisible ? null : "hidden"}`} onClick={toggleVisibility}>
				<img src={arrowDown} alt="Arrow" />
			</div>
			<div className="selector__name">{name}</div>
			<div className={`selector__options ${specialStyles} ${isVisible ? "" : "hidden"}`}>{renderFilterOptions()}</div>
		</div>
	);
}

export default FiltersSection;
