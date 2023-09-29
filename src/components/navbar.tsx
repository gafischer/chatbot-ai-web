import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center gap-6 border-b px-6 py-3">
      <Link href="/">
        <Image
          alt="logo"
          className="cursor-pointer"
          src="/images/logo.png"
          height={80}
          width={60}
        />
      </Link>
      <div>
        <Link href="/">
          <Button variant="ghost" className="font-semibold">
            Uplaod
          </Button>
        </Link>
        <Link href="/chat">
          <Button variant="ghost" className="font-semibold">
            Chat
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
