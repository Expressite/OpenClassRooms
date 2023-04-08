import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Collapse = (props) => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="collapseContainer" onClick={toggle}>
        <div className="collapseHeader">
          <div>{props.label}</div>
          <div>
            <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
          </div>
        </div>
        {open && (
          <div className="collapseContent-parent">
            <div className="collapseContent"> {props.children} </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Collapse;
