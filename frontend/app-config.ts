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
  companyName: 'Call of Duty',
  pageTitle: 'Call of Duty: Voice Ops',
  pageDescription: "Tactical Voice Operations. Mission Critical.",

  supportsChatInput: true,
  supportsVideoInput: false,
  supportsScreenShare: false,
  isPreConnectBufferEnabled: true,

  logo: '/logo.svg', // We'll keep the file but ignore it visually if we use text/emoji
  accent: '#39FF14', // Neon Green
  logoDark: '/logo.svg',
  accentDark: '#39FF14', // Neon Green
  startButtonText: 'DEPLOY',

  // for LiveKit Cloud Sandbox
  sandboxId: undefined,
  agentName: 'cod-agent',
};
