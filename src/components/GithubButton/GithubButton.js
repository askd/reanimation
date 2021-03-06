import React from 'react';
import PropTypes from 'prop-types';

import styles from './GithubButton.css';

const GithubButton = (props) => {
  const name = props.component ? `animakit-${props.component}` : 'animakit';
  return (
    <a
      className={ styles.button }
      href={ `https://github.com/animakit/${name}` }
      target="_blank"
      rel="noopener noreferrer"
    >
      View on GitHub
    </a>
  );
};

GithubButton.propTypes = {
  component: PropTypes.string,
};

export default GithubButton;
