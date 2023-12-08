import { useState } from "react"
import { useUserData } from "../../contexts/AuthContext"
import './style.css'


const CreateBlog = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const {token} = useUserData();

    const createBlog = async() =>{
        const data ={'title': title, 'content':content}
        try{
            const resp = await fetch('http://localhost:8000/account/shelter/blog/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if(resp.ok){
                window.location.href = "/ListBlog";
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return <>
    <div className="page d-flex align-items-center py-4">
    <main className="form-signin w-100 m-auto mainContent">
        <div id="showOne">
            <label><span className="blogElement">Title</span></label> 
            <div className="form-floating">
                
                <input value={title} onChange={e=> setTitle(e.target.value)}type="text" className="form-control" id="titleBlog" placeholder="Please enter the title." />
                
            </div>

            <div id="space">
            </div>

            <label><span className="blogElement">Content</span></label> 
            <div className="form-floating">
                <input value={content} onChange={e=>setContent(e.target.value)}type="text" className="form-control" id="contentBlog" placeholder="Please enter the content."/>
                
            </div>
           
        </div>
        <button onClick={createBlog} id="submit_create_blog"className="btn btnStyle w-100 py-2">Submit!</button>
        </main></div>
        
        
    </>
}
export default CreateBlog