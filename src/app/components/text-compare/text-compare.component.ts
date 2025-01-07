import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-compare',
  standalone: true,
  imports: [NgIf,NgClass,NgFor,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './text-compare.component.html',
  styleUrl: './text-compare.component.css'
})
export class TextCompareComponent {
  textForm!: FormGroup;
  comparisonResult: any;
  parsedDifferences: { value: string; type: string }[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.textForm = this.fb.group({
      text1: ['', Validators.required],
      text2: ['', Validators.required]
    });
  }

  compareTexts() {
    const { text1, text2 } = this.textForm.value;
    this.http.post('http://localhost:8080/api/compare', { text1, text2 }).subscribe(
      (response: any) => {
        this.comparisonResult = response;
        this.parseDifferences(response.differences);
      },
      (error) => {
        console.error('Error comparing texts', error);
      }
    );
  }

  parseDifferences(differences: string) {
    this.parsedDifferences = [];
    const regex = /[\+\-]\w/g;
    let match;
    while ((match = regex.exec(differences)) !== null) {
      
      const type = match[0].startsWith('+') ? 'added' : 'removed';
      console.log(match)
      this.parsedDifferences.push({ value: match[0][1], type });
    }

  }
}
