"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, HelpCircle } from "lucide-react";
import { cn } from "@lib/utils";
import UserIcon from "./UserIcon";
import { useSession } from "next-auth/react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
];

interface LeftNavigationProps {
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
}

const LeftNavigation: React.FC<LeftNavigationProps> = ({ onSignIn, onSignOut }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const truncateString = (str: string | null | undefined, maxLength = 50) => {
    if (str) return str.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
    else return "unknown";
  };

  return (
    <>
      <nav
        className={
          "fixed left-0 top-0 bottom-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0"
        }
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">ChatBot v0</h1>
          </div>
          <ul className="flex-grow py-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100",
                    pathname === item.href && "bg-gray-100 font-semibold"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="p-4 border-t">
            {status === "authenticated" ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-gray-600" avatarUrl={session?.user?.image} />
                  </div>
                  <p className="text-sm font-medium">{truncateString(session?.user?.name, 10)}</p>
                </div>
                <button
                  onClick={onSignOut}
                  className="p-1 text-xs border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  aria-label="Sign out"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onSignIn}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default LeftNavigation;
