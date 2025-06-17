import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilters, changeFilterPrice } from "../../../app/productSlice";
import { formatTag } from "../../../utils/helpers";
import arrowDown from "../../../assets/images/arrow-down.svg";
import { RootState } from "../../../app/store";
import { PriceTag } from "../../../types/global";

type FilterCategory = "brand" | "category" | "price";

interface Props {
	name: string;
	tags: string[] | PriceTag[];
	category: FilterCategory;
	specialStyles?: string;
}

function FiltersSection({ name, tags, category, specialStyles = "" }: Props) {
	const [isVisible, setIsVisible] = useState(true);
	const { filters } = useSelector((state: RootState) => state.products);
	const dispatch = useDispatch();

	const toggleVisibility = useCallback(() => setIsVisible((prev) => !prev), []);

	const handleFilter = (filterInstance: { category: "brand" | "category"; tag: string }) =>
		dispatch(changeFilters(filterInstance));

	const handlePriceFilter = ({ min, max }: PriceTag) => dispatch(changeFilterPrice({ min, max }));

	function renderFilterOptions() {
		if (!tags || tags.length === 0) return null;

		if (name === "Prices") {
			return renderPriceTags();
		}

		return renderRegularTags();
	}

	function renderPriceTags() {
		return (tags as PriceTag[]).map((tag, id) => {
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
		return (tags as string[]).map((tag, id) => {
			if (category === "price") return null;
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
