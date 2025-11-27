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
  companyName: 'Zepto',
  pageTitle: 'Zepto Voice - 10 Min Grocery Delivery',
  pageDescription:
    'Groceries delivered in 10 minutes. Just ask Zepto Voice.',

  supportsChatInput: true,
  supportsVideoInput: false,
  supportsScreenShare: false,
  isPreConnectBufferEnabled: true,

  logo: '/logo.svg', // We'll keep the file but ignore it visually if we use text/emoji
  accent: '#3C006B', // Zepto Purple
  logoDark: '/logo.svg',
  accentDark: '#FF3269', // Zepto Pink
  startButtonText: 'Start Shopping',

  // for LiveKit Cloud Sandbox
  sandboxId: undefined,
  agentName: 'freshmarket-agent',
};
