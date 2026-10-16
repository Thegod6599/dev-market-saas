import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const ALLOWED_TYPES = new Set([
  'bug',
  'suggestion',
  'component_request',
  'general',
]);

const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 2000;

export async function submitFeedback({ userId, type, message }) {
  if (typeof userId !== 'string' || !userId.trim()) {
    throw new Error('A signed-in user is required to submit feedback.');
  }

  const cleanMessage = typeof message === 'string' ? message.trim() : '';
  if (!ALLOWED_TYPES.has(type)) {
    throw new Error('Choose a valid feedback category.');
  }
  if (cleanMessage.length < MIN_MESSAGE_LENGTH || cleanMessage.length > MAX_MESSAGE_LENGTH) {
    throw new Error('Feedback message length is invalid.');
  }

  return addDoc(collection(db, 'feedback'), {
    userId,
    type,
    message: cleanMessage,
    status: 'new',
    createdAt: serverTimestamp(),
  });
}
