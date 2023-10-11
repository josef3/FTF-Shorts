import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: 'ftf-shorts.firebaseapp.com',
	databaseURL:
		'https://ftf-shorts-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'ftf-shorts',
	storageBucket: 'ftf-shorts.appspot.com',
	messagingSenderId: '627289345298',
	appId: '1:627289345298:web:177bfbb2b36e4f0f90b7cb',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
