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
  companyName: 'The Gauntlet',
  pageTitle: 'The Gauntlet: Startup Validator',
  pageDescription: 'Pitch your startup to The Partner. Survive 3 rounds of brutal validation.',

  supportsChatInput: true,
  supportsVideoInput: false,
  supportsScreenShare: false,
  isPreConnectBufferEnabled: true,

  logo: '/lk-logo.svg', // Keeping default logo for now, or could change if user provided one
  accent: '#e11d48', // Red for high stakes
  logoDark: '/lk-logo-dark.svg',
  accentDark: '#f43f5e', // Lighter red for dark mode
  startButtonText: 'Enter The Gauntlet',

  // for LiveKit Cloud Sandbox
  sandboxId: undefined,
  agentName: 'startup-validator',
};
