import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import GradientButton from "./GradientButton";
import useScreenWidth from "../utils/hook/useScreenWidth";
import { getCityName, updateScore } from "../services/request";
import { frenchDate } from "../utils/function";

import "../styles/styleArtworkDetail.css";

export default function ArtworkDetails({ artwork, setArtworkDetails }) {
  const userInfo = true;
  const screenWidth = useScreenWidth();
  const [artworkLocation, setArtworkLocation] = useState();

  const HandleUpdateScore = () => {
    updateScore(1, 100);
  };

  useEffect(() => {
    if (artwork.lat) {
      getCityName(artwork.lat, artwork.lon, setArtworkLocation);
    }
  }, [artwork.lat, artwork.lon]);
  return (
    <section className="detailsContaineur">
      <div className="detailsContain">
        <img
          src={artwork.image_url}
          alt={artwork.title}
          className="detailsImg"
        />
        <div className="textDetailsContainer">
          <div className="textDetails">
            <p className="title">{artwork.title}</p>
            <p>{artwork.author}</p>
          </div>
          <div className="textDetails">
            <p>📅 {frenchDate(artwork.create_date)}</p>
            <p>
              {artworkLocation && (
                <>
                  📍 {artworkLocation.city}, {artworkLocation.country}
                </>
              )}
            </p>
          </div>
          {screenWidth < 480 && userInfo && (
            <div className="btnPointsElement">
              <GradientButton text="✔︎" onClick={HandleUpdateScore} />
            </div>
          )}
          <p className="detailsDescription">{artwork.description}</p>
          <GradientButton text="Fermer" onClick={() => setArtworkDetails()} />
        </div>
      </div>
    </section>
  );
}

ArtworkDetails.propTypes = {
  artwork: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    create_date: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
  setArtworkDetails: PropTypes.func.isRequired,
};
