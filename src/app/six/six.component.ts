import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-six',
  templateUrl: './six.component.html',
  styleUrls: ['./six.component.css']
})
export class SixComponent {
  inputValue: string = '';
  constructor(private sharedService: SharedService) { }

  saveInput() {
    console.log(this.inputValue);
    this.sharedService.key= this.inputValue;
    this.sharedService.changeAcces();
  }
  openLink() {
    const url = 'https://api.nasa.gov'; // Замените ссылку на нужную
    window.open(url, '_blank');
  }
}
