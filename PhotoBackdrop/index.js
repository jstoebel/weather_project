import React, {
  Component,
} from 'react';

import {
  Image,
  CameraRoll
} from 'react-native';

import styles from './style';

var PhotoBackdrop = React.createClass({
  getInitialState() {
    return {
      photoSource: null
    }
  },

  componentDidMount() {
    CameraRoll.getPhotos({first: 1}).then(
      (data) => {
        this.setState({
          defaultPhotoSource: {uri: data.edges[0].node.image.uri}  // get the uri of first image
        })},
      (error) => {
        console.warn(error);
      }
    );
  },

  render() {
    return (
      <Image
        style={styles.backdrop}
        source={ this.props.photoSource || this.state.defaultPhotoSource}
        resizeMode='cover'>
        {this.props.children}
      </Image>
      );
  }
});

export default PhotoBackdrop;
