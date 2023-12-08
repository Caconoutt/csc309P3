import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewReview = () => {
  const { shelterId, reviewId } = useParams();
  const [review, setReview] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyDetail, setReplyDetail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch review details
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/comment/reviews/${shelterId}/${reviewId}/`)
      .then((res) => res.json())
      .then((data) => {
        setReview(data);
      })
      .catch((error) => console.error('Error fetching review:', error));
  }, [shelterId, reviewId]);

  // Fetch replies
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/comment/reviews/${reviewId}/replies/`)
      .then((res) => res.json())
      .then((data) => {
        setReplies(data);
      })
      .catch((error) => console.error('Error fetching replies:', error));
  }, [reviewId]);

  // Handle reply submission
  const handleReplySubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/comment/reviews/${reviewId}/replies/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add Authorization header if required
        },
        body: JSON.stringify({ detail: replyDetail })
      });

      if (response.ok) {
        setReplyDetail('');
        // Optionally re-fetch replies or update state to include new reply
      } else {
        setErrorMessage('Failed to submit reply. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Review Details</h1>
      {review && (
        <div>
          <p><strong>Detail:</strong> {review.detail}</p>
          <p><strong>Rating:</strong> {review.rating}</p>
          {/* More review details */}
        </div>
      )}

      <h2>Replies</h2>
      {replies.map((reply, index) => (
        <div key={index}>
          <p>{reply.detail}</p>
          {/* More reply details */}
        </div>
      ))}

      <h2>Reply to Review</h2>
      <form onSubmit={handleReplySubmit}>
        <div>
          <label htmlFor="replyDetail">Your Reply:</label>
          <textarea
            id="replyDetail"
            value={replyDetail}
            onChange={(e) => setReplyDetail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Post Reply</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default ViewReview;
