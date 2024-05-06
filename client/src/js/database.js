import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>  {
  try {
    const db = await dbPromie;
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.put ({ content });
    await tx.complete;
    console.log('Data added to database:', content);
  } catch (error) {
    console.error('Error adding datat to the database', error);
  }
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const data = await store.getAll();
    console.log('Data retrieved from database:', data);
    return data;
  } catch (error) {
    console.error('Error retrieving data from datatbase:', error);
    return[];
  }
};

initdb();
