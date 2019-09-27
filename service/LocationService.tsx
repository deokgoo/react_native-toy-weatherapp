import * as Permissions from 'expo-permissions';
import * as Location from "expo-location";
import Constants from 'expo-constants';
import { Platform } from "react-native";
import { locationType, locationData } from "../types";

const LocationService = {
  async _getLocationAsync(){
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return false;
    }
    return Location.getCurrentPositionAsync({});
  },
  async checkPermission(){
    const data:locationData = {
      isLocation: false,
      msg: "You Not have any permmision",
    };
    if (Platform.OS === 'android' && !Constants.isDevice){
      data.msg = "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      return data;
    }else{
      var location = await this._getLocationAsync();
      if(!location)
        return data;
      else{
        let { lat, lon } = location;
        data.location = { lat, lon };
      }
    }
    return data
  }
}

export default LocationService.checkPermission;
