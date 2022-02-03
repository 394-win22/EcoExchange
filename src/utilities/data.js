
import { useEffect, useState, useCallback } from "react";
import { db } from "./firebase";
import { getDocs, getDoc, collection, doc, query, where  } from "firebase/firestore"; 

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
            setError(e);
            setData(null);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getCollection(collectionName);
    }, [collectionName, getCollection]);

    return [data, loading, error];
};

export const getTrades = async(userID, type) => {
    const userType = type ? "posterID" : "requesterID";
    const tradeRef = collection(db, "trades");
    const q = query(tradeRef, where(userType, "==", userID));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(item => {
        return { ...item.data(), id: item.id}
    });
    return data;
}

export const getItemByUser = async(collectionName, userID) => {
    const itemRef = collection(db, collectionName);

    // Create a query against the collection.
    const q = query(itemRef, where("uid", "==", userID));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(item => {
        return { ...item.data(), id: item.id }
    });
    return data;
}

export const getItemByID = async(collectionName, userID) => {
    const docRef = doc(db, collectionName, userID);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
}

/*
export const getItemBySearch = async(collectionName, target) => {
    const itemRef = collection(db, collectionName);

    // Create a query against the collection.
    const q = query(itemRef, where("name", "LIKE", "%"+target+"%"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(item => {
        return { ...item.data(), id: item.id }
    });
    return data;
}
*/

export const getMessages = async (tradeID) => {
    const itemRef = collection(db, 'messages');
    const q = query(itemRef, where("tradeID", "==", tradeID));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(item => {
        return { ...item.data(), id: item.id }
    });
    return data;
}

export const useUser = (collectionName, userID) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const getUser = useCallback(async (collectionName, userID) => {
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
        getUser(collectionName, userID);
    }, [collectionName, userID, getUser]);

    return [data, loading, error];
};