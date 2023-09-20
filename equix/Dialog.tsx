import { useRouter } from "next/router";
import { FC, ReactNode, useCallback, useEffect } from "react";

interface Props {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  close: () => void;
  className?: string;
}

export const Dialog: FC<Props> = ({
  title,
  children,
  close,
  isOpen,
  className,
}) => {
  const router = useRouter();

  useEffect(() => {
    // @ts-ignore
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        window.history.pushState(null, "", router.asPath);
        close();
      }
    });
  }, [router, close, isOpen]);

  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  return isOpen ? (
    <div className="w-full h-full bg-black absolute top-0 left-0 bg-opacity-50 flex overflow-y-auto z-10">
      <dialog
        className={`bg-white p-4 flex flex-col gap-4 min-w-[320px] max-w-screen-md shadow-2xl sm:mt-0 overflow-y-auto ${
          className || ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex gap-4 justify-between items-center">
          <h2 className="font-semibold">{title}</h2>
          <button onClick={() => close()}>
            <i className="text-xl bi bi-x-lg"></i>
          </button>
        </header>
        {children}
      </dialog>
    </div>
  ) : null;
};
