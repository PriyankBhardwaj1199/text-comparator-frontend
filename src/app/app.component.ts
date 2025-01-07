import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextCompareComponent } from "./components/text-compare/text-compare.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TextCompareComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'text-compare';
}
