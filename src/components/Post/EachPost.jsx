import React , {useEffect,useState} from 'react'
import {getPost} from './api';
import styled from "styled-components";


const EachPostContainer = styled.div`

margin-top:10vh;
display:flex;
padding: 20px;
justify-content:center;
align-items:center;
height:fit-content;
gap:20px;
min-height: 90vh;

.text__container {
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    gap: 20px;
}

.text__container h2 {
    font-weight: bolder;
    font-size: 25px;
}


.text__container p {
    font-weight: light;
    color: #353535;
    font-size: 18px;
    line-height:30px;
}

.text__container small {
    font-weight: bold;
    color: #bfbfbf;
    font-family: Montserrat;
    font-size: 16px;
}


`;


const EachPost = (props) => {
    
    const [blog,setBlog] = useState({});
    const postId = props.match.params.id;
    const src = "http://localhost:8000/storage";


    useEffect(() => {
        (async () => {
            const response = await getPost(postId);
            console.log(response);
            setBlog({...response.response});
            if(blog) 
            {
                props.setPage("My Post");
            }
        })()
    }, []);
    return ( 
        <EachPostContainer>
            <div className="text__container">
                <h2>{blog.title}</h2>
                <p>{blog.description}</p>
                <small>Date posted : <em>{blog.posted_date}</em></small>
            </div>
            <img src={`${src}/${blog.image}`} height="300px" alt=""/>
        </EachPostContainer>
     );
}
 
export default EachPost;