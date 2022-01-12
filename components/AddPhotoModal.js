import { Dialog } from "@headlessui/react";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addFile } from "../redux/filesSlice";

import {
	setIsAddOpen,
	setIsDeleteOpen,
	setLoading,
	setProgress,
} from "../redux/modalSlice";
import Dropzone from "./Dropzone";
import ImageUploaded from "./ImageUploaded";
import ProgressBar from "./ProgressBar";

const AddPhotoModal = () => {
	const [fileLabel, setFileLabel] = useState("");

	const dispatch = useDispatch();
	const isAddOpen = useSelector(({ modal }) => modal.isAddOpen);
	const loading = useSelector(({ modal }) => modal.loading);
	const progress = useSelector(({ modal }) => modal.progress);

	const storage = getStorage();
	const storageRef = ref(storage, `/${fileLabel}`);

	const uploadHandler = async (file) => {
		const metadata = {
			contentType: "image/*",
			customMetadata: {
				width: 0,
				height: 0,
			},
		};

		const myImage = new Image();
		myImage.src = window.URL.createObjectURL(file);
		myImage.onload = function () {
			const width = myImage.naturalWidth;
			const height = myImage.naturalHeight;

			metadata?.customMetadata?.width = myImage.naturalWidth;
			metadata?.customMetadata?.height = myImage.naturalHeight;

			window.URL.revokeObjectURL(myImage.src);
			console.log(width, height);

			const uploadTask = uploadBytesResumable(storageRef, file, metadata);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					dispatch(
						setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
					);
					console.log("Upload is " + progress + "%done");
					switch (snapshot.state) {
						case "paused":
							//		console.log("Upload is paused");
							break;
						case "running":
							//			console.log("Upload is running");
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
				},
				() => {
					dispatch(setLoading("loaded"));
					getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
						dispatch(
							addFile({
								originalUrl: downloadUrl,
								url: downloadUrl.replace(
									"https://firebasestorage.googleapis.com",
									`https://ik.imagekit.io/u9es71stuug/tr:${
										window.innerWidth < 525 ? "w-515" : "w-437"
									},c-at_min,fo-auto,q-80`
								),
								blur: downloadUrl.replace(
									"https://firebasestorage.googleapis.com",
									`https://ik.imagekit.io/u9es71stuug/tr:w-10,h-10,q-10,bl-50`
								),

								name: fileLabel,
								customMetadata: {
									width: metadata?.customMetadata?.width,
									height: metadata?.customMetadata?.height,
								},
							})
						);
					});
				}
			);
		};
	};
	useEffect(() => {
		setFileLabel(null);
	}, [isAddOpen]);

	return (
		<Dialog
			open={isAddOpen}
			onClose={() => {
				dispatch(setIsAddOpen(false)),
					dispatch(setLoading("false")),
					dispatch(setProgress(0));
			}}
			className="fixed inset-0 z-10 overflow-y-auto"
		>
			<div className="flex items-center justify-center min-h-screen">
				<Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />

				<div className="relative flex flex-col items-center w-full max-w-md p-6 mx-auto space-y-6 transition-all bg-white  shadow-md dark:bg-dp01 rounded-[12px] m-auto py-12 px-8 ">
					{
						{
							false: (
								<>
									<Dialog.Title className="mb-5 text-xl font-medium dark:text-grayGray-300">
										Add a new photo
									</Dialog.Title>
									<Dropzone
										uploadHandler={uploadHandler}
										fileLabel={fileLabel}
										setFileLabel={setFileLabel}
									/>
								</>
							),
							true: <ProgressBar />,
							loaded: <ImageUploaded />,
						}[loading]
					}
				</div>
			</div>
		</Dialog>
	);
};
export default AddPhotoModal;
