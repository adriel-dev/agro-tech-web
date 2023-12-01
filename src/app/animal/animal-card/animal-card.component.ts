import { Component, Input } from '@angular/core';
import { Animal } from '../model/Animal';
import { animate, style, transition, trigger } from '@angular/animations';
import { SlideInSlideOutAnimation } from 'src/app/components/animations';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss'],
  animations: [SlideInSlideOutAnimation]
})
export class AnimalCardComponent {

  @Input() animal!: Animal

  isCardContentCollapsed = true

}