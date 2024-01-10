import React from "react";
import "react-multi-carousel/lib/styles.css";
import NavBar from "../NavBar";
import a5 from "../images/a5.jpg";
import Who from "../images/whoWeare.png";
import snapSol from "../images/Snaptrip_-_How_It_Works 1.png";
import long from "../images/long.avif";

const AboutUs = ({ user, setUser }) => {
  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <h1 style={{ fontWeight: "600" }} className="text-center my-5">
        About Us
      </h1>
      <section>
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-5 animate__animated animate__fadeInLeft">
              <img src={Who} />
            </div>
            <div className="col-md-7 animate__animated animate__fadeInRight">
              <h2 className="headingText mt-5"> Who We Are?</h2>
              <p className="heading_Para3 mt-3">
                At SnapTrip, we're not just a travel platform; we're a community
                of avid explorers with a shared passion for discovering the
                world's diverse cultures and traditions. Our journey began with
                the simple idea of making travel a stress-free, customizable,
                richer and a more authentic experience.
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mb-5 d-flex justify-content-center align-items-center">
            <div className="col-md-7 animate__animated animate__fadeInLeft">
              <h2 className="headingText mt-5"> Founding Inspiration:</h2>
              <p className="heading_Para3 mt-3">
                You see, we ventured into the vast world of travel only to find
                it cluttered with superficial experiences, generic sales pitches
                and old-fashioned package deals. It wasn't just about getting
                from one place to another; it was about truly connecting with
                the soul of a destination. Our story took a dramatic turn when
                one of our founders faced a midnight medical emergency in a
                foreign land, where the language barrier left them feeling
                stranded and helpless. <br />
                <br />
                <br />
              </p>
            </div>
            <div className="col-md-5 animate__animated animate__fadeInRight">
              <img src={a5} />
            </div>
          </div>
        </div>
        <div className="container my-5">
          <p
            className="heading_Para text-center py-4"
            style={{ fontWeight: "600" }}
          >
            Have you ever wondered what you would do in such a situation when
            you're far from home,
            <br /> surrounded by unfamiliar faces, and the world seems like an
            alien place?
          </p>
        </div>

        <div className="container">
          <div className="row mb-5 d-flex justify-content-center align-items-center">
            <div className="col-md-5 pt-4 animate__animated animate__fadeInLeft">
              <img src={snapSol} />
            </div>
            <div className="col-md-7 animate__animated animate__fadeInRight">
              <h2 className="headingText">The SnapTrip Solution</h2>
              <p className="heading_Para3 mt-3">
                This moment of vulnerability ignited a fire within us to not
                only redefine the travel experience but also to serve as a
                lifeline for travellers facing unexpected challenges. SnapTrip
                emerged as a platform dedicated to meeting the holistic needs of
                globetrotters worldwide. We set out to accomplish two crucial
                goals: first, to fulfil the often elusive dream of cultural
                immersion in your travels, and second, to streamline the entire
                vacation planning process.
                <br />
                <br />
                Gone are the days of trawling through endless vlogs, blogs, and
                scattered online forums for travel advice. You no longer need to
                funnel your hard-earned money into the pockets of travel agents.
                Our AI-powered platform stands ready to craft the perfect
                itinerary for you with just a few clicks, ensuring that you miss
                none of the marvels that await you.
                <br />
                <br />
                Our team of seasoned experts has meticulously curated the most
                comprehensive database of must-visit locations, essential
                attractions, and local delicacies, all in close collaboration
                with our local heroes from every corner of the globe. This
                database is continually updated to keep pace with the
                ever-evolving world of travel. We build the ideal itinerary
                based on your preferences, but the final word is always yours.
                You have the power to customise your journey down to the finest
                detail.
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mb-5 d-flex justify-content-center align-items-center">
            <div className="col-md-7 animate__animated animate__fadeInLeft">
              <h2 className="headingText"> Mission and Values:</h2>
              <p className="heading_Para3 mt-3">
                SnapTrip is on a mission to redefine travel by offering more
                than just generic experiences. We're committed to providing
                authentic and personalized adventures, making travel planning
                seamless, and fostering a global community of like-minded
                explorers. <br />
                <br />
                <strong>
                  Mission: To help every single person on this planet, travel
                  more easily, explore effortlessly and learn continuously.
                  Create a more sustainable travel culture and help the
                  community create memories that last a lifetime.
                </strong>
                <br />
                <br />
                <strong>
                  Vision: To become a single, unified, AI-powered platform for
                  the travel community across the world.
                </strong>
                <br />
                <br />
                SnapTrip is here to rekindle the joy of travel. We're not just
                about getting you from point A to point B; we're about making
                every moment in between an unforgettable adventure. <br />
                <br />
                Join us, and let's make travelling fun again
              </p>
            </div>
            <div className="col-md-5 mt-5 animate__animated animate__fadeInRight">
              <img src={long} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
