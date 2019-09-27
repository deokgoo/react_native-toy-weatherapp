import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

interface stateType{
  cityName: String,
  temp_min: Number,
  temp_max: Number,
  weather: String,
  dt_txt: String,
  icon: String
}

interface propsType{
  weatherData: any
}

export default class extends Component<propsType, stateType>{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    this.initState();
  }
  initState(){
    let pickData = this.props.weatherData.list[3]
    let { dt_txt } = pickData;
    let { temp_min, temp_max } = pickData.main
    let weather = pickData.weather[0].main
    let { icon } = pickData.weather[0]
    this.setState({
      cityName: this.props.weatherData.city.name,
      temp_min,
      temp_max,
      dt_txt,
      weather,
      icon
    }, () => { console.log(this.state)})
  }
  render(){
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 600,
          }}
        />
        <View style={{flex:1}}>
          <Text style={styles.title}>{this.state.cityName}</Text>
        </View>
        <View style={{flex:2}}>
          <View style={{flex:2, width:200}}>
            <Image style={{flex:1}} source={{
              uri:`http://openweathermap.org/img/wn/${this.state.icon}@2x.png`
            }}/>
          </View>
          <Text style={styles.weatherText}>{this.state.weather}</Text>
        </View>
        <View style={styles.tempView}>
        <Text style={styles.temp}>{this.state.temp_min}° ~ {this.state.temp_max}°</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  title: {
    flex: 1,
    fontSize: 40,
    textAlignVertical: "bottom",
    alignItems: "center",
    fontWeight: "bold",
    color: "white"
  },
  weatherText: {
    flex: 1,
    textAlignVertical: "top",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "white"
  },
  tempView: {
    flex:1,
    flexDirection: "row",
  },
  temp: {
    textAlignVertical: "top",
    fontSize: 30,
    fontWeight: "bold",
    color: "white"
  }
})