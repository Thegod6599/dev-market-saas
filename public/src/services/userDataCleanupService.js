import {
  collection,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { deleteProfile } from './profileService';

const BATCH_SIZE = 450;
const cleanupTasks = new Map();

async function deleteOwnedFeedback(uid) {
  const feedbackQuery = query(
    collection(db, 'feedback'),
    where('userId', '==', uid),
  );
  const snapshot = await getDocs(feedbackQuery);
  const documents = snapshot.docs;

  for (let index = 0; index < documents.length; index += BATCH_SIZE) {
    const batch = writeBatch(db);
    documents
      .slice(index, index + BATCH_SIZE)
      .forEach((feedbackDocument) => batch.delete(feedbackDocument.ref));
    await batch.commit();
  }

  return { deletedCount: documents.length };
}

export function registerUserDataCleanupTask(id, cleanup, priority = 50) {
  if (typeof id !== 'string' || !id.trim()) {
    throw new Error('A cleanup task must have a non-empty ID.');
  }
  if (typeof cleanup !== 'function') {
    throw new Error(`Cleanup task "${id}" must be a function.`);
  }
  if (cleanupTasks.has(id)) {
    throw new Error(`Cleanup task "${id}" is already registered.`);
  }

  cleanupTasks.set(id, { cleanup, priority });
  return () => cleanupTasks.delete(id);
}

// Register every feature's user-owned records here. Lower priorities run first;
// keep the profile last so it remains available while other data is cleaned up.
registerUserDataCleanupTask('feedback', deleteOwnedFeedback, 10);
registerUserDataCleanupTask('profile', async (uid) => {
  await deleteProfile(uid);
}, 1000);

export async function deleteUserData(uid, onTaskProgress = () => {}) {
  if (typeof uid !== 'string' || !uid.trim()) {
    throw new Error('A valid user ID is required to delete user data.');
  }

  const tasks = [...cleanupTasks.entries()]
    .map(([id, task]) => ({ id, ...task }))
    .sort((first, second) => first.priority - second.priority);
  const completedTasks = [];

  for (const task of tasks) {
    onTaskProgress(task.id);
    try {
      await task.cleanup(uid);
      completedTasks.push(task.id);
    } catch (cause) {
      const error = new Error(`User data cleanup failed at task "${task.id}".`);
      error.code = cause?.code;
      error.cause = cause;
      error.failedTask = task.id;
      error.completedTasks = [...completedTasks];
      throw error;
    }
  }

  return { uid, completedTasks, userDataDeleted: true };
}
