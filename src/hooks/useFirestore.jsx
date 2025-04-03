import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
  or,
} from "firebase/firestore";
const useFirestore = (collectionName, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // condition
    /*
      {
        fieldName: abc,
        operator: 'in',
        compareValue: 'abd',
      }
    */

    if (!condition) {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef);

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const documents = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setDocuments(documents);
      });

      return () => unsubscribe();
    }

    // Tao query
    const collectionRef = collection(db, collectionName);
    const q = query(
      collectionRef,
      where(condition.fieldName, condition.operator, condition.compareValue)
    );

    // Tuong tac voi query
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });

    return () => unsubscribe();
  }, [collectionName, condition]);

  return documents;
};

export default useFirestore;
