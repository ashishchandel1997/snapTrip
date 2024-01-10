import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import html2canvas from "html2canvas";
import FacebookLogin from "react-facebook-login";

function Map({
  setToggleMap,
  setIsLoading,
  chartRef,
  toggleMap,
  totalCities,
  visitedData,
  user,
}) {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [image, setImage] = useState();
  const [show, setShow] = useState(true);


  const captureChartAsImage = async () => {
    setIsLoading(true);
    try {
      if (chartRef.current) {
        const canvas = await html2canvas(chartRef.current, {
          allowTaint: true,
          useCORS: false,
          logging: true,
        });
        const chartImageURL = canvas.toDataURL("image/png");

        setImage(chartImageURL);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error capturing chart as image:", error);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setToggleMap(false);
  };

  const responseFacebook = (response) => {
    if (response.accessToken) {
      shareToFacebook(response.accessToken, "ash");
    } else {
    }
  };

  const shareToFacebook = (accessToken) => {
    if (accessToken) {
      // Use the Facebook SDK to post to the user's timeline
      window.FB.api(
        "/me/feed",
        "POST",
        {
          message: "ash",
          access_token: accessToken,
        },
        (response) => {
          if (response && !response.error) {
            console.log(
              "Post to timeline was successful! Post ID: " + response.id
            );
          } else {
            console.error("Error posting to Facebook:", response.error);
          }
        }
      );
    } else {
      console.error("Access token not available.");
    }
  };

  const copyToClipboard = () => {
    const baseUrl = window.location.href; // Get the base URL without path
    const url = `${baseUrl}/${user}`;
    const textarea = document.createElement("textarea");
    textarea.value = url;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("URL copied to clipboard!");
  };

  useEffect(() => {
    const incrementNumber1 = () => {
      if (number1 < visitedData?.visited_country) {
        setNumber1(number1 + 1);
      }
    };

    const incrementNumber2 = () => {
      if (number2 < visitedData?.visited_city) {
        setNumber2(number2 + 1);
      }
    };

    const interval1 = setInterval(incrementNumber1, 50);
    const interval2 = setInterval(incrementNumber2, 50);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [number1, number2]);

  useEffect(() => {
    captureChartAsImage();
  }, []);


  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-evenly w-100 text-center">
            <div className="map_h3">
              <h3>{number1}</h3>
              <h4 className="mb-5">COUNTRIES/{visitedData?.average}%</h4>
            </div>
            <div className="map_h3">
              <h3>{number2}</h3>
              <h4 className="mb-5">CITIES</h4>
            </div>
          </div>
          <div className="text-center mb-3">
            {image && <img src={image} className="mapImage" alt="map" />}
          </div>
          <p className="text-center">Share your map with your friends!</p>
          <div className="text-center">
            <FacebookLogin
              appId="1666440740488340"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              icon="fa-facebook"
            />
          </div>
          <div className="text-center mt-3">
            <button onClick={copyToClipboard} className="readBtn ">
              Copy URL
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Map;




