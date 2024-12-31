import Image from "next/image";

interface UserIconProps {
  className?: string;
  avatarUrl?: string | null | undefined;
}

const UserIcon: React.FC<UserIconProps> = ({ className = "h-6 w-6 text-gray-600", avatarUrl }) => {
  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt="User avatar"
        width={100}
        height={100}
        className="rounded-full object-cover"
      />
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
};

export default UserIcon;
