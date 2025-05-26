import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./Login"
import Dashboard_1 from "./Dashboard_1"
import Dashboard_2 from "./Dashboard_2"
import Register from "./Register"
import Admin from "./Admin"

export default function App(){
    return (
        <Router basename = "/mess-registration-app">
            <Routes>
                <Route path = "/" element = {<Login/>}/>
                <Route path = "/dashboard_1" element ={<Dashboard_1 />}/>
                <Route path = "/dashboard_2" element ={<Dashboard_2 />}/>
                <Route path = "/register" element ={<Register />}/>
                <Route path = "/admin" element ={<Admin />}/>
            </Routes>
        </Router>
    )
}