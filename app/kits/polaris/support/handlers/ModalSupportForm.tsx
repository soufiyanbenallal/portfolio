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
      <div className="p-5 max-w-2xl max-h-[80vh] overflow-y-auto">{content}</div>
    </s-modal>
  );
};

export default ModalSupportForm;
