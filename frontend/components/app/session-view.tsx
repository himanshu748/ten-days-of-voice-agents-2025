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

// ... (existing imports)

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
    <section className="bg-background relative z-10 h-full w-full overflow-hidden" {...props}>
      {/* Enhanced Background with Floating Shapes */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, #4F46E5 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />
      <div className="from-primary/10 animate-float pointer-events-none absolute top-[-10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-gradient-to-br to-transparent opacity-40 blur-[100px]" />
      <div className="from-secondary/10 animate-float-delayed pointer-events-none absolute bottom-[-10%] left-[-5%] h-[350px] w-[350px] rounded-full bg-gradient-to-tl to-transparent opacity-40 blur-[90px]" />

      {/* Enhanced Branding Header */}
      <div className="group absolute top-4 left-4 z-50">
        <div className="flex items-center gap-3 rounded-full border border-white/60 bg-white/90 px-5 py-2.5 shadow-lg backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className="relative">
            <span className="text-2xl">🎓</span>
            <div className="bg-primary/20 absolute inset-0 rounded-full opacity-0 blur-md transition-opacity group-hover:opacity-50" />
          </div>
          <div className="from-primary to-primary/80 bg-gradient-to-r bg-clip-text text-xl font-bold tracking-tight text-transparent">
            Active Recall Coach
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
        <ScrollArea ref={scrollAreaRef} className="px-4 pt-40 pb-[150px] md:px-6 md:pb-[180px]">
          <ChatTranscript
            hidden={!chatOpen}
            messages={messages}
            className="mx-auto max-w-2xl space-y-3 transition-opacity duration-300 ease-out"
          />
        </ScrollArea>
      </div>

      {/* Tile Layout */}
      <TileLayout chatOpen={chatOpen} />

      {/* Bottom */}
      <MotionBottom
        {...BOTTOM_VIEW_MOTION_PROPS}
        className="fixed inset-x-3 bottom-0 z-50 md:inset-x-12"
      >
        {appConfig.isPreConnectBufferEnabled && (
          <PreConnectMessage messages={messages} className="pb-4" />
        )}
        <div className="bg-background/95 border-primary/20 relative mx-auto max-w-2xl rounded-t-3xl border-t-2 pb-3 shadow-[0_-15px_50px_-20px_rgba(254,111,97,0.2)] backdrop-blur-xl md:pb-12">
          <Fade bottom className="absolute inset-x-0 top-0 h-4 -translate-y-full" />
          <AgentControlBar controls={controls} onChatOpenChange={setChatOpen} />
          <div className="absolute right-0 bottom-2 left-0 text-center">
            <p className="text-muted-foreground/60 flex items-center justify-center gap-2 text-[9px] font-medium tracking-wider uppercase">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              © 2025 · ACTIVE RECALL COACH · CONNECTED
            </p>
          </div>
        </div>
      </MotionBottom>
    </section>
  );
};
