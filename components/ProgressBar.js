import React from "react";
import { useSelector } from "react-redux";

const ProgressBar = () => {
	const progress = useSelector(({ modal }) => modal.progress);

	return (
		<>
			<h1 className="text-[#4f4f4f] text-xl dark:text-gray-100">
				Uploading....
			</h1>
			<div className="relative w-full pt-1">
				<div className="flex h-2 mb-4 overflow-hidden text-xs bg-gray-100 rounded dark:bg-dp06">
					<div
						className="flex flex-col justify-center text-center text-white transition-all bg-blue-500 shadow-none whitespace-nowrap"
						style={{ width: `${progress}%` }}
					></div>
				</div>
			</div>
		</>
	);
};

export default ProgressBar;
