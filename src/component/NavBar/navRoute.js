import React from 'react'
import {
    Link
} from "react-router-dom";

const NavRoute = ({url,text}) => ( <Link to={url}>{text}</Link>)

export  default NavRoute
