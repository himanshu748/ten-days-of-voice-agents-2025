'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DataPacket_Kind, RemoteParticipant, RoomEvent } from 'livekit-client';
import { motion } from 'motion/react';
import { useRoomContext } from '@livekit/components-react';
import type { AppConfig } from '@/app-config';
import { ChatTranscript } from '@/components/app/chat-transcript';
import { DealsCarousel } from '@/components/app/deals-carousel';
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

  return (
    <section className="relative z-10 h-full w-full overflow-hidden bg-white" {...props}>
      {/* KFC Background Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #E4002B 0, #E4002B 1px, transparent 0, transparent 50%)`,
          backgroundSize: '20px 20px',
        }}
      />
      <div className="animate-float pointer-events-none absolute top-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[#E4002B]/10 to-transparent blur-[120px]" />
      <div className="animate-float-delayed pointer-events-none absolute bottom-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-[#E4002B]/10 to-transparent blur-[100px]" />

      {/* Floating Header */}
      <div className="absolute top-6 left-1/2 z-50 -translate-x-1/2">
        <div className="flex items-center gap-3 rounded-full border border-black/5 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-[#E4002B]/20 hover:bg-white">
          <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://upload.wikimedia.org/wikipedia/en/b/bf/KFC_logo.svg"
              alt="KFC Logo"
              className="h-full w-full object-contain p-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-black to-black/80 bg-clip-text text-sm font-bold tracking-wide text-transparent">
              KFC Voice Assistant
            </span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
            <span className="text-[10px] font-medium tracking-wider text-[#10B981] uppercase">
              Live
            </span>
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

          {/* Deals Carousel */}
          <div className="mx-auto w-full max-w-sm">
            <DealsCarousel />
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white/80 p-2 shadow-[0_0_40px_-10px_rgba(228,0,43,0.1)] backdrop-blur-2xl transition-all duration-300 hover:border-[#E4002B]/20 hover:shadow-[0_0_60px_-10px_rgba(228,0,43,0.2)]">
            {/* Glow Effect */}
            <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />

            <AgentControlBar controls={controls} onChatOpenChange={setChatOpen} />
          </div>

          <div className="text-center">
            <p className="text-[10px] font-bold tracking-[0.2em] text-black/30 uppercase">
              Powered by KFC
            </p>
          </div>
        </div>
      </MotionBottom>
    </section>
  );
};
