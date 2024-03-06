import * as React from "react";

import { confirmable, ConfirmDialogProps } from "react-confirm";
import Modal from "./modal";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { createConfirmation } from "react-confirm";

// usage: if(await confirm("Are you sure?", options)){
//          alert("user confirmed")
//          } else {
//            alert("user canceled")
//           }

const defaultConfirmation = createConfirmation(Confirmation);

export function confirm(confirmation: string, options: Props = {}) {
  return defaultConfirmation({ confirmation, ...options });
}

const Confirmation: React.FC<ConfirmDialogProps<Props, boolean>> = (props) => (
  <Modal id="confirm" onClose={() => props.proceed(false)} show={props.show}>
    <Modal.Window
      confirmDestructive={props.isDestructive}
      id="confirm"
      isConfirmModal
      isNestedModal={props.isNestedModal}
      title={props.title || "Title"}
    >
      <ConfirmationModal
        cancelBtnClassName={props.cancelBtnClassName}
        cancelLabel={props.cancelLabel || "Cancel"}
        confirmBtnClassName={props.confirmBtnClassName}
        confirmLabel={props.confirmLabel || "Confirm"}
        isDestructive={props.isDestructive}
        onCancel={() => props.proceed(false)}
        onConfirm={() => props.proceed(true)}
        text={props.confirmation || "Are you sure?"}
      />
    </Modal.Window>
  </Modal>
);

export default confirmable(Confirmation);

function ConfirmationModal({
  cancelLabel,
  confirmLabel,
  text,
  onCancel,
  onConfirm,
  cancelBtnClassName,
  confirmBtnClassName,
  isDestructive,
}: IConfirmationModalProps) {
  return (
    <div className="text-foreground">
      <p className="mt-6 mb-4 text-sm text-left">{text}</p>
      <div className="flex justify-end w-full gap-2">
        <Button
          className={cn(
            "hover:bg-border text-foreground hover:opacity-70",
            cancelBtnClassName
          )}
          onClick={onCancel}
          variant="ghost"
        >
          {cancelLabel}
        </Button>
        <Button
          autoFocus
          className={cn(
            isDestructive
              ? "bg-destructive text-white hover:ring-red-600/20 focus:ring-4 focus:ring-red-600/20"
              : "focus:ring-4 focus:ring-blue-600/40",
            confirmBtnClassName
          )}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
}

interface IConfirmationModalProps {
  cancelLabel: string;
  confirmLabel: string;
  text: string;
  onCancel: () => void;
  onConfirm: () => void;
  cancelBtnClassName?: string;
  isDestructive?: boolean;
  confirmBtnClassName?: string;
}

interface Props {
  confirmLabel?: string;
  cancelLabel?: string;
  title?: string;
  confirmation?: string;
  cancelBtnClassName?: string;
  confirmBtnClassName?: string;
  isDestructive?: boolean;
  isNestedModal?: boolean;
}
