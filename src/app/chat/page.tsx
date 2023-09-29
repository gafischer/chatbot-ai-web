import Chat from "@/components/chat";

const chat: React.FC = () => {
  return (
    <div className="flex max-h-fit flex-col">
      <main className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex flex-1 items-center justify-between">
          <span className="text-3xl font-bold">Chat</span>
        </div>
        <Chat />
      </main>
    </div>
  );
};

export default chat;
