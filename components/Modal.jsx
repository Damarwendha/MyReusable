/* eslint-disable prefer-const */
"use client";

import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useOverflowHidden } from "@/hooks/useOverflowHidden";
import { X } from "lucide-react";
import { useKey } from "@/hooks/useKey";

const ANIMATION_CLOSE_DURATION_MS = 200;

const ModalContext = createContext<IValue>({} as IValue);

function Modal({ children, show, onClose, id }: IModal) {
  const [openId, setOpenId] = useState("");

  let containerRef: React.MutableRefObject<HTMLDivElement | null> | null = null;
  let contentRef: React.MutableRefObject<HTMLDivElement | null> | null = null;

  // To asssign ref from window to root modal
  function assignRef(
    contentRefNew: React.MutableRefObject<HTMLDivElement | null> | null,
    containerRefNew: React.MutableRefObject<HTMLDivElement | null> | null
  ) {
    containerRef = containerRefNew;
    contentRef = contentRefNew;
  }

  function open(id: string) {
    setOpenId(id);
  }

  function close() {
    if (containerRef && contentRef) {
      const container = containerRef.current;
      const content = contentRef.current;
      let timeoutId: ReturnType<typeof setTimeout>;

      // add animation first
      if (container) {
        container.style.opacity = "0";
        container.style.transition = `all ${ANIMATION_CLOSE_DURATION_MS}ms`;
      }

      if (content) {
        content.classList.add("animate-scale-out");
      }

      // then close the modal
      timeoutId = setTimeout(() => {
        setOpenId("");
        onClose?.();
      }, ANIMATION_CLOSE_DURATION_MS / 2); // Adjust timing to match animation close duration

      return () => clearTimeout(timeoutId);
    }
  }
  console.log("jalan");

  // for custom prop
  useEffect(() => {
    if (show !== undefined) {
      if (show && id) {
        open(id);
      } else if (!show && id) {
        close();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, show, openId]);

  return (
    <ModalContext.Provider value={{ open, close, openId, assignRef }}>
      {children}
    </ModalContext.Provider>
  );
}

// TRIGGER
function ToOpen({ children, id }: IToOpen) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(id),
  });
}

// window children props have access to the closeModal method.
// -- Children should be a component!
function Window({
  children,
  id,
  title,
  isConfirmModal,
  confirmDestructive,
  hideX,
  isNestedModal,
  shouldCloseModalWhenOutsideClick = true,
}: IWindow) {
  const [isClient, setIsClient] = useState(false);
  const { close, openId, assignRef } = useContext(ModalContext);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { refInside: contentRef } = useOutsideClick(
    shouldCloseModalWhenOutsideClick ? close : () => {}
  );

  const isIdEq = openId === id;

  // prevent body page scrolling when modal open
  useOverflowHidden(isIdEq, [openId, id], isNestedModal);

  useKey("Escape", close);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      assignRef(contentRef, containerRef);
    }
  }, [contentRef, containerRef, assignRef]);

  if (!isIdEq) return null;

  const content = (
    <div
      className="fixed top-0 overflow-y-auto overflow-x-hidden py-10 flex justify-center add-dark-mode left-0 z-50 w-full h-full items-start animate-fade animate-duration-[200ms] backdrop-blur-[2px] backdrop-brightness-50"
      ref={containerRef}
    >
      <div
        aria-labelledby="modal-title"
        aria-modal="true"
        className={`relative border modal rounded-md p-4 bg-card sm:max-w-[85vw] w-[85vw] sm:w-[30rem] pt-14 animate-scale-in h-max my-auto`}
        ref={contentRef}
        role="dialog"
        tabIndex={-1}
      >
        <div>
          {isConfirmModal && (
            <i className="absolute left-4 top-4">
              <svg
                fill="none"
                height="44"
                viewBox="0 0 64 64"
                width="44"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z"
                  fill={confirmDestructive ? "var(--destructive)" : "#3B82F6"}
                  opacity="0.2"
                />
                <path
                  d="M32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z"
                  stroke={confirmDestructive ? "var(--destructive)" : "#3B82F6"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="6"
                />
                <path
                  d="M30 30H32V44H34"
                  stroke={confirmDestructive ? "var(--destructive)" : "#3B82F6"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="6"
                />
                <path
                  d="M32 24C33.6569 24 35 22.6569 35 21C35 19.3431 33.6569 18 32 18C30.3431 18 29 19.3431 29 21C29 22.6569 30.3431 24 32 24Z"
                  fill={confirmDestructive ? "var(--destructive)" : "#3B82F6"}
                />
              </svg>
            </i>
          )}
          {title && (
            <h3
              className={`absolute font-medium text-foreground border-brand left-4 top-4 ${
                isConfirmModal
                  ? "border-b-0 font-semibold left-[4.5rem] top-6 text-lg"
                  : "text-lg border-b-2"
              }`}
              id="modal-title"
            >
              {title}
            </h3>
          )}
          {!isConfirmModal && !hideX && (
            <button
              className="absolute text-foreground right-4 top-4 hover:opacity-70"
              onClick={close}
              title="Close modal"
              type="button"
            >
              <X
                aria-label="close modal"
                focusable="false"
                role="img"
                size={25}
              />
            </button>
          )}
          {/* pass closeModal prop to children elem */}
          {/* Thats why you need children component so you can access closeModal */}
          <div>
            {cloneElement(children, {
              closeModal: close,
            })}
          </div>
        </div>
      </div>
    </div>
  );

  if (isClient) {
    return createPortal(content, document.body);
  }
}

Modal.ToOpen = ToOpen;
Modal.Window = Window;

export default Modal;

interface IValue {
  open: (id: string) => void;
  close: () => void;
  openId: string;
  assignRef: (
    contentRef: React.MutableRefObject<HTMLDivElement | null> | null,
    containerRef: React.MutableRefObject<HTMLDivElement | null> | null
  ) => void;
}

interface IWindow {
  children: React.ReactElement;
  id: string;
  type?: "fit" | "fullscreen";
  title?: string;
  isConfirmModal?: boolean;
  confirmDestructive?: boolean;
  isNestedModal?: boolean;
  shouldCloseModalWhenOutsideClick?: boolean;
  hideX?: boolean;
}

interface IToOpen {
  children: React.ReactElement;
  id: string;
}

interface IModal {
  children: React.ReactNode;
  show?: boolean;
  onClose?: () => void;
  id?: string; // needed if you use show prop
}
