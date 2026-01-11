import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "shared/lib/utils";
import { CartButton, Container, SearchInput } from ".";
import { Button } from "../ui";

type Props = {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
};

export const Header = ({ className, hasSearch = true, hasCart = true }: Props) => {
  return (
    <header className={cn("border-b", className)}>
      <Container className={"flex items-center justify-between py-8"}>
        <Link href={"/"}>
          <div className="flex items-center gap-4">
            <Image src={"/logo.png"} alt={"Logo"} width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Tasty Box</h1>
              <p className="text-sm text-gray-400 leading-3">Самая вкусная еда в мире</p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className={"mx-10 flex-1"}>
            <SearchInput />
          </div>
        )}
        <div className="flex items-center gap-3">
          <Button variant={"outline"} className={"flex items-center gap-1"}>
            <User size={16} />
            Войти
          </Button>
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
