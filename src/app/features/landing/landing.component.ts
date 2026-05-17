import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  features = [
    {
      icon: '🤖',
      title: 'AI-Powered Analysis',
      description:
        'Advanced machine learning algorithms analyze your Angular codebase to identify technical debt, deprecated patterns, and modernization opportunities.',
    },
    {
      icon: '📊',
      title: 'Real-time Insights',
      description:
        'Get instant visibility into your code health with comprehensive metrics, performance scores, and actionable recommendations.',
    },
    {
      icon: '🚀',
      title: 'Migration Roadmap',
      description:
        'Receive a prioritized, phase-by-phase migration plan tailored to your codebase, with effort estimates and impact analysis.',
    },
    {
      icon: '💡',
      title: 'Smart Refactoring',
      description:
        'AI-generated code suggestions with before/after comparisons, confidence scores, and detailed explanations for every change.',
    },
    {
      icon: '🎯',
      title: 'Risk Assessment',
      description:
        'Identify performance bottlenecks, security vulnerabilities, and breaking changes before they impact production.',
    },
    {
      icon: '📈',
      title: 'Progress Tracking',
      description:
        'Monitor your modernization journey with trend analysis, completion metrics, and team productivity insights.',
    },
  ];

  stats = [
    { value: '10M+', label: 'Lines Analyzed' },
    { value: '500+', label: 'Projects Modernized' },
    { value: '40%', label: 'Avg. Performance Gain' },
    { value: '60%', label: 'Faster Migration' },
  ];

  constructor(private router: Router) {}

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}

// Made with Bob
