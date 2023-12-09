import {Link} from "react-router-dom"
const Reply = ({detail, review_id}) =>{
    
    return <>
    <Link to={"Review/" + review_id} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div class="conta">
        <p>Reply : {detail}</p>
    </div>
    </Link>
    </>
}

export default Reply