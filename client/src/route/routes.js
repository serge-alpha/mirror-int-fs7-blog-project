import React from "react";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from "../page/Home";
import Blogs from "../page/Blogs";
import CreateBlog from "../page/createBlog";
import Nav from "../layout/Navbar";

const Index=()=>{
    return(
        <BrowserRouter>
        <Nav/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/blogs" element={<Blogs/>} />
                <Route path="/create-blog" element={<CreateBlog/>} />
            </Routes>
        </BrowserRouter>
    )

};

export default Index;