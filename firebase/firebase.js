import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	projectId: process.env.PROJECT_ID,
	storageBucket: "my-unsplash-afddb.appspot.com",
	messagingSenderId: "438138722417",
	appId: "1:438138722417:web:829d6590f1df32abb863d0",
};

const firebase = initializeApp(firebaseConfig);

export { firebase };
