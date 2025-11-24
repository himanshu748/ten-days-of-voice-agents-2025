import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { useChatMessages } from '@/hooks/useChatMessages';
import { useRoomContext } from '@livekit/components-react';
import { RoomEvent, DataPacket_Kind, RemoteParticipant } from 'livekit-client';

interface CheckinData {
    mood: string;
    goals: string[];
    summary: string;
    date: string;
}

export function OrderReceipt() {
    const messages = useChatMessages();
    const room = useRoomContext();
    const [checkin, setCheckin] = useState<CheckinData | null>(null);

    useEffect(() => {
        const onDataReceived = (payload: Uint8Array, participant?: RemoteParticipant, kind?: DataPacket_Kind, topic?: string) => {
            if (topic === 'agent_events') {
                try {
                    const decoder = new TextDecoder();
                    const strData = decoder.decode(payload);
                    const data = JSON.parse(strData);
                    if (data.type === 'order_saved') { // Keeping event name for compatibility with backend
                        setCheckin(data.data);
                    }
                } catch (e) {
                    console.error('[WellnessCard] Failed to parse agent event', e);
                }
            }
        };

        // Listen for custom window event dispatched by SessionView
        const onCustomEvent = (e: CustomEvent) => {
            setCheckin(e.detail);
        };
        window.addEventListener('order_saved', onCustomEvent as EventListener);

        room.on(RoomEvent.DataReceived, onDataReceived);
        return () => {
            room.off(RoomEvent.DataReceived, onDataReceived);
            window.removeEventListener('order_saved', onCustomEvent as EventListener);
        };
    }, [room]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-16 right-4 left-4 md:left-auto md:top-20 z-40 md:w-80 bg-white text-foreground shadow-xl font-sans text-sm overflow-hidden rounded-xl border border-border/60"
        >
            <div className="p-6 pb-8 space-y-4">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5042BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-primary leading-tight">Health Summary</h3>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                {checkin ? (
                    <div className="space-y-4">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.1 } }
                            }}
                        >
                            <div className="mb-4">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Mood</p>
                                <motion.div variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="bg-secondary/20 p-2 rounded-md text-primary font-medium">
                                    {checkin.mood}
                                </motion.div>
                            </div>

                            <div className="mb-4">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Goals</p>
                                <ul className="space-y-1">
                                    {checkin.goals.map((goal, i) => (
                                        <motion.li key={i} variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="flex items-start gap-2 text-sm text-foreground/80">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                            {goal}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Summary</p>
                                <motion.p variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg italic">
                                    "{checkin.summary}"
                                </motion.p>
                            </div>
                        </motion.div>

                        <div className="border-t border-border pt-4 flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground">Status</span>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">Saved</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <p className="animate-pulse text-xs font-medium">Waiting for check-in...</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
