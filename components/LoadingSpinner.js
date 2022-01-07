import React from "react";

const LoadingSpinner = () => {
	return (
		<div className="relative flex isRing w-[80px] h-[80px] m-auto overflow-hidden">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default LoadingSpinner;
