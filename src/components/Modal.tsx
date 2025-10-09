// // src/components/Modal.tsx
'use client'

import { useRouter } from "next/navigation";
import { MouseEventHandler, useRef } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const close: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === overlay.current) {
      router.back();
    }
  };

  return (
    <div
      ref={overlay}
      onClick={close}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
    >
      <div className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] shadow-xl animate-scaleIn overflow-y-auto max-h-[90vh]">
        {children}
      </div>
    </div>
  );
}
