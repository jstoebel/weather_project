import React, {
  Component,
} from 'react';

import {ImagePickerIOS} from 'react-native'

import Button from './../Button';
import styles from './style.js';

class ImagePickerButton extends Component {
  propTypes: {
    onGetPhoto: React.PropTypes.func.isRequired
  }

  _onPress() {
    ImagePickerIOS.openSelectDialog(
      {
        showImages: true,
        showVideos: true,
      },
      (uri) => {
        // send uri to parent who will pass to PhotoBackdrop
        this.props.onGetPhoto(uri)
        // this.setState({
        //   photoSource: {uri: data}
        // })
      },
      () => {
        console.warn('Action canceled by user');
      }
    )
  }

  render() {
    
    return (
      <Button
        label="Pick a new photo"
        style={{backgroundColor: '#DDDDDD'}}
        onPress={this._onPress.bind(this)}/>
      );
  }
}

export default ImagePickerButton;
