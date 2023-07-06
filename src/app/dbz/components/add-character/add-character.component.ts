import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';
import { v4 as uuid } from 'uuid';
@Component({
  selector: 'dbz-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css'],
})
export class AddCharacterComponent {
  @Output()
  onNewCharacter: EventEmitter<Character> = new EventEmitter();

  public character: Character = {
    name: '',
    power: 0,
  };

  emitCharacter(): void {
    if (
      this.character.name.length === 0 ||
      this.character.power < 0 ||
      isNaN(this.character.power)
    )
      return;

    this.onNewCharacter.emit(this.character);

    this.character = {
      name: '',
      power: 0,
    };
  }
}
