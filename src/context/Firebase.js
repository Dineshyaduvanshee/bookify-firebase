import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHzYU6bZcq0iZKxGIy0q8w5TTVdrPHNF0",
  authDomain: "bookify-176e8.firebaseapp.com",
  projectId: "bookify-176e8",
  storageBucket: "bookify-176e8.appspot.com",
  messagingSenderId: "532714348528",
  appId: "1:532714348528:web:552ef7e23e63f82eb58735",
  measurementId: "G-3Z2QNS0HFQ",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user ? user : null);
    });

    return () => unsubscribe();
  }, []);

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signInUserWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signInWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  const handleCreateNewListing = async (name, isbn, price, coverPic) => {
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${coverPic.name}`);
    await uploadBytes(imageRef, coverPic);
    const imageURL = await getDownloadURL(imageRef);
    await addDoc(collection(firestore, 'books'), {
      name,
      isbn,
      price,
      imageURL,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  const listAllBooks = () => getDocs(collection(firestore, 'books'));

  const getBookById = async (id) => {
    const docRef = doc(firestore, 'books', id);
    const result = await getDoc(docRef);
    return result;
  };

  const getImageURL = (path) => getDownloadURL(ref(storage, path));

  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(firestore, 'books', bookId, 'orders');
    await addDoc(collectionRef, {
        userID: user.id,
        userEmail: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        qty: Number(qty),
    });
  };

  const fetchMyBooks = async (userId) => {
    if (!user) return null;
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userID", "==", userId));
    const result = await getDocs(q);
    return result;
   // return result.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };



  const isLoggedIn = !!user;

  return (
    <FirebaseContext.Provider
      value={{
        signInWithGoogle,
        signupUserWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        isLoggedIn,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        getBookById,
        placeOrder,
        fetchMyBooks,
        user
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
