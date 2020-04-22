import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { WeatherApiService } from 'src/app/services/weather-api.service';
import { Subscription } from 'rxjs';
import { Weather } from 'src/app/models/weather.model';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.css']
})
export class CityWeatherComponent implements OnInit, OnDestroy {
  @Input() city: string;
  currentDateString = new Date().toLocaleDateString('hu');
  date = 'Dátum';
  temperatureData: any;
  currentWeatherDatas: Weather;
  temperatureString = 'Hőmérséklet (°C)';
  subsArray: Subscription[] = [];
  constructor( private weatherService: WeatherApiService,
               private spinner: SpinnerService) {}

  ngOnInit(): void {
    this.spinner.showSpinner();
    this.subsArray.push(
      this.weatherService.getCurrentWeather(this.city).subscribe(data => {
        this.currentWeatherDatas = data;
      })
    );
    this.subsArray.push(
      this.weatherService.get5DaysForeCast(this.city).subscribe(data => {
        this.temperatureData = [this.createChartData(data)];
        this.spinner.stopSpinner();
      })
    );
  }
  createChartData(datas: Weather []) {
    const temperatureDataObject = {
      name: this.city,
      series: []
    };
    datas.forEach(data => {
      const serie = {
        name: data.date,
        value: data.temp
      };
      temperatureDataObject.series.push(serie);
    });
    return temperatureDataObject;
  }
  ngOnDestroy() {
    this.subsArray.forEach(sub => sub.unsubscribe());
  }


}
