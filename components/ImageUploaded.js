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
				className=""
			/>
			<div>
				<a href={files[0].originalUrl}>{files[0].originalUrl}</a>
				<button>Copy</button>
			</div>
		</>
	);
};

export default ImageUploaded;
