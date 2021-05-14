import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
  @Input() recipes: Array<any>;
  @Output() delete = new EventEmitter<string>();
  constructor() {}

  deleteRecipe(name: string): void {
    this.delete.emit(name);
  }
}
