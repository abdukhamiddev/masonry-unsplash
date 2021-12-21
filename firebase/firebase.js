import { initializeApp } from "firebase/app";

import {
	getStorage,
	ref,
	listAll,
	getDownloadURL,
	getMetadata,
} from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDi-Rm5JKIBDgOit1sxLLRB1KexpkeoR3Y",
	authDomain: "my-unsplash-afddb.firebaseapp.com",
	projectId: "my-unsplash-afddb",
	storageBucket: "my-unsplash-afddb.appspot.com",
	messagingSenderId: "438138722417",
	appId: "1:438138722417:web:829d6590f1df32abb863d0",
};

const firebase = initializeApp(firebaseConfig);

const storage = getStorage();
const storageRef = ref(storage);
export { firebase, storageRef, listAll, getDownloadURL, getMetadata };
