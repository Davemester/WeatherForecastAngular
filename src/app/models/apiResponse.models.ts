export interface CurrentWeatherResponse {
  main: {
    temp: number,
    pressure: number,
    humidity: number};
  wind: {
    speed: number,
    deg: number
  };
  dt_txt: string;
}

export interface ForecastResponse {
  list: CurrentWeatherResponse[];

}
