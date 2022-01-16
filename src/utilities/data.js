
import { useEffect, useState, useCallback } from "react";
import { db } from "./firebase";
import { getDocs, getDoc, collection, doc } from "firebase/firestore"; 

export const useCollection = (collectionName) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const getCollection = useCallback(async (collectionName) => {
        try {
            const dbRef = await getDocs(collection(db, collectionName));
            const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
            if (devMode) { console.log(`loading ${collectionName}`); }
            const data = dbRef.docs.map(item => {
                return {...item.data(), id: item.id};
            });
            setData(data);
            setLoading(false);
            setError(null);
        } catch (e) {
            setData(null);
            setLoading(false);
            setError(e);
        }
    }, []);

    useEffect(() => {
        getCollection(collectionName);
    }, [collectionName, getCollection]);

    return [data, loading, error];
};

export const useUser = (collectionName, userID) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const getCollection = useCallback(async (collectionName, userID) => {
        try {
            const docRef = doc(db, collectionName, userID);
            const docSnap = await getDoc(docRef);
            const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
            if (devMode) { console.log(`loading ${collectionName}`); }
            const data = docSnap.data();
            setData(data);
            setLoading(false);
            setError(null);
        } catch (e) {
            setData(null);
            setLoading(false);
            setError(e);
        }
    }, []);

    useEffect(() => {
        getCollection(collectionName, userID);
    }, [collectionName, userID, getCollection]);

    return [data, loading, error];
};