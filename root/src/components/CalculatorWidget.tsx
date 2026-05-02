"use client";

/**
 * CalculatorWidget — Client-side dynamic tool loader
 * Dynamically imports the correct calculator component by tool ID.
 * Uses lazy loading so each tool only loads its own JS on demand.
 */

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy-load PeakToolsHub and render only the matching tool component
const PeakToolsHub = dynamic(() => import("./PeakToolsHub"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Loading calculator…</p>
      </div>
    </div>
  ),
});

interface Props {
  toolId: string;
}

export default function CalculatorWidget({ toolId }: Props) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500 text-sm">Loading calculator…</p>
      </div>
    }>
      {/* PeakToolsHub renders the full app; when embedded here, it will
          be initialised at the tool route matching toolId */}
      <PeakToolsHub initialToolId={toolId} embedded={true} />
    </Suspense>
  );
}
