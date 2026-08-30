import React from "react";
import Link from "next/link";
import { ButtonUi } from "@/components/ui/button.ui";
import { Icons } from "@/components/ui/social-icons.ui";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center px-6 select-none sm:px-11">
      <div className="border-gray-30 card-shadow flex w-full max-w-[480px] flex-col items-center gap-6 rounded-[28px] border bg-white p-8 text-center sm:p-12">
        <span className="bg-gray-10 border-gray-30 rounded-full border px-3 py-1 font-mono text-xs font-semibold tracking-widest text-gray-50 uppercase">
          Error 404
        </span>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-medium tracking-tight text-black sm:text-4xl">
            Oops! Wrong turn.
          </h1>
          <p className="text-gray-60 text-sm leading-relaxed">
            The page you are looking for doesn&apos;t exist, has been removed, or the link has
            changed.
          </p>
        </div>

        <Link href="/">
          <ButtonUi variant="primary" size="md" leftIcon={<Icons.ArrowLeft className="h-4 w-4" />}>
            Return to Homepage
          </ButtonUi>
        </Link>
      </div>
    </div>
  );
}
