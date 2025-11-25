export interface AppConfig {
  pageTitle: string;
  pageDescription: string;
  companyName: string;

  supportsChatInput: boolean;
  supportsVideoInput: boolean;
  supportsScreenShare: boolean;
  isPreConnectBufferEnabled: boolean;

  logo: string;
  startButtonText: string;
  accent?: string;
  logoDark?: string;
  accentDark?: string;

  // for LiveKit Cloud Sandbox
  sandboxId?: string;
  agentName?: string;
}

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'Active Recall',
  pageTitle: 'Active Recall Coach',
  pageDescription:
    'Your personal tutor for mastering concepts through active recall. Learn, Quiz, and Teach-Back.',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/logo.svg',
  accent: '#DC2626', // Red-600
  logoDark: '/logo.svg',
  accentDark: '#DC2626', // Red-600
  startButtonText: 'Start Learning Session',

  // for LiveKit Cloud Sandbox
  sandboxId: undefined,
  agentName: undefined,
};
