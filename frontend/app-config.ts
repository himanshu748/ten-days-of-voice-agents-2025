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
  companyName: 'Reliance Group',
  pageTitle: 'Reliance Group AI Assistant',
  pageDescription:
    'Growth is Life. Explore our digital services, retail, and energy solutions.',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/logo.svg',
  accent: '#004b8d', // Reliance Blue
  logoDark: '/logo.svg',
  accentDark: '#004b8d', // Reliance Blue
  startButtonText: 'Connect with Reliance SDR',

  // for LiveKit Cloud Sandbox
  sandboxId: undefined,
  agentName: undefined,
};
