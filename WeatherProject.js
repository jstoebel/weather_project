import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  Image
} from "react-native";

import Forecast from "./Forecast";
import LocationButton from "./LocationButton";
import ImagePickerButton from "./ImagePickerButton";
const STORAGE_KEY = "@SmarterWeather:zip";

import {
  fetchZipForecast, 
  fetchLatLonForecast
} from "./open_weather_map";

// This version uses flowers.png from camera roll
import PhotoBackdrop from "./PhotoBackdrop/index";

// This version pulls a specified photo from local assets
// import PhotoBackdrop from './PhotoBackdrop';

class WeatherProject extends Component {
  constructor(props) {
    super(props);
    this.state = { forecast: null };
  }

  componentDidMount() {
    // AsyncStorage.getItem(STORAGE_KEY)
    //   .then(value => {
    //     if (value !== null) {
    //       this._getForecastForZip(value);
    //     }
    //   })
    //   .catch(error => console.error("AsyncStorage error: " + error.message))
    //   .done();
  }

  _getForecastForZip = zip => {
    // Store zip code
    AsyncStorage.setItem(STORAGE_KEY, zip)
      .then(() => console.log("Saved selection to disk: " + zip))
      .catch(error => console.error("AsyncStorage error: " + error.message))
      .done();

    const forecast = fetchZipForecast(zip)
    this.setState({ forecast: forecast });    
  };

  _getForecastForCoords = (lat, lon) => {
    const forecast = fetchLatLonForecast(lat, lon)
    this.setState({ forecast: forecast });
  };

  _setImage = (uri) => {
    this.setState({selectedBackground: {uri: uri}})
  }

  _handleTextChange = event => {
    var zip = event.nativeEvent.text;
    this._getForecastForZip(zip);
  };

  render() {
    var content = null;
    if (this.state.forecast !== null) {
      content = (
        <View style={styles.row}>
          <Forecast
            main={this.state.forecast.main}
            temp={this.state.forecast.temp}
          />
        </View>
      );
    }

    return (
      <PhotoBackdrop photoSource={this.state.selectedBackground}>
        <View style={styles.overlay}>
          <View style={styles.row}>
            <Text style={textStyles.mainText}>
              Forecast for
            </Text>

            <View style={styles.zipContainer}>
              <TextInput
                style={[textStyles.mainText, styles.zipCode]}
                returnKeyType="go"
                onSubmitEditing={this._handleTextChange}
              />
            </View>
          </View>

          <View style={styles.row}>
            <LocationButton onGetCoords={this._getForecastForCoords} />
          </View>
          
          <View style={styles.row}>
            <ImagePickerButton onGetPhoto={this._setImage} />
          </View>

          {content}

        </View>
      </PhotoBackdrop>
    );
  }
}

import textStyles from "./styles/typography.js";
const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  zipContainer: {
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3,
    width: 80,
    height: textStyles.baseFontSize * 2,
    justifyContent: "flex-end"
  },
  zipCode: {
    flex: 1
  }
});

export default WeatherProject;
