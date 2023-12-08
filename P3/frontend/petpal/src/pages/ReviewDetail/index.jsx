import "./style.css"
import Seeker from "../../assets/images/seeker.jpeg"
import Edit from "../../assets/images/edit.png"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const ReviewDetail = () => {

    const [image, setImage] = useState(null);
    const [nickname, setNickname] = useState(null);
    const [name, setName] = useState(null);
    const [contact, setContact] = useState(null);
    const [location, setLocation] = useState(null);
    const [preference, setPreference] = useState(null);

    useEffect(() => {
        
        // image = ajax/fetch
        // setImage(image);
        // nickname = ajax/fetch
        // setNickname(nickname);
        
    }, []); 

    return <>
        <div class="col-md-12 row" style="width: 70vw;">
            <div class="col-md-12">
                <div>
                    <h2 class = "review-detail">Review Details</h2>
                </div>
                <div class="chatbox mb-3">

                    <div class="text-start">
                        <div class="row">
                            <div class="col-md-2 img-container">
                                <img src="img/seeker.jpeg" class="rounded-circle" />
                            </div>
                            <p class="col-md-10 h5 username">User 1</p>
                        </div>
                        <p>This Shelter is great!</p>
                    </div>

                    <div class="text-start">
                        <div class="row">
                            <div class="col-md-2 img-container">
                                <img src="img/shelter.jpeg" class="rounded-circle" />
                            </div>
                            <p class="col-md-10 h5 username">Shelter (To User 1)</p>
                        </div>
                        <p>Thank you for your review!</p>
                    </div>

                    <div class="text-start">
                        <div class="row">
                            <div class="col-md-2 img-container">
                                <img src="img/seeker.jpeg" class="rounded-circle" />
                            </div>
                            <p class="col-md-10 h5 username">User2 (To User 1)</p>
                        </div>
                        <p>Cute Dogs!</p>
                    </div>

                    <div class="text-start">
                        <div class="row">
                            <div class="col-md-2 img-container">
                                <img src="img/shelter.jpeg" class="rounded-circle" />
                            </div>
                            <p class="col-md-10 h5 username">Shelter (To User 2)</p>
                        </div>
                        <p>Thank you for your reply!</p>
                    </div>

                
                </div>
                <textarea class="form-control" id="chat-textbox"></textarea>
                <button class="btn btnStyle w-100 py-2" type="submit">Send</button>
            </div>
        </div>
    </>
}

export default ReviewDetail;