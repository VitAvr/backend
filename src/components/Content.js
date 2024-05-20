import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "../pages/Home";
import About from "../pages/About";
import Firm from "../pages/Firm";
import Feedback from "../pages/Feedback";
import DetailFirm from "../pages/DetailFirm"


// import DetailPost from "../pages/DetailPost";
//-------------
import Login from "./Login";
import Profile from "./Profile";
import Logout from "./Logout";
import Register from "./Register";
import FirmList from "../actions/FirmList";
//----------------
import AddFirm from "../actions/AddFirm";
import EditFirm from "../actions/EditFirm";
//--------------
 import UserList from "../actions/UserList";
 import EditUser from "../actions/EditUser";


 import FeedbackList from "../actions/FeedbackList";
//------------
export default function Content() {
    return (
        <main className="flex-shrink-0">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/about" element={<About />} />
                    {/*exact - точное совпадение маршрута и ссылки*/}

                    <Route exact path="/firms" element={<Firm />} />
                    <Route path="/detailfirm/:id" element={<DetailFirm />} />
                    <Route exact path="/firmslist" element={<FirmList />} />
                    <Route exact path="/feedback" element={<Feedback />} />
                    

                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/logout" element={<Logout />} />

                    <Route exact path="/userslist" element={<UserList />} />
                    <Route path="/edituser/:id" element={<EditUser />} />


                    <Route exact path="/feedbacklist" element={<FeedbackList />} />

                    <Route path="/addfirm" element={<AddFirm />} />
                    <Route path="/editfirm/:id" element={<EditFirm />} />
                </Routes>
            </Router>
        </main>
    );
}