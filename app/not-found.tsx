import React from "react";
import Link from "next/link";
import { ButtonUi } from "@/components/ui/button.ui";
import { Icons } from "@/components/ui/social-icons.ui";

export default function NotFound() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center px-6 sm:px-11 select-none">
      <div className="max-w-[480px] w-full text-center flex flex-col items-center gap-6 p-8 sm:p-12 rounded-[28px] bg-white border border-gray-30 card-shadow">
        <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-gray-10 border border-gray-30 text-gray-50 uppercase tracking-widest">
          Error 404
        </span>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-black">
            Oops! Wrong turn.
          </h1>
          <p className="text-sm text-gray-60 leading-relaxed">
            The page you are looking for doesn&apos;t exist, has been removed, or the link has changed.
          </p>
        </div>

        <Link href="/">
          <ButtonUi
            variant="primary"
            size="md"
            leftIcon={<Icons.ArrowLeft className="w-4 h-4" />}
          >
            Return to Homepage
          </ButtonUi>
        </Link>
      </div>
    </div>
  );
}
