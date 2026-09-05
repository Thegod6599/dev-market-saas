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
   const userRef = doc(db, "users", uid)
   const userSnap = await getDoc(userRef);
   if (!userSnap.exists()) {
    await setDoc(userRef, {
      settings: DEFAULT_SETTINGS,
    });
    return DEFAULT_SETTINGS;
  }
  const data = userSnap.data();

  if (!data.settings) {
    await updateDoc(userRef, {
      settings: DEFAULT_SETTINGS,
    })
    return DEFAULT_SETTINGS
  }
  return data.settings;
}

export async function settingsLoad(uid) {
  const userRef = doc(db, "users", uid)
  const settings = await ensureSettings(uid);
  const schemaKeys = Object.keys(DEFAULT_SETTINGS);
  const settingsKeys = Object.keys(settings);
  const missingKeys = schemaKeys.filter((key) => !settingsKeys.includes(key));
  if (missingKeys.length > 0) {
    const newSettings = { ...settings };
    missingKeys.forEach((key) => {
      newSettings[key] = DEFAULT_SETTINGS[key];
    });
    await updateDoc(userRef, {
      settings: newSettings
    });
    return newSettings;
  } else {
    return settings;
  }
}

export async function settingsUpdate(uid, changes) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef)
  const currentSettings = userSnap.data().settings
  const updatedSettings = {
    ...currentSettings,
    ...changes,
  }
  await updateDoc(userRef, {
    settings: updatedSettings
  })
  return updatedSettings
}
