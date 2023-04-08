import React from "react";
import PropTypes from "prop-types";

export const TopTitle = ({ title, count }) => (
  <div>
    <h1>
      {count} {title}
    </h1>
  </div>
);

TopTitle.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};
