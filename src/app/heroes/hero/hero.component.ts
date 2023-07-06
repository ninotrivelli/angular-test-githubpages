import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent {
  public name: string = 'ironman';
  public age: number = 45;

  get capitalizedName(): string {
    if (this.name.length === 0) {
      return this.name;
    }
    // return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    return this.name.toUpperCase();
  }

  getHeroDescription(): string {
    return ` ${this.name} is ${this.age} years old`;
  }

  changeHero(): void {
    this.name = 'spiderman';
  }

  changeAge(): void {
    this.age = 23;
  }

  reset(): void {
    this.name = 'ironman';
    this.age = 45;
  }
}
