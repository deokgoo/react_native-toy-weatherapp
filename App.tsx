import React, {Component} from 'react';
import Loading from './components/Loading'
import { View, StyleSheet, Alert} from "react-native";

import LocationService from './service/locationService';

export default class extends Component {
  state = {
    location : null,
    errorMessage: null,
    isLoading: false,
  }
  async setLocation(){
    let res:typeData = await LocationService.checkPermission();
    if(res.isLocation)
      Alert.alert("not have any location")
    else
      this.setState({ location: res.location })

  }
  componentWillMount(){
    this.setLocation();
  }
  render() {
    return (
      <View style={styles.appView}>
        <Loading/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  appView:{
    flex: 1
  }
})

interface typeData {
  msg : String,
  location : '',
  isLocation : Boolean
}
