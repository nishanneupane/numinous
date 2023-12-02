"use client";

import React, { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useChat } from "ai/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Profile } from "@prisma/client";

interface ChatFormProps {
    firstQuestion: string;
    prompt: string;
    user: Profile;
}

function ChatForm({
    prompt,
    firstQuestion,
    user,
}: ChatFormProps) {

    const {
        messages,
        handleSubmit: handleOpenAIChatSubmit,
        input,
        handleInputChange,
        isLoading,
        setMessages,
    } = useChat({
        api: "/api/openai",
    });

    useEffect(() => {
        setMessages([
            // { role: "assistant", content: firstQuestion, id: "2" },
            {
                role: "system",
                content: `You are an instructor, leader, or teacher, you are tasked to answer the question presented in this prompt: "${prompt}". Your name is "${user.name}", and your responses should reflect the perspective of an instructor.`,
                id: "1"
            },

        ]);
    }, [prompt, firstQuestion, user.name, setMessages]);



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handleOpenAIChatSubmit(e);
    };

    return (
        <div className="flex h-full max-w-3xl flex-col">
            <div className="flex-grow space-y-4 overflow-y-auto rounded-md border-2 border-solid p-4">
                <ScrollArea className="h-[500px] rounded-md border p-4">
                    {messages.length === 0 && (
                        <div>No messages yet. Start chatting below!</div>
                    )}
                    <div
                        className={`flex items-end gap-2 mb-2 
                                    }`}
                    >
                        <div
                            className={`rounded-lg px-4 py-2
                                        bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white
                                        }`}
                        >
                                <div>{firstQuestion}</div>
                        </div>
                    </div>
                    {messages
                        .filter((message) => message.role !== "system")
                        .map((message, idx) => (
                            <div
                                key={idx}
                                className={`flex items-end gap-2 mb-2 ${message.role === "user" ? "justify-end" : ""
                                    }`}
                            >
                                <div
                                    className={`rounded-lg px-4 py-2 ${message.role === "user"
                                        ? "bg-sky-500 dark:bg-sky-700 text-white"
                                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                                        }`}
                                >
                                    {message.content.split("\n").map((line, i) => (
                                        <div key={i}>{line}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </ScrollArea>
            </div>

            <form onSubmit={handleSubmit} className="my-4 flex">
                <textarea
                    value={input}
                    onChange={handleInputChange}
                    className="flex-grow rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 px-3 py-2 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Type your message"
                    rows={1}
                    style={{ resize: "none" }} // disable manual resize
                />
                <button
                    type="submit"
                    className="ml-4 mt-auto h-10 flex-shrink-0 rounded-md bg-sky-500 dark:bg-sky-700 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4" />
                    ) : (
                        <span>Send</span>
                    )}
                </button>
            </form>
        </div>
    );
}

export default ChatForm;
