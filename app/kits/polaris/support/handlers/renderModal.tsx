import React from "react";
import ModalSupport from "./ModalSupportForm";
import {
  RequestFeatureContent,
  BookConsultationContent,
  GiveFeedBacks,
  SeeMoreApps,
} from "../content";

const ModalRenderer = ({ modalId, onClose }: { modalId: string | null; onClose: () => void }) => {
  let title = "";
  let content = null;

  switch (modalId) {
    case "request_feature":
      title = "Request Feature";
      content = <RequestFeatureContent />;
      break;

    case "book_consultation":
      title = "Book Consultation";
      content = <BookConsultationContent />;
      break;
    case "our_apps":
      title = "Our Apps";
      content = <SeeMoreApps />;
      break;
    case "rate_us":
      title = "Rate Us";
      content = <GiveFeedBacks onHide={onClose} />;
      break;

    default:
      return null;
  }

  return <ModalSupport onHide={onClose} title={title} content={content} />;
};

export default ModalRenderer;
