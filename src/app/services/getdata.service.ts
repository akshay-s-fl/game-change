import { Injectable } from '@angular/core';

import myData from '../../assets/data.json';

@Injectable({
  providedIn: 'root'
})

export class GetdataService {

  constructor() { }

  getData() {
    return myData.data;
  }
}
