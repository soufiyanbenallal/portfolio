import type { ReactNode } from "react";

export type ModalSupportFormPropsType = {
  onHide: () => void;
  title: string;
  content: ReactNode;
};

export const ModalSupportForm = ({
  onHide,
  title,
  content,
}: ModalSupportFormPropsType): JSX.Element => {
  return (
    <s-modal id="support-service-modal" heading={title} onHide={onHide}>
      <div className="max-h-[80vh] max-w-2xl overflow-y-auto p-5">{content}</div>
    </s-modal>
  );
};

export default ModalSupportForm;
