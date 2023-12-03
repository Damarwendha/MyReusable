"use client";

import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useOverflowHidden } from "@/hooks/useOverflowHidden";

import { HiXMark } from "react-icons/hi2";
import { Button } from "flowbite-react";

const ModalContext = createContext();

// all of them expect one children element

function Modal({ children }) {
  const [openId, setOpenId] = useState("");

  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);

  return (
    <ModalContext.Provider value={{ open, close, openId }}>
      {children}
    </ModalContext.Provider>
  );
}

function ToOpen({ children, id }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(id),
  });
}

const types = {
  fullscreen: "top-0 left-0 w-screen h-screen",
  fit: "-translate-x-1/2 -translate-y-1/2 w-fit h-fit top-1/2 left-1/2",
};

// window children props have access to the closeModal method.
function Window({ children, id, type = "fit" }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { close, openId } = useContext(ModalContext);

  const refInside = useOutsideClick(close);

  const isIdEq = openId === id;

  // prevent page scrolling when modal open
  useOverflowHidden(isIdEq, [openId, id]);

  if (!isIdEq) return null;

  const content = (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen backdrop-brightness-50">
      <div
        className={`relative p-4 bg-white pt-14 ${types[type]}`}
        ref={refInside}
      >
        <Button
          className="absolute right-0 top-2 hover:opacity-50"
          onClick={close}
        >
          <HiXMark color="black" size={25} />
        </Button>
        {/* pass closeModal prop to children elem */}
        <div>{cloneElement(children, { closeModal: close })}</div>
      </div>
    </div>
  );

  if (isClient) {
    return ReactDOM.createPortal(content, document.body);
  } else return null;
}

Modal.ToOpen = ToOpen;
Modal.Window = Window;

export default Modal;
