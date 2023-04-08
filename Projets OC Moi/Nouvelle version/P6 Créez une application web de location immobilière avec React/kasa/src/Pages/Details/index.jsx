//import { useEffect } from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { housing } from "../../data/housing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Collapse from "../../components/Collapse";
import Rating from "../../components/Rating";

function Details() {
  useEffect(() => {
    if (houseSelection.length === 0) {
      navigate("/notFound");
    }
    document.getElementById("mainImage").style.backgroundImage =
      "url(" + houseSelection[0].pictures[currentPicture] + ")";
  });

  /*on déclare un useState sous la forme d'un tableau contenant deux éléments :
  - le nom de la variable persistante
  - le nom de la fonction qui permettra de modifier (faire un set) cette variable

  la fonction useState admet comme paramètre la valeur initiale à donner à notre variable persistante
  */
  const [currentPicture, setCurrentPicture] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const id = params.get("id"); // bar

  var houseSelection = housing.filter(function (h) {
    return h.id === id;
  });
  const h = houseSelection[0];

  //fonction appelée lors de l'événement OnClick() sur le bouton
  const previousPicture = () => {
    if (currentPicture > 0) {
      setCurrentPicture(currentPicture - 1);
    } else {
      setCurrentPicture(h.pictures.length);
    }
  };

  const nextPicture = () => {
    if (currentPicture < h.pictures.length) {
      setCurrentPicture(currentPicture + 1);
    } else {
      setCurrentPicture(0);
    }
  };

  //construct equipment list
  const eqList = h.equipments.map((eq, idx) => <li key={idx}>{eq}</li>);
  const name = h.host.name.split(" ").map((eq, idx) => (
    <span key={idx}>
      {eq}
      <br />
    </span>
  ));
  const tags = h.tags.map((eq, idx) => (
    <span className="tag" key={idx}>
      {eq}
    </span>
  ));
  return (
    <div>
      <div id="mainImage">
        <div>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="mainImageNavigation"
            onClick={previousPicture}
          />
        </div>
        <div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="mainImageNavigation"
            onClick={nextPicture}
          />
        </div>
      </div>
      <div className="flex-row-space-between">
        <h1>{h.title}</h1>
        <div className="flex-row-space-between hostContainer">
          <div className="hostName">{name}</div>
          <div>
            <img src={h.host.picture} alt="hôte" className="hostImage"></img>
          </div>
        </div>
      </div>
      <div>{h.location}</div>
      <div className="flex-row-space-between">
        <div className="tagContainer">{tags}</div>
        <div>
          <Rating rating={h.rating}></Rating>
        </div>
      </div>
      <div className="desc-equip-container">
        <Collapse label="Description">
          <p>{h.description}</p>
        </Collapse>
        <div>&nbsp;</div>
        <Collapse label="Équipements">
          <ul>{eqList}</ul>
        </Collapse>
      </div>
    </div>
  );
}

export default Details;
