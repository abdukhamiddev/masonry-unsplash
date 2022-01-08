import {
	getStorage,
	getDownloadURL,
	getMetadata,
	ref,
	deleteObject,
	list,
} from "firebase/storage";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import NextImage from "next/image";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addFiles, removeFile } from "../redux/filesSlice";
import {
	setDeleteFileName,
	setIsDeleteOpen,
	setRemoveFunction,
} from "../redux/modalSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "./LoadingSpinner";

const MasonryContainer = () => {
	const dispatch = useDispatch();
	const [masonryFiles, setMasonryFiles] = useState(null);
	const files = useSelector((state) => state.files.files);

	const storage = getStorage();
	const storageRef = ref(storage);

	const [pageToken, setPageToken] = useState(null);

	const fetchImages = async (pageToken) => {
		let url;
		let result;
		if (pageToken) {
			result = await list(storageRef, {
				maxResults: 3,
				pageToken,
			});
			console.log(result.nextPageToken);
			setPageToken(result.nextPageToken);
		} else if (pageToken === null) {
			result = await list(storageRef, { maxResults: 3 });
			setPageToken(result.nextPageToken);
		} else {
			return;
		}
		const urls = await Promise.all(
			result.items.map((imageRef) => (url = getDownloadURL(imageRef)))
		);

		const metadata = await Promise.all(
			result.items.map((imageRef) => getMetadata(imageRef))
		);
		console.log(urls, metadata, images);

		const images = urls.map((url, index) => {
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
				name: metadata[index].name,
				size: metadata[index].size,
				updated: metadata[index].updated,
				customMetadata: metadata[index].customMetadata,
			};
		});
		dispatch(addFiles(images));
	};
	useEffect(() => {
		fetchImages(pageToken);
	}, []);

	useEffect(() => {
		{
			// const newFiles = Array.from(files);
			// newFiles.sort((a, b) => new Date(b?.updated) - new Date(a?.updated));
			setMasonryFiles(
				files?.map((file) => (
					<div className="imageContainer" key={file.name}>
						<NextImage
							className="shadow-sm nextImage"
							src={file.url}
							placeholder="blur"
							blurDataURL={file.blur}
							width={`${file?.customMetadata?.width || "500"}`}
							height={`${file?.customMetadata?.height || "500"}`}
							alt="Unsplash"
						/>
						<div className="flex flex-col p-4 font-montserrat overlay place-content-between">
							<button
								className="ml-auto btn-danger"
								onClick={() => {
									const storage = getStorage();
									const deleteRef = ref(storage, `${file?.name}`);

									const del = () => {
										deleteObject(deleteRef)
											.then(() => {
												dispatch(removeFile(deleteRef));
											})
											.catch((error) => {
												console.log(error);
											});
									};
									dispatch(setIsDeleteOpen(true));
									dispatch(setDeleteFileName(file?.name));
									dispatch(setRemoveFunction(del));
								}}
							>
								Delete
							</button>
							<div className="font-bold text-left">{file?.name}</div>
						</div>
					</div>
				))
			);
		}
	}, [dispatch, files]);
	const breakpointColumnsObj = {
		default: 3,

		1100: 2,

		500: 1,
	};
	return (
		<InfiniteScroll
			dataLength={files.length}
			next={() => fetchImages(pageToken)}
			hasMore={pageToken === undefined ? false : true}
			loader={<LoadingSpinner />}
			endMessage={<p className="text-2xl text-center">You have seen it all!</p>}
		>
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="px-5 pt-10 my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{masonryFiles}
			</Masonry>
		</InfiniteScroll>
	);
};
export default MasonryContainer;
