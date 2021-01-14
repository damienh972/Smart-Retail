// npm import
import PropTypes from "prop-types";
import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({type, color}) => (
  <ReactLoading type={type} color={color} height={333} width={180} />
);

Loading.propTypes = {
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default Loading;
