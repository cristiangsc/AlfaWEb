//firebase library
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
//config firebase
import {firebaseConfig} from '@/firebase/firebaseConf'

initializeApp(firebaseConfig);

export const db = getFirestore();