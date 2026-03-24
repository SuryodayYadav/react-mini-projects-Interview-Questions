import React, { useState } from "react";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submittedData, setSubmittedData] = useState([]);

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    const newEntry = {
      rating,
      comment,
    };

    setSubmittedData([...submittedData, newEntry]);

    // reset
    setRating(0);
    setHover(0);
    setComment("");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
      <h2>Rate Us</h2>

      {/* Stars */}
      <div style={{ fontSize: "30px", cursor: "pointer" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            style={{
              color: star <= (hover || rating) ? "gold" : "gray",
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Comment */}
      <div style={{ marginTop: "10px" }}>
        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          style={{ width: "100%" }}
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        style={{ marginTop: "10px", padding: "8px 16px" }}
      >
        Submit
      </button>

      {/* Display */}
      <div style={{ marginTop: "20px", textAlign: "left" }}>
        <h3>Reviews:</h3>
        {submittedData.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <div>{"★".repeat(item.rating)}</div>
            <div>{item.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarRating;