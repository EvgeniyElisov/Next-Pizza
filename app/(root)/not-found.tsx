import { MessageBlock } from "shared/components/shared";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <MessageBlock
        title="Страница не найдена"
        text="Проверьте корректность введённого адреса или повторите попытку позже"
        imageSrc="/assets/images/not-found.png"
      />
    </div>
  );
}
