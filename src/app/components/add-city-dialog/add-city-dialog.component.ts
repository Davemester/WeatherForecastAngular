import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { WeatherApiService } from 'src/app/services/weather-api.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-city-dialog',
  templateUrl: './add-city-dialog.component.html',
  styleUrls: ['./add-city-dialog.component.css']
})
export class AddCityDialogComponent implements OnInit, OnDestroy {

  addCityForm: FormGroup;
  subsArray: Subscription[] = [];
  errorMessage: string;
  constructor(private dialogRef: MatDialogRef<AddCityDialogComponent>,
              private api: WeatherApiService) {

    this.addCityForm = new FormGroup({
      city: new FormControl(null, Validators.required),
    });
  }
  ngOnInit(): void {
  }

  onSubmit() {
      this.subsArray.push(
        this.api.getCurrentWeather(this.addCityForm.get('city').value).subscribe(
          value => {
            if (value) {
              this.dialogRef.close(this.addCityForm.get('city').value);
            }
        },
          error => {
            const message = 'Hiba történt az adat lekérése közben, kérlek próbálkozz újra!';
            this.showErrorMessage(message);
            this.addCityForm.get('city').setValue(null);
          })
      );
  }
  showErrorMessage(error: string) {
    this.errorMessage = error;
    setTimeout(() => {
      this.errorMessage = '';
    }, 2500);
  }

  ngOnDestroy(): void {
    this.subsArray.forEach(sub => sub.unsubscribe());
  }

}
