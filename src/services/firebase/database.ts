// src/services/firebase/firestore.ts
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  getCountFromServer,
  startAfter,
  QueryConstraint,
  DocumentSnapshot,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

export class DatabaseService<T extends DocumentData> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  // Create
  async create(data: Omit<T, 'id'>): Promise<string> {
    const collectionRef = collection(db, this.collectionName);
    const docRef = await addDoc(collectionRef, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  }

  // Read (get all)
  async getAll(): Promise<Array<T & { id: string }>> {
    const collectionRef = collection(db, this.collectionName);
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T & { id: string });
  }

  // Read (get by ID)
  async getById(id: string): Promise<(T & { id: string }) | null> {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T & { id: string };
    }
    return null;
  }

  // Read (query)
  async query(
    conditions: Array<{
      field: keyof T | string;
      operator: '==' | '>' | '>=' | '<' | '<=' | 'array-contains' | 'in' | 'array-contains-any';
      value: any;
    }>,
    sortOptions?: {
      field: keyof T | string;
      direction: 'asc' | 'desc';
    },
    limitCount?: number,
  ): Promise<Array<T & { id: string }>> {
    let collectionRef = collection(db, this.collectionName);

    // Build query with conditions
    let queryRef = query(
      collectionRef,
      ...conditions.map((condition) =>
        where(condition.field as string, condition.operator, condition.value),
      ),
    );

    // Add sorting if specified
    if (sortOptions) {
      queryRef = query(queryRef, orderBy(sortOptions.field as string, sortOptions.direction));
    }

    // Add limit if specified
    if (limitCount) {
      queryRef = query(queryRef, limit(limitCount));
    }

    const snapshot = await getDocs(queryRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T & { id: string });
  }

  async queryPaginated(
    pageSize: number,
    lastDocument?: DocumentSnapshot | null,
    conditions: Array<{
      field: keyof T | string;
      operator: '==' | '>' | '>=' | '<' | '<=' | 'array-contains' | 'in' | 'array-contains-any';
      value: any;
    }> = [],
    sortOptions?: {
      field: keyof T | string;
      direction: 'asc' | 'desc';
    },
  ): Promise<{
    data: Array<T & { id: string }>;
    lastVisible: DocumentSnapshot | null;
    hasMore: boolean;
  }> {
    let collectionRef = collection(db, this.collectionName);

    // Build query with conditions
    let queryConstraints: QueryConstraint[] = conditions.map((condition) =>
      where(condition.field as string, condition.operator, condition.value),
    );

    // Add sorting if specified
    if (sortOptions) {
      queryConstraints.push(orderBy(sortOptions.field as string, sortOptions.direction));
    } else {
      // Default sorting by createdAt if no sort is specified
      queryConstraints.push(orderBy('createdAt', 'desc'));
    }

    // Add cursor if we have a last document
    if (lastDocument) {
      queryConstraints.push(startAfter(lastDocument));
    }

    // Add limit
    queryConstraints.push(limit(pageSize + 1)); // request one more to check if there are more items

    // Create the query
    const q = query(collectionRef, ...queryConstraints);

    // Execute query
    const snapshot = await getDocs(q);

    const docs = snapshot.docs;
    const hasMore = docs.length > pageSize;

    // Remove the extra item we used to check for more
    if (hasMore) {
      docs.pop();
    }

    return {
      data: docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T & { id: string }),
      lastVisible: docs.length > 0 ? docs[docs.length - 1] : null,
      hasMore,
    };
  }

  // Get count of documents (for optimization)
  async getCount(
    conditions: Array<{
      field: keyof T | string;
      operator: '==' | '>' | '>=' | '<' | '<=' | 'array-contains' | 'in' | 'array-contains-any';
      value: any;
    }> = [],
  ): Promise<number> {
    let collectionRef = collection(db, this.collectionName);

    // Build query with conditions
    let queryRef = query(
      collectionRef,
      ...conditions.map((condition) =>
        where(condition.field as string, condition.operator, condition.value),
      ),
    );

    const snapshot = await getCountFromServer(query(queryRef));
    return snapshot.data().count;
  }

  // Update
  async update(id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
  }

  // Delete
  async delete(id: string): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
  }

  async deleteCollection(collectionPath?: string, batchSize: number = 100): Promise<void> {
    const path = collectionPath || this.collectionName;
    const collectionRef = collection(db, path);

    // Get the first batch of documents
    const q = query(collectionRef, limit(batchSize));

    return this.deleteQueryBatch(collectionRef, q, batchSize);
  }

  private async deleteQueryBatch(collectionRef: any, q: any, batchSize: number): Promise<void> {
    const snapshot = await getDocs(q);

    // When there are no documents left, we're done
    if (snapshot.size === 0) {
      return;
    }

    // Delete documents in a batch
    const batch = writeBatch(db);

    snapshot.docs.forEach((docSnapshot) => {
      batch.delete(docSnapshot.ref);
    });

    await batch.commit();

    // If we have less documents than the batch size, we're done
    if (snapshot.size < batchSize) {
      return;
    }

    // Recursively delete the next batch
    const lastDoc = snapshot.docs[snapshot.size - 1];
    const nextQuery = query(collectionRef, startAfter(lastDoc), limit(batchSize));

    // Small timeout to avoid overloading the database
    await new Promise((resolve) => setTimeout(resolve, 10));

    // Continue with next batch
    return this.deleteQueryBatch(collectionRef, nextQuery, batchSize);
  }
}
