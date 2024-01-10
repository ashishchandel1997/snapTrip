import React from "react"
import "./App.css";
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  HashRouter  as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import AboutUs from "./Pages/AboutUs";
import HomeComponents from "./components/HomeComponents";
import Footer from "./components/Footer";
import Login from "./components/AuthComponent/Login";
import Register from "./components/AuthComponent/Register";
import TripSummary from "./Pages/TripSummary";
import FilteredSelection from "./Pages/FilteredSelection";
import ChartMap from "./Pages/ChartMap";
import CurrentUser from "./CurrentUser";
import BlogComponent from "./Pages/BlogComponent";
import FullBlog from "./Pages/FullBlog";
import Profile from "./Pages/Profile";
import SmartTripGuide from "./Pages/SmartTripGuide";
import Wishlist from "./Pages/Wishlist";
import ScrollToTop from "./ScrollToTop";
import ContactUs from "./Pages/ContactUs";
import SavedTrips from "./Pages/SavedTrips";
import TermsAndConditions from "./Pages/TermsAndConditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import HowSnaptripWorks from "./Pages/HowSnaptripWorks";
import CopyChart from "./Pages/CopyChart";

function App() {
  const { user, setUser } = CurrentUser();
  const [data, setBlogData] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.argosmob.uk/snaptrip/snaptrip_get_blogs.php")
      .then((res) => {
        if (res?.data?.success) {
          setBlogData(res?.data?.User_status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ScrollToTop />
              <Layout>
                <Outlet />
              </Layout>
            </>
          }
        >
          <Route index element={<HomeComponents data={data} user={user} setUser={setUser} />} />
          <Route path="/about" element={<AboutUs user={user} setUser={setUser}/>} />
          <Route path="/login" element={<Login setUser={setUser} user={user}/>} />
          <Route path="/register" element={<Register user={user} setUser={setUser}/>} />
          <Route path="/filteredcountry" element={<FilteredSelection user={user} setUser={setUser}/>} />
          <Route path="/blogs/:id" element={<FullBlog data={data} user={user} setUser={setUser}/>} />
          <Route path="/blogs" element={<BlogComponent data={data} user={user} setUser={setUser}/>} />
          <Route path="/smarttrip" element={<SmartTripGuide user={user} setUser={setUser}/>} />
          <Route path="/contactUs" element={<ContactUs user={user} setUser={setUser}/>} />
          <Route path="/terms&conditions" element={<TermsAndConditions user={user} setUser={setUser}/>} />
          <Route path="/privacy" element={<PrivacyPolicy/>} user={user} setUser={setUser}/>
          <Route path="/chartmap" exact element={<ChartMap user={user} setUser={setUser}/>} />
          <Route path="/howSnaptripworks" element={<HowSnaptripWorks user={user} setUser={setUser}/>} />
       
          {user && (
            <React.Fragment>
              <Route path="/savedTrips" element={<SavedTrips user={user} setUser={setUser}/>} />
              <Route path="/wishlist" element={<Wishlist user={user} />} setUser={setUser}/>
              <Route path="/profile" element={<Profile user={user} />} setUser={setUser}/>
            </React.Fragment>
          )}
        </Route>
        <Route path="/trip" element={<TripSummary user={user} setUser={setUser}/>} />
        <Route path="/chartmap/:id" exact element={<CopyChart  user={user}/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function Layout({ children }) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}

export default App;
