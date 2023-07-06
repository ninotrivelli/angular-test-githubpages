import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class DbzService {
  public characters: Character[] = [
    { id: uuid(), name: 'Krilling', power: 1000 },
    { id: uuid(), name: 'Goku', power: 9500 },
    { id: uuid(), name: 'Vegeta', power: 7500 },
  ];

  onNewCharacter(character: Character): void {
    if (!character) return;

    const newCharacter: Character = {
      id: uuid(),
      ...character,
    };

    this.characters.push(newCharacter);
  }

  onDeleteCharacter(id?: string): void {
    this.characters = this.characters.filter(
      (character) => character.id !== id
    );
  }
}
