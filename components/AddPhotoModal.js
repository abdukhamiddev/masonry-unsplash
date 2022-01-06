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

import { setIsAddOpen, setIsDeleteOpen } from "../redux/modalSlice";

const AddPhotoModal = () => {
	const [file, setFile] = useState(null);
	const [fileLabel, setFileLabel] = useState("");

	const dispatch = useDispatch();

	const isAddOpen = useSelector((state) => state.modal.isAddOpen);

	const storage = getStorage();
	const storageRef = ref(storage, `/${fileLabel}`);

	const uploadHandler = async (file) => {
		const metadata = {
			contentType: "image/*",
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

			metadata.customMetaData.width = myImage.naturalWidth;
			metadata.customMetaData.height = myImage.naturalHeight;

			window.URL.revokeObjectURL(myImage.src);
			console.log(width, height);

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
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
						dispatch(
							addFile({
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
								metadata: {
									name: fileLabel,
									customMetadata: {
										width: metadata?.customMetadata?.width,
										height: metadata?.customMetadata?.height,
									},
								},
							})
						);
					});
				}
			);
		};
	};
	useEffect(() => {
		setFile(null);
		setFileLabel(null);
	}, [isAddOpen]);

	return (
		<Dialog
			open={isAddOpen}
			onClose={() => dispatch(setIsAddOpen(false))}
			className="fixed inset-0 z-10 overflow-y-auto"
		>
			<div className="flex items-center justify-center min-h-screen">
				<Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />

				<div className="relative flex flex-col w-full max-w-md p-6 mx-auto bg-white rounded-lg">
					<Dialog.Title className="mb-5 text-xl font-medium">
						Add a new photo
					</Dialog.Title>
					<form className="flex flex-col">
						<label
							htmlFor="label"
							className="block mb-1 text-sm font-bold text-gray-700"
						>
							Photo name
						</label>
						<input
							id="label"
							placeholder="Enter label for your photo"
							className="w-full px-3 py-3 mb-5 text-xs text-gray-700 border border-black border-opacity-50 rounded-xl"
							onChange={(e) => setFileLabel(e.target.value)}
							required={true}
						/>
						<input
							type="file"
							accept="image/*"
							required={true}
							onChange={(e) => setFile(e.target.files[0])}
						/>
						<div className="flex space-x-4 place-content-end">
							<button
								type="submit"
								onClick={(e) => {
									e.preventDefault();
									dispatch(setIsAddOpen(false));
								}}
								className="p-4 text-base text-center text-gray-400 bg-transparent rounded-xl"
							>
								Cancel
							</button>
							<button
								type="submit"
								onClick={(e) => {
									e.preventDefault();
									file && fileLabel && uploadHandler(file);
									dispatch(setIsAddOpen(false));
								}}
								className="btn-primary ripple"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</Dialog>
	);
};
export default AddPhotoModal;
