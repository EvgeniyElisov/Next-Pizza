import { MessageBlock } from "shared/components/shared";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <MessageBlock
        title="Доступ запрещён"
        text="Данную страницу могут просматривать только авторизованные пользователи"
        imageSrc="/assets/images/lock.png"
      />
    </div>
  );
}
