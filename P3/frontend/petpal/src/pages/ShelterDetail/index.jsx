import "./style.css"
import Seeker from "../../assets/images/seeker.jpeg"
import Edit from "../../assets/images/edit.png"
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useUserData } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ShelterDetail = () => {
    const {shelter_id} = useParams();
    const {token} = useUserData();

    const [nickname, setNickname] = useState(null);

    const [contact, setContact] = useState(null);
    const [location, setLocation] = useState(null);

    const [mission, setMission] = useState("");

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    console.log(shelter_id);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const url = `http://localhost:8000/account/seeker/${shelter_id}/`;
          console.log(url);
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userResult = await response.json();
            setNickname(userResult.nickname);
            setContact(userResult.contact);
            setLocation(userResult.location);
            setMission(userResult.mission);
            setIsLoading(false);
          } else {
            setIsLoading(false);
            console.log('Error fetching user data');
          }
        } catch (error) {
          setIsLoading(false);
          console.error('Error:', error);
        }
      };
    
      fetchData();
    }, [shelter_id, token]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      // use the api call to submit the review
      const url = `http://localhost:8000/comment/reviews/${shelter_id}/`;
      const reviewData = {
        rating: rating,
        detail: review,
      };
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(reviewData),
        });
    
        if (response.ok) {
          alert('Review submitted!');
          // clear the form
          setRating(0);
          setReview('');
          // Optionally, you can handle further actions upon successful submission
        } else {
          alert('Failed to submit review. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the review.');
      }
    };

    const handleRatingChange = (event) => {
      let value = parseInt(event.target.value);
      value = Math.min(Math.max(value, 1), 5); // Ensure the value stays between 1 and 5
      setRating(value);
    };
    
    const handleReviewList= (event) => {
      navigate('/ReviewList');
    }

    return (
    <>
    {isLoading ? (
                <p>Loading...</p>
            ) : (
    <div class="container" id="wrap">
      <div class="row info-container">
        <div class="col-md-6">
          <div class="img-container">
            <div class="img-container">
                <div class = "portrait">
                    <img src="img/shelter.jpeg" class="img-fluid profile-img" /> 
                </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 category">
                <p class="title">Nickname:</p>
            </div>

            <div class="col-md-6 text-md-left">
                <p>{nickname}</p>
            </div>
          </div>


          <div class="row">
            <div  class="col-md-6 col-sm-12 category">
                <p class="title">Contact:</p>
            </div>
            <div class="col-md-6 col-sm-12 text-md-left">
                <p>{contact}</p>
            </div>
          </div>

          <div class="row">
            <div  class="col-md-6 col-sm-12 category">
                <p class="title">Location:</p>
            </div>
            <div class="col-md-6 col-sm-12 text-md-left">
                <p>{location}</p>
            </div>
          </div>

          <div class="row">
            <div  class="col-md-6 col-sm-12 ">
                <p class="title">Mission Statement:</p>
            </div>
            <div class="col-md-6 col-sm-12 text-md-left">
                <p>{mission}</p>
            </div>
          </div>
          
        </div>


        <div class="col-md-6">
        <div class="row">
              <div class="col-md-6 col-sm-12">
              <Link to={`shelter/${shelter_id}/ListBlog`} className="management">
                    <button class="btn btn-primary btn-submit">Shelter Blog</button>
                  </Link>
              </div>
            </div>
          <h2>Rating and Reviews</h2>
            <div class="total-rating">
              <p>Overall rating: 4.5 stars</p>
            </div>
                <div class="form-group">
                    <label for="rating">Rating:</label>
                    <input type="number" class="form-control rating-input" id="rating" min="1" max="5" 
                    value={rating} onChange={handleRatingChange}/>
                </div>
                <div class="form-group">
                    <label for="review">Review:</label>
                    <textarea class="form-control rating-input" id="review" rows="4" placeholder="Enter your review here"
                    value={review} onChange={(e) => setReview(e.target.value)}></textarea>
                </div>
                <button class="btn btn-primary btn-submit" onClick={handleSubmit}>Submit Review</button>

                <h3>Recent Reviews</h3>

                <button
                  className="btn btn-primary btn-submit"
                  onClick={() => navigate(`/ReviewList/${shelter_id}`)}
                >
                  View All Reviews
                </button>

                {/* <ul class="list-group">
                    <li class="list-group-item review-comment">
                      <p>From User: This shelter is great!</p>
                      <a href="shelter_review.html">
                        <button class="btn btn-primary btn-submit btn-reply">View</button>  
                      </a>
                    </li>
                    <li class="list-group-item review-comment">
                      <p>From Shelter: Thanks for adopting cat</p>
                      <a href="shelter_review.html">
                        <button class="btn btn-primary btn-submit btn-reply">View</button>  
                      </a>
                    </li>
                    <li class="list-group-item review-comment">
                      <p>From User: Great Shelter!</p>
                      <a href="shelter_review.html">
                        <button class="btn btn-primary btn-submit btn-reply">View</button>  
                      </a>
                    </li>
                    
                </ul> */}
                
        </div>
      </div>
         
    </div>
    )}
    </>
);
}

export default ShelterDetail;