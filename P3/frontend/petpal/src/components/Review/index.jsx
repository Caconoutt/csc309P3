import {Link} from "react-router-dom"
const Review = ({detail, review_id}) =>{
    
    return <>
    <Link to={"Review/" + review_id} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div class="conta">
        <p>{detail}</p>
    </div>
    </Link>
    </>
}

export default Review