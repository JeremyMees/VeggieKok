import { Component, OnInit } from '@angular/core';
import { Difficulty } from 'src/app/models/difficulty';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  difficultys: Array<Difficulty> = [
    { value: 'Makkelijk' },
    { value: 'Gemiddeld' },
    { value: 'Gevorderd' },
  ];
  selectedValue: string;
  constructor() {}

  ngOnInit(): void {}
}
