import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export function LinkReturn({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      className="bg-zinc-500 flex items-center gap-2 hover:bg-zinc-600 p-2 rounded-md text-white font-semibold"
    >
      <FaArrowLeft />
      {title}
    </Link>
  );
}
