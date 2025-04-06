// API response types
export interface StraicoResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

// Belief analysis types
export interface BeliefAnalysisRequest {
  belief: string;
  intensity: number;
  context?: string;
}

export interface BeliefAnalysisResponse extends StraicoResponse {
  data?: {
    category: string;
    rootCause: string;
    impact: string;
    recommendedProtocols: RecommendedProtocol[];
  };
}

export interface RecommendedProtocol {
  id: string;
  name: string;
  suitability: number;
  description: string;
}

// Protocol guidance types
export interface ProtocolGuidanceRequest {
  protocolId: string;
  belief: string;
  step: number;
  userResponse?: string;
}

export interface ProtocolGuidanceResponse extends StraicoResponse {
  data?: {
    instruction: string;
    example: string;
    nextStep: number;
    isComplete: boolean;
  };
}

// Power development types
export interface PowerAssessmentRequest {
  answers: Record<string, number>;
}

export interface PowerAssessmentResponse extends StraicoResponse {
  data?: {
    overallScore: number;
    dimensions: PowerDimension[];
    recommendations: string[];
  };
}

export interface PowerDimension {
  id: string;
  name: string;
  score: number;
  description: string;
}
