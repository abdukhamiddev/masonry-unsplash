import React from "react";
import { useSelector } from "react-redux";

const ProgressBar = () => {
	const progress = useSelector(({ modal }) => modal.progress);

	return (
		<>
			<h1> Uploading....</h1>
			<div>
				<div>
					<div></div>
				</div>
			</div>
		</>
	);
};

export default ProgressBar;
