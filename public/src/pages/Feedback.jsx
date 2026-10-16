import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { submitFeedback } from '../services/feedbackService';
import styles from './pageStyles/Feedback.module.css';

const FEEDBACK_TYPES = [
  'bug',
  'suggestion',
  'component_request',
  'general',
];

const MAX_MESSAGE_LENGTH = 2000;

function Feedback() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [type, setType] = useState('suggestion');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    setError('');
    setSubmitted(false);

    const cleanMessage = message.trim();

    if (loading || isSubmitting) return;

    if (!user) {
      setError('Please sign in to send feedback.');
      return;
    }

    if (!FEEDBACK_TYPES.includes(type)) {
      setError('Please choose a valid feedback category.');
      return;
    }

    if (cleanMessage.length < 10) {
      setError('Please enter at least 10 characters.');
      return;
    }

    if (cleanMessage.length > MAX_MESSAGE_LENGTH) {
      setError('Your message is too long.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitFeedback({ userId: user.uid, type, message: cleanMessage });
      setMessage('');
      setSubmitted(true);
    } catch {
      setError('Your feedback could not be sent. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      <button
        className={styles.backButton}
        type="button"
        onClick={() => navigate('/settings')}
      >
        Back to Settings
      </button>

      <header className={styles.pageHeader}>
        <p>HELP US IMPROVE</p>
        <h1>We’re listening.</h1>
        <p>
          Share feedback, report a bug, or suggest something
          you'd like to see in DevMarket.
        </p>
      </header>

      <section
        className={styles.formCard}
        aria-labelledby="feedback-title"
      >
        <h2 id="feedback-title">Send feedback</h2>
        <p>What would you like to tell us?</p>

        <form onSubmit={handleSubmit}>
          <fieldset disabled={loading || isSubmitting}>
            <legend>Feedback category</legend>

            <label>
              <input
                type="radio"
                name="feedbackType"
                value="bug"
                checked={type === 'bug'}
                onChange={(event) => setType(event.target.value)}
              />
              Bug report
            </label>

            <label>
              <input
                type="radio"
                name="feedbackType"
                value="suggestion"
                checked={type === 'suggestion'}
                onChange={(event) => setType(event.target.value)}
              />
              Feature suggestion
            </label>

            <label>
              <input
                type="radio"
                name="feedbackType"
                value="component_request"
                checked={type === 'component_request'}
                onChange={(event) => setType(event.target.value)}
              />
              Component request
            </label>

            <label>
              <input
                type="radio"
                name="feedbackType"
                value="general"
                checked={type === 'general'}
                onChange={(event) => setType(event.target.value)}
              />
              General feedback
            </label>
          </fieldset>

          <div className={styles.fieldGroup}>
            <label htmlFor="feedback-message">
              Your message
            </label>

            <textarea
              id="feedback-message"
              name="message"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
                setError('');
                setSubmitted(false);
              }}
              placeholder="Describe your idea, report a problem, or tell us what you'd like to see..."
              rows={7}
              maxLength={MAX_MESSAGE_LENGTH}
              minLength={10}
              required
              disabled={loading || isSubmitting}
              aria-describedby="feedback-help feedback-count"
            />

            <div className={styles.textareaFooter}>
              <span id="feedback-help">
                Please include enough detail for us to understand.
              </span>

              <span id="feedback-count" aria-live="polite">
                {message.length.toLocaleString()} / {MAX_MESSAGE_LENGTH.toLocaleString()}
              </span>
            </div>
          </div>

          {!user && !loading && (
            <p>
              You need to be signed in to submit feedback.{' '}
              <button
                type="button"
                onClick={() =>
                  navigate('/login', {
                    state: {
                      from: { pathname: '/feedback' },
                    },
                  })
                }
              >
                Sign in
              </button>
            </p>
          )}

          {error && (
            <p
              className={styles.errorMessage}
              role="alert"
            >
              {error}
            </p>
          )}

          {submitted && (
            <p
              className={styles.successMessage}
              role="status"
            >
              Thank you! Your feedback has been sent.
            </p>
          )}

          <button
            type="submit"
            disabled={loading || isSubmitting || !user}
          >
            {isSubmitting ? 'Sending...' : 'Send feedback'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Feedback;