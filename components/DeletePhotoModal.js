import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setIsDeleteOpen } from "../redux/modalSlice";

const DeletePhotoModal = () => {
	const [confirm, setConfirm] = useState(null);

	const dispatch = useDispatch();

	const isDeleteOpen = useSelector(({ modal }) => modal.isDeleteOpen);
	const deleteFileName = useSelector(({ modal }) => modal.deleteFileName);
	const removeFunction = useSelector(({ modal }) => modal.removeFunction);

	return (
		<div>
			<Dialog
				open={isDeleteOpen}
				onClose={() => dispatch(setIsDeleteOpen(false))}
				className="fixed inset-0 z-10 overflow-y-auto"
			>
				<div className="flex items-center justify-center min-h-screen">
					<Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />

					<div className="relative flex flex-col w-full max-w-md p-6 mx-auto bg-white rounded-lg dark:bg-dp01">
						<Dialog.Title className="mb-5 text-xl font-medium dark:text-grayGray-500">
							Delete Photo
						</Dialog.Title>
						<form className="flex flex-col">
							<label
								htmlFor="confirm"
								className="block pb-2 mb-1 text-sm font-bold text-gray-700"
							>
								<div className="flex flex-wrap">
									<span className="w-full font-normal">
										Are you sure that you want to delete this photo?
									</span>
									<span className="pr-1 font-normal whitespace-pre">
										Please type in
									</span>
									<span className="font-extrabold underline dark:text-yellow-300">{`${deleteFileName}`}</span>
									<span className="pl-1 font-normal whitespace-pre">
										to continue
									</span>
								</div>
							</label>
							<input
								placeholder={deleteFileName}
								type="confirm"
								className="w-full px-3 py-3 mb-5 text-xs text-gray-700 border border-black border-opacity-50 rounded-xl dark:bg-dp12 dark:border-dp16 dark:text-grayGray-400"
								required={true}
								onChange={(e) => setConfirm(e.target.value)}
							/>

							<div className="flex space-x-4 place-content-end">
								<button
									type="submit"
									onClick={(e) => {
										e.preventDefault();
										dispatch(setIsDeleteOpen(false));
									}}
									className="p-4 text-base text-center text-gray-400 transition-all bg-transparent rounded-xl hover:text-gray-200"
								>
									Cancel
								</button>
								<button
									type="submit"
									onClick={(e) => {
										e.preventDefault();
										if (confirm === deleteFileName) {
											removeFunction();
											dispatch(setIsDeleteOpen(false));
										}
									}}
									className="btn-danger ripple"
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</Dialog>
		</div>
	);
};

export default DeletePhotoModal;
