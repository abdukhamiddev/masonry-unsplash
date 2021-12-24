import {
	storageRef,
	getDownloadURL,
	getMetadata,
	listAll,
} from "../firebase/firebase";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";
const MasonryContainer = () => {
	const [files, setFiles] = useState();

	useEffect(() => {
		const fetchImages = async () => {
			let url;
			let result = await listAll(storageRef);
			let urlPromises = result.items.map(
				(imageRef) => (url = getDownloadURL(imageRef))
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
					url: url.replace(
						"https://firebasestorage.googleapis.com",
						`https://ik.imagekit.io/u9es71stuug/tr:${
							window.innerWidth < 525 ? "w-515" : "w-315"
						},c-at_min,fo-auto,q-80`
					),
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
						<Image src={file.url} width={400} height={400} alt="Unsplash" />
						<div className="overlay">{file.metadata.name}</div>
					</div>
				</>
			))}
		</Masonry>
	);
};
export default MasonryContainer;
