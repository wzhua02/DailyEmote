import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../FireBaseConfig";
import { entryData } from "../types/Types";

/**
   * Asynchronously reads entries from the database for a given date
   * @param date - the date to read entries for
   */
import { Dispatch, SetStateAction } from "react";

export const readDateEntry = async (date: string, setEntries: Dispatch<SetStateAction<any[]>>) => {
  console.log("reading entries for: " + date);

  /**
   * splits date string into year, month, and day
   */
    const splitDate = (date: string) => {
      const [year, month, day] = date.split("-");
      return { year, month, day };
    };

  try {
    const querySnapshot = await getDocs(collection(FIREBASE_DB, "entries"));
    const newEntries: entryData[] = [];
    const { year, month, day } = splitDate(date);

    querySnapshot.forEach((doc) => {
      console.log(doc.data().year, doc.data().month, doc.data().day);
      console.log(year, month, day);
      if (
        doc.data().year === year &&
        doc.data().month === month &&
        doc.data().day === day
      ) {
        newEntries.push({
          id: doc.id,
          title: doc.data().title,
          isHappy: doc.data().isHappy,
          year: doc.data().year,
          month: doc.data().month,
          day: doc.data().day,
          textEntry: doc.data().textEntry,
        });
      }
    });

    setEntries(newEntries); 
    console.log(newEntries);
  } catch (error) {
    console.error("Error reading entries: ", error);
  } 
};