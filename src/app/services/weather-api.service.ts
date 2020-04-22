import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Weather } from '../models/weather.model';
import { CurrentWeatherResponse, ForecastResponse } from '../models/apiResponse.models';


@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  APIkey = '60601ea05da88d4316d17fd39790f98b';
  constructor( private http: HttpClient) {}

  getCurrentWeather(city: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.APIkey}&units=metric`).pipe(
      map((value: CurrentWeatherResponse) => {
        return this.parseCurrentWeatherData(value);
      })
    );
  }

  get5DaysForeCast(city: string) {
    return this.http.get (`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.APIkey}&units=metric`).pipe(
      map((value: ForecastResponse) => {
        return this.parseForecastData(value);
      })
    );
  }

  private parseCurrentWeatherData(data: CurrentWeatherResponse): Weather {
    const weather: Weather = {
      temp: data.main.temp,
      pressure: data.main.pressure,
      humid: data.main.humidity,
      windForce: data.wind.speed,
      windDirection: data.wind.deg
     };
    return weather;
  }

  private parseForecastData(forecast: ForecastResponse): Weather[] {
    const forecastArray: Weather[] = [];
    forecast.list.forEach(item => {
       if (new Date(item.dt_txt).getHours() === 12 )  {
        const weather: Weather = {
          temp: item.main.temp,
          date: new Date(item.dt_txt).toLocaleDateString('hu'),
         };
        if (forecastArray.length < 5) {
          forecastArray.push(weather);
        }
      }
    }
    );
    return forecastArray;
  }
}
