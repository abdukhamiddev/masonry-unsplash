import { async } from "@firebase/util";
import { getDownloadURL, getMetadata, listAll } from "firebase/storage";
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
		const fetchMetadata = async () => {
			let result = await listAll(storageRef);
			let metadataPromises = result.items.map((imageRef) =>
				getMetadata(imageRef)
			);
			return Promise.all(metadataPromises);
		};

		const loadImages = async () => {
			const urls = await fetchImages();
			const metadata = await fetchMetadata();
			let images = urls.map((url, index) => {
				return {
					url: url,
					metadata: metadata[index],
				};
			});
			images.sort(
				(a, b) => new Date(b.metadata.updated) - new Date(a.metadata.upda)
			);
			setFiles(images);
		};
		loadImages();
	}, []);

	const breakpointColumnsObj = {
		default: 3,
		2200: 5,
		1600: 4,
		1100: 3,
		700: 2,
		500: 1,
	};
	return (
		<Masonry
			breakpointCols={breakpointColumnsObj}
			className="pt-10 my-masonry-grid"
			columnClassName="my-masonry-grid_column"
		>
			{files?.map((file) => (
				<>
					<div className="imageContainer">
						<img src={file.url} className="image" alt="Unsplash Image" />
						<div className="overlay">{file.metadata.name}</div>
					</div>
				</>
			))}
		</Masonry>
	);
};
export default MasonryContainer;
