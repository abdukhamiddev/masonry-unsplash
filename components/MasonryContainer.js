import { getDownloadURL, listAll } from "firebase/storage";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { storageRef } from "../firebase/firebase";

const MasonryContainer = () => {
	const [files, setFiles] = useState();

	useEffect(() => {
		const fetchImages = async () => {
			let result = await listAll(storageRef);
			let urlPromises = result.items.map((imageRef) =>
				getDownloadURL(imageRef)
			);
			return Promise.all(urlPromises);
		};

		const loadImages = async () => {
			const urls = await fetchImages();
			setFiles(urls);
		};
		loadImages();
	}, []);
	return (
		<Masonry
			breakpointCols={3}
			className="pt-10 my-masonry-grid"
			columnClassName="my-masonry-grid_column"
		>
			{files?.map((file) => (
				<img key={file} src={file} layout="fill"></img>
			))}
		</Masonry>
	);
};
export default MasonryContainer;
