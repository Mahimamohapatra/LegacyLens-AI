import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MockDataService } from '../../core/services/mock-data.service';
import {
  AnalysisResult,
  DetectedPattern,
  Insight,
} from '../../core/models/analysis.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  analysisResult?: AnalysisResult;
  deprecatedPatterns: DetectedPattern[] = [];
  loading = true;
  selectedTab: 'overview' | 'insights' | 'roadmap' = 'overview';

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
      this.analysisResult = result;
      this.deprecatedPatterns = this.mockDataService.getDeprecatedPatterns();
      this.loading = false;
    });
  }

  navigateToRefactor() {
    this.router.navigate(['/refactor']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  selectTab(tab: 'overview' | 'insights' | 'roadmap') {
    this.selectedTab = tab;
  }

  getSeverityColor(severity: string): string {
    const colors: { [key: string]: string } = {
      critical: 'text-red-400 bg-red-500/10 border-red-500/30',
      high: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
      medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
      low: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    };
    return colors[severity] || colors['low'];
  }

  getScoreColor(score: number): string {
    if (score >= 80) return 'text-red-400';
    if (score >= 60) return 'text-orange-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-green-400';
  }

  getScoreGradient(score: number): string {
    if (score >= 80) return 'from-red-500 to-red-600';
    if (score >= 60) return 'from-orange-500 to-orange-600';
    if (score >= 40) return 'from-yellow-500 to-yellow-600';
    return 'from-green-500 to-green-600';
  }

  getReadinessColor(score: number): string {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
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

  getPriorityColor(priority: string): string {
    const colors: { [key: string]: string } = {
      'quick-wins': 'bg-green-500/20 text-green-400 border-green-500/30',
      modernization: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      optimization: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    };
    return colors[priority] || colors['modernization'];
  }

  getCriticalInsights(): Insight[] {
    return (
      this.analysisResult?.insights.filter((i) => i.severity === 'critical') ||
      []
    );
  }

  getHighInsights(): Insight[] {
    return (
      this.analysisResult?.insights.filter((i) => i.severity === 'high') || []
    );
  }
}

// Made with Bob
