import Head from "next/head";
import MasonryContainer from "../components/MasonryContainer";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import AddPhotoModal from "../components/AddPhotoModal";

export default function Home() {
	return (
		<Provider store={store}>
			<div className="w-full h-full p-5 lg:px-32 lg:py-10 bg-gray-50">
				<Head>
					<title>Unsplash</title>
					<meta name="description" content="unsplash styled image gallery" />
				</Head>
				<Navbar />
				<AddPhotoModal />
				<MasonryContainer />
			</div>
		</Provider>
	);
}
