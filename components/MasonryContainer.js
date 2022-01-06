import {
	getStorage,
	getDownloadURL,
	getMetadata,
	listAll,
	ref,
	deleteObject,
} from "firebase/storage";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import NextImage from "next/image";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setFiles } from "../redux/filesSlice";

const MasonryContainer = () => {
	const dispatch = useDispatch();

	const files = useSelector((state) => state.files.files);

	useEffect(() => {
		const storage = getStorage();
		const storageRef = ref(storage);

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
							window.innerWidth < 525 ? "w-515" : "w-437"
						},c-at_min,fo-auto,q-80`
					),
					blur: url.replace(
						"https://firebasestorage.googleapis.com",
						`https://ik.imagekit.io/u9es71stuug/tr:w-10,h-10,q-10,bl-50`
					),
					metadata: metadata[index],
				};
			});

			images.sort(
				(a, b) =>
					new Date(b?.metadata?.updated) - new Date(a?.metadata?.updated)
			);

			dispatch(setFiles(images));
		};
		loadImages();
	}, [dispatch]);

	const breakpointColumnsObj = {
		default: 3,

		1100: 3,
		700: 2,
		500: 1,
	};
	return (
		<>
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="pt-10 my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{files?.map((file) => (
					<>
						<div className="imageContainer">
							<NextImage
								className="shadow-sm nextImage"
								src={file.url}
								placeholder="blur"
								blurDataURL={file.blur}
								width={`${file.metadata?.customMetadata?.width || "500"}`}
								height={`${file.metadata?.customMetadata?.height || "500"}`}
								alt="Unsplash"
							/>
							<div className="flex flex-col p-4 overlay place-content-between">
								<button
									className="px-4 py-1 ml-auto text-red-500  border-2 border-red-600 rounded-xl hover:text-white hover:bg-red-500 text-[16px] font-semibold duration-[0.33s] transition-colors"
									onClick={() => {
										const storage = getStorage();
										const deleteRef = ref(storage, `${file?.metadata.name}`);

										deleteObject(deleteRef).then(() => {
											dispatch(remove);
										});
									}}
								>
									Delete
								</button>
								<div className="font-bold text-left">{file?.metadata.name}</div>
							</div>
						</div>
					</>
				))}
			</Masonry>
		</>
	);
};
export default MasonryContainer;
