import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  AnalysisResult,
  AnalysisMetrics,
  Insight,
  RoadmapPhase,
  RefactorSuggestion,
  DetectedPattern,
} from '../models/analysis.model';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private mockAnalysisResult: AnalysisResult = {
    projectName: 'Enterprise Angular App',
    angularVersion: '12.2.0',
    analyzedAt: new Date(),
    filesAnalyzed: 847,
    linesOfCode: 124567,
    metrics: {
      technicalDebtScore: 68,
      modernizationReadiness: 72,
      performanceRiskScore: 45,
      deprecatedPatternsCount: 23,
      migrationComplexity: 'medium',
    },
    insights: [
      {
        id: '1',
        type: 'pattern',
        severity: 'critical',
        title: 'Deprecated ViewChild static flag usage',
        description:
          'Found 15 instances of ViewChild without explicit static flag. This pattern was deprecated in Angular 9 and can cause runtime errors.',
        fileLocation: 'src/app/components/user-profile/user-profile.component.ts',
        codeSnippet: '@ViewChild(\'userForm\') userForm: NgForm;',
        impact: 85,
        aiExplanation:
          'The static flag is required in Angular 9+ to determine when the query should be resolved. Without it, Angular uses a default behavior that may not match your intent, leading to undefined references.',
        recommendation: 'Add explicit static: false flag to all ViewChild decorators',
        filesAffected: 15,
      },
      {
        id: '2',
        type: 'bottleneck',
        severity: 'high',
        title: 'Large bundle size detected',
        description:
          'Main bundle size is 3.2MB, significantly impacting initial load time. Identified 8 large dependencies that could be lazy-loaded.',
        fileLocation: 'angular.json',
        impact: 78,
        aiExplanation:
          'Large bundle sizes directly impact Time to Interactive (TTI) and First Contentful Paint (FCP). Users on slower connections experience degraded performance.',
        recommendation:
          'Implement lazy loading for feature modules and consider code splitting strategies',
        filesAffected: 1,
      },
      {
        id: '3',
        type: 'recommendation',
        severity: 'high',
        title: 'Replace deprecated HTTP module',
        description:
          'Using deprecated @angular/http instead of @angular/common/http. This module was removed in Angular 12.',
        fileLocation: 'src/app/services/api.service.ts',
        codeSnippet: 'import { Http } from \'@angular/http\';',
        impact: 92,
        aiExplanation:
          'The old HTTP module lacks modern features like interceptors, typed responses, and better error handling. Migration is required for Angular 12+.',
        recommendation: 'Migrate to HttpClient from @angular/common/http',
        filesAffected: 12,
      },
      {
        id: '4',
        type: 'pattern',
        severity: 'medium',
        title: 'Inefficient change detection strategy',
        description:
          'Found 34 components using default change detection. OnPush strategy could improve performance by 40%.',
        fileLocation: 'src/app/components/',
        impact: 65,
        aiExplanation:
          'Default change detection runs on every browser event. OnPush strategy only checks when inputs change or events are emitted, significantly reducing CPU usage.',
        recommendation: 'Implement OnPush change detection strategy for pure components',
        filesAffected: 34,
      },
      {
        id: '5',
        type: 'recommendation',
        severity: 'medium',
        title: 'Upgrade to standalone components',
        description:
          'Angular 14+ standalone components eliminate the need for NgModules, reducing boilerplate by 30%.',
        fileLocation: 'src/app/',
        impact: 58,
        aiExplanation:
          'Standalone components simplify the mental model, improve tree-shaking, and make components more portable. They represent the future direction of Angular.',
        recommendation: 'Gradually migrate to standalone components starting with leaf components',
        filesAffected: 89,
      },
      {
        id: '6',
        type: 'bottleneck',
        severity: 'low',
        title: 'Unoptimized RxJS subscriptions',
        description:
          'Detected 18 manual subscriptions without proper cleanup, potential memory leaks.',
        fileLocation: 'src/app/services/',
        impact: 42,
        aiExplanation:
          'Unsubscribed observables continue to hold references and execute callbacks, causing memory leaks and unexpected behavior.',
        recommendation: 'Use async pipe or takeUntil pattern for automatic subscription management',
        filesAffected: 18,
      },
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Quick Wins & Critical Fixes',
        description: 'Address critical issues and implement easy performance improvements',
        duration: '2-3 weeks',
        priority: 'quick-wins',
        tasks: [
          {
            name: 'Fix ViewChild static flags',
            effort: 'low',
            impact: 'high',
          },
          {
            name: 'Migrate from @angular/http to HttpClient',
            effort: 'medium',
            impact: 'high',
          },
          {
            name: 'Implement lazy loading for feature modules',
            effort: 'medium',
            impact: 'high',
          },
          {
            name: 'Add proper RxJS subscription cleanup',
            effort: 'low',
            impact: 'medium',
          },
        ],
      },
      {
        phase: 2,
        title: 'Core Modernization',
        description: 'Upgrade Angular version and adopt modern patterns',
        duration: '4-6 weeks',
        priority: 'modernization',
        tasks: [
          {
            name: 'Upgrade to Angular 17',
            effort: 'high',
            impact: 'high',
          },
          {
            name: 'Migrate to standalone components',
            effort: 'high',
            impact: 'medium',
          },
          {
            name: 'Implement OnPush change detection',
            effort: 'medium',
            impact: 'high',
          },
          {
            name: 'Adopt new control flow syntax (@if, @for)',
            effort: 'medium',
            impact: 'medium',
          },
        ],
      },
      {
        phase: 3,
        title: 'Performance Optimization',
        description: 'Fine-tune performance and implement advanced optimizations',
        duration: '3-4 weeks',
        priority: 'optimization',
        tasks: [
          {
            name: 'Implement code splitting strategies',
            effort: 'medium',
            impact: 'high',
          },
          {
            name: 'Optimize bundle size with tree-shaking',
            effort: 'medium',
            impact: 'medium',
          },
          {
            name: 'Add service worker for caching',
            effort: 'low',
            impact: 'medium',
          },
          {
            name: 'Implement virtual scrolling for large lists',
            effort: 'low',
            impact: 'low',
          },
        ],
      },
    ],
    refactorSuggestions: [
      {
        id: 'r1',
        title: 'Migrate to HttpClient',
        confidence: 95,
        before: `import { Http } from '@angular/http';

export class ApiService {
  constructor(private http: Http) {}

  getUsers() {
    return this.http.get('/api/users')
      .map(res => res.json());
  }
}`,
        after: `import { HttpClient } from '@angular/common/http';

export class ApiService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>('/api/users');
  }
}`,
        explanation:
          'HttpClient provides better type safety, automatic JSON parsing, and built-in interceptor support. The migration is straightforward and eliminates the need for manual JSON parsing.',
        benefits: [
          'Type-safe responses with generics',
          'Automatic JSON parsing',
          'Built-in interceptor support',
          'Better error handling',
          'Testability improvements',
        ],
        effort: 'medium',
        impact: 'high',
        fileLocation: 'src/app/services/api.service.ts',
      },
      {
        id: 'r2',
        title: 'Add ViewChild static flag',
        confidence: 98,
        before: `@Component({
  selector: 'app-user-form',
  template: '<form #userForm>...</form>'
})
export class UserFormComponent {
  @ViewChild('userForm') userForm: NgForm;
}`,
        after: `@Component({
  selector: 'app-user-form',
  template: '<form #userForm>...</form>'
})
export class UserFormComponent {
  @ViewChild('userForm', { static: false }) userForm!: NgForm;
}`,
        explanation:
          'The static flag tells Angular when to resolve the query. Use static: false for elements inside *ngIf or *ngFor, and static: true for elements always present in the template.',
        benefits: [
          'Prevents runtime errors',
          'Explicit query timing',
          'Better type safety with ! operator',
          'Angular 9+ compatibility',
        ],
        effort: 'low',
        impact: 'high',
        fileLocation: 'src/app/components/user-form/user-form.component.ts',
      },
      {
        id: 'r3',
        title: 'Convert to Standalone Component',
        confidence: 88,
        before: `@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule, FormsModule],
  exports: [UserListComponent]
})
export class UserListModule {}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent {}`,
        after: `@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html'
})
export class UserListComponent {}`,
        explanation:
          'Standalone components eliminate the need for NgModules, reducing boilerplate and making components more portable. They can be directly imported where needed.',
        benefits: [
          'Reduced boilerplate code',
          'Better tree-shaking',
          'Simplified mental model',
          'Easier component reuse',
          'Future-proof architecture',
        ],
        effort: 'low',
        impact: 'medium',
        fileLocation: 'src/app/components/user-list/user-list.component.ts',
      },
      {
        id: 'r4',
        title: 'Implement OnPush Change Detection',
        confidence: 82,
        before: `@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  @Input() product: Product;
}`,
        after: `@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input() product: Product;
}`,
        explanation:
          'OnPush change detection only checks the component when its inputs change or events are emitted, significantly reducing unnecessary checks and improving performance.',
        benefits: [
          '40-60% performance improvement',
          'Reduced CPU usage',
          'Better scalability',
          'Encourages immutable patterns',
        ],
        effort: 'low',
        impact: 'high',
        fileLocation: 'src/app/components/product-card/product-card.component.ts',
      },
      {
        id: 'r5',
        title: 'Use Async Pipe for Subscriptions',
        confidence: 90,
        before: `export class UserComponent implements OnInit, OnDestroy {
  users: User[];
  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}`,
        after: `export class UserComponent {
  users$ = this.userService.getUsers();

  constructor(private userService: UserService) {}
}

// Template: <div *ngFor="let user of users$ | async">`,
        explanation:
          'The async pipe automatically subscribes and unsubscribes, preventing memory leaks and reducing boilerplate code. It also works seamlessly with OnPush change detection.',
        benefits: [
          'Automatic subscription management',
          'No memory leaks',
          'Less boilerplate code',
          'Better with OnPush',
          'Cleaner component code',
        ],
        effort: 'low',
        impact: 'medium',
        fileLocation: 'src/app/components/user/user.component.ts',
      },
    ],
  };

  getAnalysisResult(): Observable<AnalysisResult> {
    return of(this.mockAnalysisResult).pipe(delay(800));
  }

  getDeprecatedPatterns(): DetectedPattern[] {
    return [
      {
        name: 'ViewChild without static flag',
        count: 15,
        severity: 'critical',
        files: 15,
        description: 'Missing explicit static flag in ViewChild decorators',
      },
      {
        name: 'Deprecated @angular/http',
        count: 12,
        severity: 'critical',
        files: 12,
        description: 'Using removed HTTP module instead of HttpClient',
      },
      {
        name: 'Manual subscriptions',
        count: 18,
        severity: 'high',
        files: 18,
        description: 'Subscriptions without proper cleanup',
      },
      {
        name: 'Default change detection',
        count: 34,
        severity: 'medium',
        files: 34,
        description: 'Components not using OnPush strategy',
      },
      {
        name: 'NgModule-based components',
        count: 89,
        severity: 'medium',
        files: 89,
        description: 'Components not migrated to standalone',
      },
      {
        name: 'Legacy template syntax',
        count: 45,
        severity: 'low',
        files: 45,
        description: 'Using *ngIf instead of @if control flow',
      },
    ];
  }

  getMetricsTrend() {
    return {
      technicalDebt: [
        { date: '2024-01', score: 82 },
        { date: '2024-02', score: 78 },
        { date: '2024-03', score: 75 },
        { date: '2024-04', score: 71 },
        { date: '2024-05', score: 68 },
      ],
      performance: [
        { date: '2024-01', score: 58 },
        { date: '2024-02', score: 55 },
        { date: '2024-03', score: 52 },
        { date: '2024-04', score: 48 },
        { date: '2024-05', score: 45 },
      ],
    };
  }
}

// Made with Bob
