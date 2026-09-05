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
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  const data = userSnap.exists() ? userSnap.data() : {};
  const settings = {
    ...DEFAULT_SETTINGS,
    ...(data.settings || {}),
  };

  const settingsChanged =
    !userSnap.exists() ||
    Object.keys(DEFAULT_SETTINGS).some(
      (key) => data.settings?.[key] !== settings[key],
    );

  if (settingsChanged) {
    await setDoc(userRef, { settings }, { merge: true });
  }

  return settings;
}

export async function settingsLoad(uid) {
  return ensureSettings(uid);
}

export async function settingsUpdate(uid, changes, currentSettings = {}) {
  const userRef = doc(db, "users", uid);
  const updatedSettings = {
    ...DEFAULT_SETTINGS,
    ...currentSettings,
    ...changes,
  };

  await setDoc(userRef, {
    settings: updatedSettings,
  }, { merge: true });

  return updatedSettings;
}
