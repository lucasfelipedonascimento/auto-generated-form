import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export function LinkTo({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      className="bg-green-600 hover:bg-green-700 text-white font-semibold p-2 flex items-center gap-2 justify-center mx-auto rounded-md"
    >
      {title}
      <FaArrowRight />
    </Link>
  );
}
