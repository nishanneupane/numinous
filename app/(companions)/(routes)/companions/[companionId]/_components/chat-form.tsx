"use client";

import React, { useEffect, useRef } from "react";
import { Send, Loader2 } from "lucide-react";
import { useChat } from "ai/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface ChatFormProps {
    firstQuestion: string;
    prompt: string;
    user: {
        name: string;
        imageUrl?: string;
    }
}

function ChatForm({
    prompt,
    firstQuestion,
    user,
}: ChatFormProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const {
        messages,
        handleSubmit: handleOpenAIChatSubmit,
        input,
        handleInputChange,
        isLoading,
        setMessages,
    } = useChat({
        api: "/api/openai",
        body: { prompt, user },
    });

    useEffect(() => {
        setMessages([
            {
                role: "assistant",
                content: firstQuestion,
                id: "1"
            },
        ]);
    }, [firstQuestion, setMessages]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleOpenAIChatSubmit(e);
    };

    return (
        <Card className="flex h-[80vh] flex-col overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardContent className="flex-grow p-0">
                <ScrollArea className="h-full p-4" ref={scrollRef}>
                    {messages.length === 0 ? (
                        <div className="text-center text-gray-500 dark:text-gray-400 py-8 animate-fade-in">
                            Start your conversation with {user.name}
                        </div>
                    ) : (
                        <>
                            {messages.map((message, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-start gap-3 mb-4 ${message.role === "user" ? "justify-end" : ""} animate-slide-in-bottom`}
                                >
                                    {message.role !== "user" && (
                                        <Avatar>
                                            <AvatarImage src={user.imageUrl || "/demo.png"} alt={user.name} />
                                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={`rounded-lg px-4 py-2 max-w-[80%] ${message.role === "user"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-secondary text-secondary-foreground"
                                        }`}>
                                        <p className="text-sm">{message.content}</p>
                                    </div>
                                    {message.role === "user" && (
                                        <Avatar>
                                            <AvatarImage src="/smile.png" alt="You" />
                                            <AvatarFallback>You</AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                        </>
                    )}
                </ScrollArea>
            </CardContent>
            <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Type your message..."
                        className="flex-grow transition-all duration-300 focus:ring-2 focus:ring-primary"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={isLoading}
                        className="transition-all duration-300 hover:bg-primary/90"
                    >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                </div>
            </form>
        </Card>
    );
}

export default ChatForm;
