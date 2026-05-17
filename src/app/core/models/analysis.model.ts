export interface AnalysisResult {
  projectName: string;
  angularVersion: string;
  analyzedAt: Date;
  filesAnalyzed: number;
  linesOfCode: number;
  metrics: AnalysisMetrics;
  insights: Insight[];
  roadmap: RoadmapPhase[];
  refactorSuggestions: RefactorSuggestion[];
}

export interface AnalysisMetrics {
  technicalDebtScore: number; // 0-100
  modernizationReadiness: number; // 0-100
  performanceRiskScore: number; // 0-100
  deprecatedPatternsCount: number;
  migrationComplexity: 'low' | 'medium' | 'high';
}

export interface Insight {
  id: string;
  type: 'pattern' | 'bottleneck' | 'recommendation';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  fileLocation: string;
  codeSnippet?: string;
  impact: number; // 0-100
  aiExplanation: string;
  recommendation?: string;
  filesAffected?: number;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  description: string;
  duration: string;
  priority: 'quick-wins' | 'modernization' | 'optimization';
  tasks: RoadmapTask[];
}

export interface RoadmapTask {
  name: string;
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  completed?: boolean;
}

export interface RefactorSuggestion {
  id: string;
  title: string;
  confidence: number; // 0-100
  before: string;
  after: string;
  explanation: string;
  benefits: string[];
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  fileLocation?: string;
}

export interface DetectedPattern {
  name: string;
  count: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  files: number;
  description?: string;
}

// Made with Bob
