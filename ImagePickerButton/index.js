import React, {
  Component,
} from 'react';

import {NativeModules} from 'react-native'

import ImagePicker from 'react-native-image-picker'
import Button from './../Button';
import styles from './style.js';

import RNFetchBlob from 'react-native-fetch-blob'

class ImagePickerButton extends Component {
  propTypes: {
    onGetPhoto: React.PropTypes.func.isRequired
  }

  _onPress() {
    const options = {
      title: 'Select Avatar',
      customButtons: [
        {name: 'spam', title: 'Choose a damn photo!!'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.warn('User cancelled image picker');
      }
      else if (response.error) {
        console.warn('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.warn('User tapped custom button: ', response.customButton);
      }
      else {
        
        // make this photo the background
        // this.props.onGetPhoto(response.uri)

          RNFetchBlob.fetch('POST', 'http://10.40.119.23:3000/upload', {
          'Content-Type' : 'multipart/form-data',
        }, [
          // part file from storage
          { name : 'avatar-foo', filename : 'from_phone.png', type:'image/png', data: RNFetchBlob.wrap(response.uri)},
          // elements without property `filename` will be sent as plain text
          { name : 'name', data : 'user'},
          { name : 'info', data : JSON.stringify({
            mail : 'example@example.com',
            tel : '12345678'
          })},
        ]).then((resp) => {
          console.warn(resp);
        }).catch((err) => {
          console.warn(resp);
          // ...
        })


        
        // RNFetchBlob.fetch('POST',
        //   "http://10.40.119.23:3000/upload",
        //   {'Content-Type' : 'application/octet-stream'},
        //   RNFetchBlob.wrap(response.uri)
        // ).then((res) => {
        //   console.warn(JSON.stringify(res));
        // })

        // xhr.send(formData)

        // post photo using react-native-uploader
        // let options = {
        //   url: 'http://10.40.119.23:3000/upload',
        //   files: files,
        //   params: {name: 'test-app'}
        // }
        
      }
    });

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
