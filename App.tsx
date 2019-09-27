import React, {Component} from 'react';
import Loading from './components/Loading';
import Weather from './components/Weather';
import { View, StyleSheet, Alert} from "react-native";

import checkPermission from './service/LocationService';
import WeatherAPI from './api/api-weather';
import { locationType, locationData } from './types';

export interface stateType {
  location: locationType,
  errorMessage: string,
  isLoading: Boolean,
  weatherData: any
}
export default class extends Component<any, stateType>{
  constructor(props){
    super(props);
    this.state = {
      location: { lat:0, lon:0 },
      isLoading: true,
      errorMessage: "",
      weatherData: {},
    }
  }
  componentDidUpdate(){
    this.getData();
  }
  async getData(){
    var res = await WeatherAPI.getWeather(this.state.location);
    this.setState({isLoading: false, weatherData: res.data})
  }
  async setLocation(){
    let res:locationData = await checkPermission();
    if(res.isLocation)
      Alert.alert("not have any location")
    else
      this.setState({ location: res.location })
  }

  setLocationTest(){
    let mock:locationData = {
      location: {
        lat:33.596992, lon:130.369990
      },
      isLocation: true,
      msg: "good"
    }
    this.setState({
      location: mock.location
    })
  }
  componentDidMount(){
    this.setLocationTest();
  }
  componentWillMount(){
    // this.setLocation();
    // WeatherAPI.getWeather(this.state.location)
  }
  render() {
    return (
      <View style={styles.appView}>
        {this.state.isLoading?<Loading/>:<Weather weatherData={this.state.weatherData} />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  appView:{
    flex: 1
  }
})
