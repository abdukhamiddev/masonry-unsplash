import UnSplashLogo from "../public/my_unsplash_logo.svg";
import LabelSvg from "../public/label.svg";
import Hamburger from "../public/menu.svg";
import { Popover, Transition } from "@headlessui/react";
const Navbar = () => {
	return (
		<>
			<div className="items-center hidden w-full h-24 md:flex ">
				<UnSplashLogo />
				<form className="flex items-center w-1/6 p-4 ml-8 bg-white border border-gray-200 rounded-xl">
					<label htmlFor="search" className="mr-2">
						<LabelSvg />
					</label>
					<input
						id="search"
						placeholder="Search by name"
						className="w-full text-gray-700 outline-none"
					/>
				</form>
				<button className="p-4 ml-auto text-base font-bold text-center text-white bg-green-500 rounded-xl">
					Add a photo
				</button>
			</div>
			<Popover
				className="relative flex justify-between w-full md:hidden"
				style={{ zIndex: "2" }}
			>
				<UnSplashLogo />
				<Popover.Button>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-10 h-10"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</Popover.Button>
				<Transition
					className="absolute flex justify-center w-full "
					enter="transition duration-100 ease-out"
					enterFrom="transform scale-95 opacity-0"
					enterTo="transform scale-100 opacity-100"
					leave="transition duration-75 ease-out"
					leaveFrom="transform scale-100 opacity-100"
					leaveTo="transform scale-95 opacity-0"
				>
					<Popover.Panel className="absolute right-0 z-10 flex flex-col items-center w-full max-w-md py-6 space-y-6 bg-white shadow-xl -bottom-60 rounded-2xl">
						<form className="flex items-center w-3/4 p-4 ml-8 bg-white border border-gray-200 rounded-xl">
							<label htmlFor="search" className="mr-2">
								<LabelSvg />
							</label>
							<input
								id="search"
								placeholder="Search by name"
								className="w-full text-gray-700 outline-none"
							></input>
						</form>
						<button className="p-4 text-base font-bold text-center text-white bg-green-500 rounded-xl">
							Add a photo
						</button>
					</Popover.Panel>
				</Transition>
			</Popover>
		</>
	);
};
export default Navbar;
