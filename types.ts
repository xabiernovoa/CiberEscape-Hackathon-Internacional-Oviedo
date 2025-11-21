
export enum Screen {
  SPLASH = 'SPLASH',
  ONBOARDING = 'ONBOARDING',
  HUB = 'HUB',
  LEVEL_1 = 'LEVEL_1',
  LEVEL_2 = 'LEVEL_2',
  LEVEL_3 = 'LEVEL_3',
  LEVEL_4 = 'LEVEL_4',
  LEVEL_5 = 'LEVEL_5',
  ARCADE = 'ARCADE',
  ONLINE = 'ONLINE',
  PROFILE_SETTINGS = 'PROFILE_SETTINGS',
  RESOURCES = 'RESOURCES'
}

export interface UserProfile {
  name: string;
  xp: number;
  rank: string;
  level: number;
  streak: number;
  completedLevels: number[];
}

export interface GameState {
  screen: Screen;
  profile: UserProfile;
}

export enum ItemState {
  LOCKED,
  UNLOCKED,
  SOLVED
}

export interface LevelData {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Locked' | 'Available' | 'Completed';
  xpReward: number;
}
