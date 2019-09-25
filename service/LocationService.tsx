import * as Permissions from 'expo-permissions';
import * as Location from "expo-location";
import Constants from 'expo-constants'
import { Platform } from "react-native";

export default {
  data : {
    msg : String,
    location : '',
    isLocation : false
  },
  async _getLocationAsync(){
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      'Permission to access location was denied'
      return false;
    }
    let location = await Location.getCurrentPositionAsync({});
    return true
  },
  async checkPermission(){
    if (Platform.OS === 'android' && !Constants.isDevice)
      this.data.msg = "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
    else
      this.data.isLocation = await this._getLocationAsync();
    return this.data

  }
}