import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const ImageUploaded = () => {
	const files = useSelector(({ files }) => files.files);
	return (
		<>
			<span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="transition-all icon icon-tabler icon-tabler-circle-check"
					width="64"
					height="64"
					viewBox="0 0 24 24"
					strokeWidth="1"
					//stroke={darkMode ? "#1e1e1e" : "#ffffff"}
					stroke="#fff"
					fill="#10B981"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<circle cx="12" cy="12" r="9" />
					<path d="M9 12l2 2l4 -4" />
				</svg>
			</span>
			<h1>Uploaded Successfully</h1>
			<Image
				src={files[0].url}
				alt="Uploaded file"
				width={250}
				height={250}
				className="object-cover max-w-64 max-h-64 rounded-xl"
			/>
			<div className="flex items-center w-full space-x-2 bg-[#f6f8fb] dark:bg-dp03 border-[#e0e0e0] rounded-xl p-1 border-[1.5px]  dark:border-opacity-25 ">
				<a
					href={files[0].originalUrl}
					className="text-xs text-[#4f4f4f] truncate w-3/4 dark:text-gray-500 dark:hover:text-gray-100"
				>
					{files[0].originalUrl}
				</a>
				<button
					className="w-1/4 transition-all btn-secondary"
					onClick={(e) => {
						e.target.innerHTML = "Copied!";
						navigator.clipboard.writeText(files[0].originalUrl);
						e.target.className =
							"w-1/4 cursor-not-allowed pointer-events-none btn-primary";
						setTimeout(() => {
							e.target.className = "w-1/4 btn-secondary";
							e.target.innerHTML = "Copy";
						}, 2000);
					}}
				>
					Copy
				</button>
			</div>
		</>
	);
};

export default ImageUploaded;
