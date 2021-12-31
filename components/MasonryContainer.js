import {
	getStorage,
	storageRef,
	getDownloadURL,
	getMetadata,
	listAll,
	ref,
	uploadBytesResumable,
} from "../firebase/firebase";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import NextImage from "next/image";

const MasonryContainer = () => {
	const [files, setFiles] = useState();
	const [selectedFile, setSelectedFile] = useState();

	const upload = async (file) => {
		const metadata = {
			contentType: "/image",
			customMetaData: {
				width: 0,
				height: 0,
			},
		};

		const myImage = new Image();
		myImage.src = window.URL.createObjectURL(file);
		myImage.onload = function () {
			const width = myImage.naturalWidth;
			const height = myImage.naturalHeight;
			metadata.customMetaData.width = width;
			metadata.customMetaData.height = height;
			window.URL.revokeObjectURL(myImage.src);
			console.log(width, height);

			const storage = getStorage();
			const storageRef = ref(storage, `/${file.name}`);

			const uploadTask = uploadBytesResumable(storageRef, file, metadata);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused");
							break;
						case "running":
							console.log("Upload is running");
							break;
						default:
							break;
					}
				},
				(error) => {
					switch (error.code) {
						case "storage/unauthorized":
							break;
						case "storage/canceled":
							break;

						case "storage/unknown":
							break;

						default:
							break;
					}
				}
			);
		};
	};

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
		<>
			<form>
				<input
					type="file"
					accept="image/*"
					onChange={(e) => setSelectedFile(e.target.files[0])}
				/>
				<button
					type="submit"
					onClick={(e) => {
						e.preventDefault();
						upload(selectedFile);
					}}
				>
					Upload File
				</button>
			</form>
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="pt-10 my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{files?.map((file) => (
					<>
						<div className="imageContainer">
							<NextImage
								src={file.url}
								width={400}
								height={400}
								alt="Unsplash"
							/>
							<div className="overlay">{file.metadata.name}</div>
						</div>
					</>
				))}
			</Masonry>
		</>
	);
};
export default MasonryContainer;
