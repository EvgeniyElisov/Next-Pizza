import { Category } from "@prisma/client";
import { cn } from "shared/lib/utils";
import { Categories, Container } from ".";

type Props = {
  className?: string;
  categories: Category[];
};

export const TopBar = ({ className, categories }: Props) => {
  return (
    <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
      </Container>
    </div>
  );
};
