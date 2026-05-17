import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MockDataService } from '../../core/services/mock-data.service';
import { RefactorSuggestion } from '../../core/models/analysis.model';

@Component({
  selector: 'app-refactor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './refactor.component.html',
  styleUrls: ['./refactor.component.css'],
})
export class RefactorComponent implements OnInit {
  refactorSuggestions: RefactorSuggestion[] = [];
  selectedSuggestion?: RefactorSuggestion;
  loading = true;

  constructor(
    private mockDataService: MockDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.mockDataService.getAnalysisResult().subscribe((result) => {
      this.refactorSuggestions = result.refactorSuggestions;
      if (this.refactorSuggestions.length > 0) {
        this.selectedSuggestion = this.refactorSuggestions[0];
      }
      this.loading = false;
    });
  }

  selectSuggestion(suggestion: RefactorSuggestion) {
    this.selectedSuggestion = suggestion;
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  getConfidenceColor(confidence: number): string {
    if (confidence >= 90) return 'text-green-400 bg-green-500/20 border-green-500/30';
    if (confidence >= 75) return 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30';
    if (confidence >= 60) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
  }

  getEffortBadgeColor(effort: string): string {
    const colors: { [key: string]: string } = {
      low: 'bg-green-500/20 text-green-400 border-green-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      high: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colors[effort] || colors['medium'];
  }

  getImpactBadgeColor(impact: string): string {
    const colors: { [key: string]: string } = {
      low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      medium: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      high: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    };
    return colors[impact] || colors['medium'];
  }

  getConfidenceBarColor(confidence: number): string {
    if (confidence >= 90) return 'from-green-500 to-green-600';
    if (confidence >= 75) return 'from-cyan-500 to-cyan-600';
    if (confidence >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-orange-500 to-orange-600';
  }
}

// Made with Bob
