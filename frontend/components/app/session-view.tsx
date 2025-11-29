'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DataPacket_Kind, RemoteParticipant, RoomEvent } from 'livekit-client';
import { motion } from 'motion/react';
import { useRoomContext } from '@livekit/components-react';
import type { AppConfig } from '@/app-config';
import { ChatTranscript } from '@/components/app/chat-transcript';
import { ImageViewer } from '@/components/app/image-viewer';
import { PreConnectMessage } from '@/components/app/preconnect-message';
import { TileLayout } from '@/components/app/tile-layout';
import {
  AgentControlBar,
  type ControlBarControls,
} from '@/components/livekit/agent-control-bar/agent-control-bar';
import { useChatMessages } from '@/hooks/useChatMessages';
import { useConnectionTimeout } from '@/hooks/useConnectionTimout';
import { useDebugMode } from '@/hooks/useDebug';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../livekit/scroll-area/scroll-area';
import { Button } from '@/components/livekit/button';
import { ArrowClockwise, Eye, LockKey } from '@phosphor-icons/react/dist/ssr';

/* eslint-disable @typescript-eslint/no-explicit-any */

const MotionBottom = motion.create('div');

const IN_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const BOTTOM_VIEW_MOTION_PROPS = {
  variants: {
    visible: {
      opacity: 1,
      translateY: '0%',
    },
    hidden: {
      opacity: 0,
      translateY: '100%',
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: {
    duration: 0.3,
    delay: 0.5,
    ease: 'easeOut',
  } as any,
};

interface FadeProps {
  top?: boolean;
  bottom?: boolean;
  className?: string;
}

export function Fade({ top = false, bottom = false, className }: FadeProps) {
  return (
    <div
      className={cn(
        'from-background pointer-events-none h-4 bg-linear-to-b to-transparent',
        top && 'bg-linear-to-b',
        bottom && 'bg-linear-to-t',
        className
      )}
    />
  );
}
interface SessionViewProps {
  appConfig: AppConfig;
}

export const SessionView = ({
  appConfig,
  ...props
}: React.ComponentProps<'section'> & SessionViewProps) => {
  useConnectionTimeout(200_000);
  useDebugMode({ enabled: IN_DEVELOPMENT });

  const room = useRoomContext();
  const messages = useChatMessages();
  const [chatOpen, setChatOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [generatedImage, setGeneratedImage] = useState<{ url: string; prompt: string } | null>(
    null
  );

  const controls: ControlBarControls = {
    leave: true,
    microphone: true,
    chat: appConfig.supportsChatInput,
    camera: appConfig.supportsVideoInput,
    screenShare: appConfig.supportsVideoInput,
  };

  useEffect(() => {
    const lastMessage = messages.at(-1);
    const lastMessageIsLocal = lastMessage?.from?.isLocal === true;

    if (scrollAreaRef.current && lastMessageIsLocal) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const onDataReceived = (
      payload: Uint8Array,
      participant?: RemoteParticipant,
      kind?: DataPacket_Kind,
      topic?: string
    ) => {
      if (topic === 'agent_events') {
        try {
          const parsedPayload = JSON.parse(new TextDecoder().decode(payload));
          if (parsedPayload.type === 'image') {
            setGeneratedImage(parsedPayload.data);
          }
        } catch (e) {
          console.error('Failed to parse agent event:', e);
        }
      }
    };

    room.on(RoomEvent.DataReceived, onDataReceived);
    return () => {
      room.off(RoomEvent.DataReceived, onDataReceived);
    };
  }, [room]);

  const handleRestart = async () => {
    window.location.reload();
  };

  return (
    <section className="relative z-10 h-full w-full overflow-hidden bg-black text-cyan-500 font-mono" {...props}>
      {/* Background */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: `url('/escape-room-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 pointer-events-none" />

      {/* HUD Corners */}
      <div className="pointer-events-none fixed top-4 left-4 h-16 w-16 border-t-2 border-l-2 border-cyan-500/50" />
      <div className="pointer-events-none fixed top-4 right-4 h-16 w-16 border-t-2 border-r-2 border-cyan-500/50" />
      <div className="pointer-events-none fixed bottom-4 left-4 h-16 w-16 border-b-2 border-l-2 border-cyan-500/50" />
      <div className="pointer-events-none fixed bottom-4 right-4 h-16 w-16 border-b-2 border-r-2 border-cyan-500/50" />

      {/* Floating Header */}
      <div className="absolute top-6 left-1/2 z-50 -translate-x-1/2">
        <div className="flex items-center gap-3 border border-cyan-500/30 bg-black/80 px-6 py-2 shadow-[0_0_15px_rgba(0,255,255,0.2)] backdrop-blur-xl rounded-sm">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-cyan-500 animate-pulse" />
            <span className="text-sm font-bold tracking-widest text-cyan-500 uppercase">
              OVERSEER CONNECTED
            </span>
            <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_#00FFFF]" />
          </div>
        </div>
      </div>

      {/* Image Viewer Overlay */}
      <ImageViewer
        imageUrl={generatedImage?.url ?? null}
        prompt={generatedImage?.prompt ?? null}
        onClose={() => setGeneratedImage(null)}
      />

      {/* Chat Transcript */}
      <div
        className={cn(
          'fixed inset-0 grid grid-cols-1 grid-rows-1',
          !chatOpen && 'pointer-events-none'
        )}
      >
        <Fade top className="absolute inset-x-4 top-0 h-40" />
        <ScrollArea ref={scrollAreaRef} className="px-4 pt-40 pb-[220px] md:px-6 md:pb-[250px]">
          <ChatTranscript
            hidden={!chatOpen}
            messages={messages}
            className="mx-auto max-w-2xl space-y-3 transition-opacity duration-300 ease-out"
          />
        </ScrollArea>
      </div>

      {/* Tile Layout */}
      <TileLayout chatOpen={chatOpen} />

      {/* Bottom Controls */}
      <MotionBottom
        {...BOTTOM_VIEW_MOTION_PROPS}
        className="fixed inset-x-3 bottom-8 z-50 flex justify-center md:inset-x-12"
      >
        <div className="flex w-full max-w-2xl flex-col gap-4">
          {appConfig.isPreConnectBufferEnabled && (
            <PreConnectMessage messages={messages} className="mx-auto" />
          )}

          <div className="relative overflow-hidden border border-cyan-500/30 bg-black/80 p-2 shadow-[0_0_20px_-5px_rgba(0,255,255,0.2)] backdrop-blur-2xl rounded-sm">

            <div className="flex items-center justify-between px-4">
              <AgentControlBar controls={controls} onChatOpenChange={setChatOpen} />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRestart}
                className="text-cyan-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-none border border-cyan-500/20"
                title="Reset Simulation"
              >
                <ArrowClockwise className="h-5 w-5" />
              </Button>
            </div>

          </div>

          <div className="text-center">
            <p className="text-[10px] font-bold tracking-[0.5em] text-cyan-500/30 uppercase">
              ENIGMA PROTOCOL // ACTIVE
            </p>
          </div>
        </div>
      </MotionBottom>
    </section>
  );
};
