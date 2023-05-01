
import axios from "axios";
import React, { useState } from "react";

const CreateBlog=()=>{
const [title,setTitle]=useState('');
const [content,setContent]=useState('');
const [image,setImage]=useState('');

const handletitleChange=(event)=>{
    setTitle(event.target.value)
}
const handleContentChange=(event)=>{
    setContent(event.target.value)
}
const handleImageChange=(event)=>{
    setImage(event.target.files[0])
}
const handleSubmit=async(event)=>{
    event.preventDefault();
    try {
        const newBlog= new FormData();
        newBlog.append('title',title);
        newBlog.append('image',image);
        newBlog.append('content',content);

        const res=await axios.post('http://localhost:8080/api/blog',newBlog);
        console.log(res)

    } catch (error) {
        console.log(error)
    }
    setContent('');
    setImage('');
    setTitle('');
}

    return(
        <form onSubmit={handleSubmit} className="form">
            <label htmlFor="title" />
            <input type="text" name="title" value={title} onChange={handletitleChange} placeholder="Title" required/>
            <label htmlFor="image" />
            <input type="file" name="image"  onChange={handleImageChange} accept="image/*" required/>
            <label htmlFor="content" />
            <textarea name="content" value={content} placeholder="Content" onChange={handleContentChange} required></textarea>
           <button type="submit" className="btn">Create Blog</button>
        </form>
    )
}

export default CreateBlog;