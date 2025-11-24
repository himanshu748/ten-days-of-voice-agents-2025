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
  companyName: 'Tata 1mg',
  pageTitle: 'Tata 1mg - Daily Wellness Companion',
  pageDescription: 'A supportive voice companion for daily check-ins about your mood, energy, and goals.',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/tata1mg-logo.svg',
  accent: '#FE6F61', // Tata 1mg Orange-Red
  logoDark: '/tata1mg-logo.svg',
  accentDark: '#FE6F61', // Tata 1mg Orange-Red
  startButtonText: 'Start Your Daily Check-in',

  // for LiveKit Cloud Sandbox
  sandboxId: undefined,
  agentName: undefined,
};
