'use client';

import { type HTMLAttributes, useCallback, useState } from 'react';
import { Track } from 'livekit-client';
import { useChat, useRemoteParticipants } from '@livekit/components-react';
import { ChatTextIcon, PhoneDisconnectIcon } from '@phosphor-icons/react/dist/ssr';
import { useSession } from '@/components/app/session-provider';
import { TrackToggle } from '@/components/livekit/agent-control-bar/track-toggle';
import { Button } from '@/components/livekit/button';
import { Toggle } from '@/components/livekit/toggle';
import { cn } from '@/lib/utils';
import { ChatInput } from './chat-input';
import { UseInputControlsProps, useInputControls } from './hooks/use-input-controls';
import { usePublishPermissions } from './hooks/use-publish-permissions';
import { TrackSelector } from './track-selector';

export interface ControlBarControls {
  leave?: boolean;
  camera?: boolean;
  microphone?: boolean;
  screenShare?: boolean;
  chat?: boolean;
}

export interface AgentControlBarProps extends UseInputControlsProps {
  controls?: ControlBarControls;
  onDisconnect?: () => void;
  onChatOpenChange?: (open: boolean) => void;
  onDeviceError?: (error: { source: Track.Source; error: Error }) => void;
}

/**
 * A control bar specifically designed for voice assistant interfaces
 */
export function AgentControlBar({
  controls,
  saveUserChoices = true,
  className,
  onDisconnect,
  onDeviceError,
  onChatOpenChange,
  ...props
}: AgentControlBarProps & HTMLAttributes<HTMLDivElement>) {
  const { send } = useChat();
  const participants = useRemoteParticipants();
  const [chatOpen, setChatOpen] = useState(false);
  const publishPermissions = usePublishPermissions();
  const { isSessionActive, endSession } = useSession();

  const {
    micTrackRef,
    cameraToggle,
    microphoneToggle,
    screenShareToggle,
    handleAudioDeviceChange,
    handleVideoDeviceChange,
    handleMicrophoneDeviceSelectError,
    handleCameraDeviceSelectError,
  } = useInputControls({ onDeviceError, saveUserChoices });

  const handleSendMessage = async (message: string) => {
    await send(message);
  };

  const handleToggleTranscript = useCallback(
    (open: boolean) => {
      setChatOpen(open);
      onChatOpenChange?.(open);
    },
    [onChatOpenChange, setChatOpen]
  );

  const handleDisconnect = useCallback(async () => {
    endSession();
    onDisconnect?.();
  }, [endSession, onDisconnect]);

  const visibleControls = {
    leave: controls?.leave ?? true,
    microphone: controls?.microphone ?? publishPermissions.microphone,
    screenShare: controls?.screenShare ?? publishPermissions.screenShare,
    camera: controls?.camera ?? publishPermissions.camera,
    chat: controls?.chat ?? publishPermissions.data,
  };

  const isAgentAvailable = participants.some((p) => p.isAgent);

  return (
    <div
      aria-label="Voice assistant controls"
      className={cn(
        'bg-white/90 border border-blue-100 backdrop-blur-xl flex flex-col rounded-full p-2 shadow-xl',
        className
      )}
      {...props}
    >
      {/* Chat Input */}
      {visibleControls.chat && (
        <ChatInput
          chatOpen={chatOpen}
          isAgentAvailable={isAgentAvailable}
          onSend={handleSendMessage}
        />
      )}

      <div className="flex items-center gap-3">
        {/* Toggle Microphone */}
        {visibleControls.microphone && (
          <TrackSelector
            kind="audioinput"
            aria-label="Toggle microphone"
            source={Track.Source.Microphone}
            pressed={microphoneToggle.enabled}
            disabled={microphoneToggle.pending}
            audioTrackRef={micTrackRef}
            onPressedChange={microphoneToggle.toggle}
            onMediaDeviceError={handleMicrophoneDeviceSelectError}
            onActiveDeviceChange={handleAudioDeviceChange}
            className="[&_button]:h-12 [&_button]:w-12 [&_button]:rounded-full [&_button]:bg-white [&_button]:text-slate-500 [&_button]:border [&_button]:border-slate-200 [&_button:hover]:bg-blue-50 [&_button:hover]:text-blue-600 [&_button[data-state=on]]:bg-blue-600 [&_button[data-state=on]]:text-white [&_button[data-state=on]]:border-blue-500 [&_button[data-state=on]]:shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          />
        )}

        {/* Toggle Camera */}
        {visibleControls.camera && (
          <TrackSelector
            kind="videoinput"
            aria-label="Toggle camera"
            source={Track.Source.Camera}
            pressed={cameraToggle.enabled}
            pending={cameraToggle.pending}
            disabled={cameraToggle.pending}
            onPressedChange={cameraToggle.toggle}
            onMediaDeviceError={handleCameraDeviceSelectError}
            onActiveDeviceChange={handleVideoDeviceChange}
            className="[&_button]:h-12 [&_button]:w-12 [&_button]:rounded-full [&_button]:bg-white [&_button]:text-slate-500 [&_button]:border [&_button]:border-slate-200 [&_button:hover]:bg-blue-50 [&_button:hover]:text-blue-600 [&_button[data-state=on]]:bg-blue-600 [&_button[data-state=on]]:text-white [&_button[data-state=on]]:border-blue-500 [&_button[data-state=on]]:shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          />
        )}

        {/* Toggle Screen Share */}
        {visibleControls.screenShare && (
          <TrackToggle
            size="icon"
            variant="secondary"
            aria-label="Toggle screen share"
            source={Track.Source.ScreenShare}
            pressed={screenShareToggle.enabled}
            disabled={screenShareToggle.pending}
            onPressedChange={screenShareToggle.toggle}
            className="h-12 w-12 rounded-full bg-white text-slate-500 border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all data-[state=on]:bg-blue-600 data-[state=on]:text-white data-[state=on]:border-blue-500 data-[state=on]:shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          />
        )}

        {/* Toggle Transcript */}
        {visibleControls.chat && (
          <Toggle
            size="icon"
            variant="secondary"
            aria-label="Toggle transcript"
            pressed={chatOpen}
            onPressedChange={handleToggleTranscript}
            className="h-12 w-12 rounded-full bg-white text-slate-500 border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all data-[state=on]:bg-blue-600 data-[state=on]:text-white data-[state=on]:border-blue-500 data-[state=on]:shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          >
            <ChatTextIcon weight="bold" />
          </Toggle>
        )}

        {/* Disconnect */}
        {visibleControls.leave && (
          <Button
            variant="destructive"
            onClick={handleDisconnect}
            disabled={!isSessionActive}
            className="h-12 px-6 rounded-full font-bold tracking-wider bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm"
          >
            <PhoneDisconnectIcon weight="bold" className="mr-2" />
            <span className="hidden md:inline">END CALL</span>
            <span className="inline md:hidden">END</span>
          </Button>
        )}
      </div>
    </div>
  );
}
