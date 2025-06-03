export interface TelecomCalculator {
  id: string;
  name: string;
  icon: string;
  color: string;
  premium: boolean;
  description: string;
}

export interface UserPreferences {
  id: number;
  userId: number;
  favorites: string[];
  recentTabs: string[];
  settings: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ComparisonState {
  selectedCalculators: string[];
  isComparing: boolean;
}

export interface TemplateCategory {
  id: string;
  name: string;
  color: string;
  templates: Template[];
}

export interface Template {
  id: string;
  title: string;
  content: string;
  category: string;
}
