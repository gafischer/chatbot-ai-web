"use client";

import { useChat } from "ai/react";
import { SendHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

const Chat: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "http://localhost:3333/ai/complete",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return (
    <main className="w-4/5 self-center">
      <ScrollArea className="h-[600px] w-full pr-4">
        {messages.map((message) => {
          return (
            <div
              key={message.id}
              className="flex gap-3 border-b py-4 text-zinc-200"
            >
              {message.role === "user" && (
                <Avatar className="rounded-sm">
                  <AvatarFallback>GS</AvatarFallback>
                  <AvatarImage src="https://github.com/gafischer.png" />
                </Avatar>
              )}
              {message.role === "assistant" && (
                <Avatar>
                  <AvatarFallback>CB</AvatarFallback>
                  <AvatarImage src="/images/logo.png" height="auto" />
                </Avatar>
              )}
              <p className="ml-4 self-center leading-relaxed">
                {message.content}
              </p>
            </div>
          );
        })}
      </ScrollArea>
      <div>
        <form className="flex w-full" onSubmit={handleSubmit}>
          <div className="relative w-full">
            <Input
              placeholder="Send a message"
              value={input}
              onChange={handleInputChange}
              className="h-16"
            />
            <Button
              type="submit"
              variant="ghost"
              className="pointer-events-none absolute right-0 top-3 text-muted-foreground"
            >
              <SendHorizontal size={20} />
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Chat;
