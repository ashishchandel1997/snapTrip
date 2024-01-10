import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Choose from "./Choose";
import Feedback from "./Feedback";
import Blog from "./Blog";
import NewsLetter from "./NewsLetter";
import WhatSetsUs from "./WhatSetsUs";

const HomeComponents = ({ data, user, setUser }) => {
  const [whyChoose, setWhyChoose] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.argosmob.uk/snaptrip/snaptrip_home_basic.php")
      .then((res) => {
        if (res?.data?.success) {
          setWhyChoose(res?.data?.User_status?.whychoose);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Choose whyChoose={whyChoose} />
      <WhatSetsUs />
      <Feedback />
      <Blog data={data} />
      <NewsLetter />
    </>
  );
};

export default HomeComponents;
