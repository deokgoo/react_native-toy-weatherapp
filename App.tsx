import React from 'react';
import Loading from './components/Loading'
import { View, StyleSheet } from "react-native";
import * as Location from "expo-location";

export default class extends React.Component {
  getLocation = async () => {
    const location = await Location.getCurrentPositionAsync()
    console.log(location)
  }
  componentDidMount(){
    this.getLocation();
  }
  render() {
    return <View style={styles.appView}><Loading/></View>
  }
}

const styles = StyleSheet.create({
  appView:{
    flex: 1
  }
})


