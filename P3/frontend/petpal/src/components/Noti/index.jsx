import {Link} from "react-router-dom"
const Noti = ({msg, noti_id}) =>{
    

    return <>
    <Link to={"Noti/" + noti_id} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div class="conta">
        <p>{msg}</p>
    </div>
    </Link>
    </>
}

export default Noti