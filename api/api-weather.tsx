import axios from 'axios';
import { locationType } from '../types';

const urlBylocation = (data)=>{
  let { lat, lon } = data;
  const tokenJson = require('./weather-key.json')
  let apikey = tokenJson.apikey;
  let url = "http://api.openweathermap.org/data/2.5/forecast";
  let params = `?lat=${lat}&lon=${lon}&APPID=${apikey}&units=metric`;
  return url + params;
}

export default{
  getWeather(data:locationType){
    let url = urlBylocation(data)
    return axios.get(url,{});
  }
}