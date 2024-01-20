import React from "react";
import myimage from "./images/istockphoto-172989638-612x612.jpg";
import "./image.css"; // Import the custom CSS file

function Image() {
  const imageStyle = {
    width: "100%", // Set width to 100%
    height: "auto",
  };

  return (
    <div className="image-container">
      {" "}
      {/* Wrap the image with a div */}
      <img src={myimage} alt="bgimage" style={imageStyle} />
    </div>
  );
}

export default Image;
