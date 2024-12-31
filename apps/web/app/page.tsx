import ai_symbol from "@assets/ai-symbol.png";
import StartButton from "@components/StartButton";
import Image from "next/image";
import { signIn } from "@lib/auth";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Image src={ai_symbol} alt="AI Symbol" width={100} height={100} priority className="m-5" />
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to ChatBot</h1>
      <p className="text-xl mb-8 text-center max-w-md">
        Your AI-powered assistant is ready to help. Ask anything!
      </p>
      <StartButton
        onSignIn={async () => {
          "use server";
          await signIn();
        }}
      />
    </div>
  );
}
