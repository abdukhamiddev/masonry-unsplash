import Head from "next/head";
import MasonryContainer from "../components/MasonryContainer";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import AddPhotoModal from "../components/AddPhotoModal";
import DeletePhotoModal from "../components/DeletePhotoModal";

export default function Home() {
	return (
		<Provider store={store}>
			<div className="w-full h-full min-h-screen p-5 transition-all lg:px-32 lg:py-10 dark:bg-dp02">
				<Head>
					<title>Unsplash</title>
					<meta name="description" content="unsplash styled image gallery" />
				</Head>
				<Navbar />
				<AddPhotoModal />
				<DeletePhotoModal />
				<MasonryContainer />
			</div>
		</Provider>
	);
}
