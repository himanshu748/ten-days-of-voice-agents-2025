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
  companyName: 'Pharmeasy',
  pageTitle: 'Daily Wellness Companion',
  pageDescription: 'A supportive voice companion for daily check-ins about your mood, energy, and goals.',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/pharmeasy-logo.svg',
  accent: '#10847e', // Pharmeasy Teal
  logoDark: '/pharmeasy-logo.svg',
  accentDark: '#10847e', // Pharmeasy Teal
  startButtonText: 'Start Health Check-in',

  // for LiveKit Cloud Sandbox
  sandboxId: undefined,
  agentName: undefined,
};
