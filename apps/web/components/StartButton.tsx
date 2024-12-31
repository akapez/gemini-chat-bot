"use client";

interface StartButtonProps {
  onSignIn: () => Promise<void>;
}

const StartButton: React.FC<StartButtonProps> = ({ onSignIn }) => {
  return (
    <button
      onClick={onSignIn}
      className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      Start Chatting
    </button>
  );
};

export default StartButton;
