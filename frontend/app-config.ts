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
  companyName: 'SecureBank',
  pageTitle: 'SecureBank Fraud Alert',
  pageDescription:
    'Your security is our priority. 24/7 Fraud Detection and Prevention System.',

  supportsChatInput: true,
  supportsVideoInput: false, // Fraud alerts usually voice-only
  supportsScreenShare: false,
  isPreConnectBufferEnabled: true,

  logo: '/logo.svg',
  accent: '#0f172a', // Slate 900
  logoDark: '/logo.svg',
  accentDark: '#38bdf8', // Sky 400
  startButtonText: 'Connect to Fraud Dept',

  // for LiveKit Cloud Sandbox
  sandboxId: undefined,
  agentName: undefined,
};
