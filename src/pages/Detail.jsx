import React,{useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
const BookDetailPage = () =>{

    const params = useParams();
    const firebase = useFirebase();
    const [data,setData] = useState(null);
    const [url,setURL] = useState(null);
    console.log(data);

    useEffect(()=>{
        firebase.getBookById(params.bookId).then((value)=>{
            setData(value.data());
            console.log(value.data())});
    },[])

    useEffect(()=>{
        if(data){
            const imageURL = data.imageURL;
            firebase.getImageURL(imageURL).then(url =>setURL(url));
        }
    },[data]);

    if(data == null )
    return <h1>Loading...</h1>

    return <div className="container mt-5">
        <h1>{data.name}</h1>
        <img src={url} width="50%" style={{ borderRadius:'10px' }} />
    </div>
}

export default BookDetailPage;