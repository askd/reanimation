import AnimakitElastic from 'components/AnimakitElastic';

import SimpleText from 'components/SimpleText/SimpleText';

import React from 'react';
import PropTypes from 'prop-types';

import pathToImage from 'utils/path-to-image';

import styles from './ElasticSimple.css';

export default class ElasticSimple extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      showText: false,
      showImage: false,
    };

    this.listeners = {
      onToggleImage: this.onToggleImage.bind(this),
      onToggleText: this.onToggleText.bind(this),
    };
  }

  /* componentDidMount() {
    setTimeout(() => {
      this.setState({
        show: true,
      });
    }, 5000);
  } */

  onToggleImage() {
    const showImage = !this.state.showImage;
    this.setState({ showImage });
  }

  onToggleText() {
    const showText = !this.state.showText;
    this.setState({ showText });
  }

  render() {
    return (
      <div className = { styles.root }>
        <AnimakitElastic>
          { this.state.show && <div className = { styles.content }>
            <SimpleText
              className = { styles.text }
              title = "I Got You"
              handleToggle = { this.listeners.onToggleText }
              showMore = { this.state.showText }
              hasMore = { !this.props.onlyHorizontal }
            />
            <div className = { this.state.showImage ? styles.imageVisible : styles.imageHidden }>
              <img
                className = { styles.imageContent }
                src = {pathToImage('good')}
                alt = ""
              />
              <span
                className = { styles.more }
                onClick = { this.listeners.onToggleImage }
              >
                { this.state.showImage ? '- Image' : '+ Image' }
              </span>
            </div>
          </div> }
        </AnimakitElastic>
      </div>
    );
  }
}

ElasticSimple.propTypes = {
  onlyHorizontal: PropTypes.bool,
};

ElasticSimple.defaultProps = {
  onlyHorizontal: false,
};
