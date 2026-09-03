import { db } from "@/firebase/firebase";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
       } from "firebase/firestore";

const DEFAULT_SETTINGS = {
  theme: "system",
  reduceMotion: false,
};

async function ensureSettings(uid) {
   const settingsRef = doc(db, "users", uid, "settings")
   const settingsSnap = await getDoc(settingsRef);
   if (!settingsSnap.exists()) {
    await setDoc(settingsRef, DEFAULT_SETTINGS);
    return DEFAULT_SETTINGS;
  } else {
     return settingsSnap.data()
  }
}

async function settingsLoad(uid) {
  const settingsRef = doc(db, "users", uid, "settings")
  const settings = await ensureSettings(uid);
  const schemaKeys = Object.keys(DEFAULT_SETTINGS);
  const settingsKeys = Object.keys(settings);
  const missingKeys = schemaKeys.filter((key) => !settingsKeys.includes(key));
  if (missingKeys.length > 0) {
    const newSettings = { ...settings };
    missingKeys.forEach((key) => {
      newSettings[key] = DEFAULT_SETTINGS[key];
    });
    await updateDoc(settingsRef, newSettings);
    return newSettings;
  } else {
    return settings;
  }
}
