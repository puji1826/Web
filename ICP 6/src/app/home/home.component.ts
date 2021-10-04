
import { Component, OnInit, ElementRef,  ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fs_clientID = "JYL2LJST0MKJLO4FEDZKQDIMX2SOIIRIPBNFYU3C1SB4BERT";
  fs_clientSecret = "SOAIAUY4WZ5EOPDUH114AYFS3GSPZ3NWWDU0HN4XRYC12FY1";
  placeValue: any;
  venueList = [];
  
  currentLat: any;
  currentLong: any;
  geolocationPosition: any;
  constructor(private _http: HttpClient) { }

  ngOnInit() {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }
  getRestaurents(place, currentEvent){
    this.placeValue = place;
    if (this.placeValue != null && this.placeValue !== '') {
      /**
       * Write code to get place
       */
      this._http.get('https://api.foursquare.com/v2/venues/search' +
        '?client_id=' + this.fs_clientID +
        '&client_secret=' + this.fs_clientSecret +
        '&v=20160215&limit=5' +
        '&near=' + this.placeValue)
        .subscribe((data: any) => {
          for (let i = 0; i < data.response.venues.length; i++) {
            this.venueList[i] = {
              name: data.response.venues[i].name,
              address: data.response.venues[i].location.address,
              location: data.response.venues[i].location,
            };
          }

        });
    }
    currentEvent.preventDefault();
  }
}