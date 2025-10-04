// FIX: Import THREE to resolve type errors for THREE.Vector3
import * as THREE from 'three';

export interface Section {
  title: string;
  content: string;
  bg: 'default' | 'vaporPressure' | 'boilingPoint' | 'freezingPoint' | 'osmoticPressure' | 'intro' | 'definition' | 'types' | 'electrolytes' | 'applications' | 'summary';
  position?: THREE.Vector3;
}

export type Sections = Record<string, Section>;

export interface Achievement {
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export type Achievements = Record<string, Achievement>;

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}