import React from "react";
import { NavLink } from "react-router-dom";

const Nav=()=>{
    return(
        <nav className="nav">
            <NavLink to="/" className="nav_link">Home</NavLink>
            <NavLink to="/blogs" className="nav_link">Blogs</NavLink>
            <NavLink to="/create-blog" className="nav_link">Create Blog</NavLink>
        </nav>
    )
}

export default Nav;