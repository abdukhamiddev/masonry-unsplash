import { Dialog } from "@headlessui/react";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSelectedFile, setSelectedFileLabel } from "../redux/filesSlice";
import { setIsOpen } from "../redux/modalSlice";

const AddPhotoModal = () => {
	const dispatch = useDispatch();
	const isOpen = useSelector((state) => state.modal.isOpen);
	const selectedFile = useSelector((state) => state.files.selectedFile);
	const selectedFileLabel = useSelector(
		(state) => state.files.selectedFileLabel
	);

	const storage = getStorage();
	const storageRef = ref(storage, `/${selectedFileLabel}`);

	const uploadHandler = async (file) => {
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
				}
			);
		};
	};

	return (
		<Dialog
			open={isOpen}
			onClose={() => dispatch(setIsOpen(false))}
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
							Label
						</label>
						<input
							id="label"
							placeholder="Enter label for your photo"
							className="w-full px-3 py-3 mb-5 text-xs text-gray-700 border border-black border-opacity-50 rounded-xl"
							onChange={(e) => dispatch(setSelectedFileLabel(e.target.value))}
							required={true}
						></input>
						<input
							type="file"
							accept="image/*"
							onChange={(e) => dispatch(setSelectedFile(e.target.files[0]))}
							required={true}
						></input>
						<div className="flex space-x-4 place-content-end">
							<button
								type="submit"
								onClick={(e) => {
									e.preventDefault();
									dispatch(setIsOpen(false));
								}}
								className="p-4 text-base text-center text-gray-400 bg-transparent rounded-xl"
							>
								Cancel
							</button>
							<button
								type="submit"
								onClick={(e) => {
									e.preventDefault();
									selectedFile &&
										selectedFileLabel &&
										uploadHandler(selectedFile);
								}}
								className="p-4 text-base font-bold text-center text-white bg-green-500 shadow-md rounded-xl"
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
