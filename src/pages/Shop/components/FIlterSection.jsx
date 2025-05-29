import { useState } from "react";
import { formatTag } from "../../../utils/helpers";

function FilterSection({ name, tags, specialStyles = "" }) {
	const [isVisible, setIsVisible] = useState(true);

	function switchVisibility() {
		setIsVisible((prevState) => (prevState ? false : true));
	}

	function createTags() {
		if (tags && tags.length > 0) {
			return tags.map((tag, id) => {
				return (
					<div key={id} className="tag">
						{formatTag(tag)}
					</div>
				);
			});
		}
	}
	return (
		<div className="selector">
			<div className="selector__hide" onClick={switchVisibility}>
				&#9651;
			</div>
			<div className="selector__name">{name}</div>
			<div className={`selector__tags ${specialStyles} ${isVisible ? "" : "hidden"}`}>{createTags()}</div>
		</div>
	);
}

export default FilterSection;
