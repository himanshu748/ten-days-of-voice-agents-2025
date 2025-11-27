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
  companyName: 'Airtel Payments Bank',
  pageTitle: 'Airtel Payments Bank Fraud Alert',
  pageDescription:
    'Your security is our priority. 24/7 Fraud Detection and Prevention System.',

  supportsChatInput: true,
  supportsVideoInput: false, // Fraud alerts usually voice-only
  supportsScreenShare: false,
  isPreConnectBufferEnabled: true,

  logo: '/logo.svg',
  accent: '#E40000', // Airtel Red
  logoDark: '/logo.svg',
  accentDark: '#ff4d4d', // Lighter Red for dark mode
  startButtonText: 'Connect to Bank Support',

  // for LiveKit Cloud Sandbox
  sandboxId: undefined,
  agentName: undefined,
};
