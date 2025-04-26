"use client";

import dynamic from "next/dynamic";
import { ExtendedRecordMap } from "notion-types";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism.css";

const NotionRenderer = dynamic(
  () => import("react-notion-x").then((m) => m.NotionRenderer),
  { ssr: false }
);

export default function NotionRendererWrapper({
  recordMap,
}: {
  recordMap: ExtendedRecordMap;
}) {
  return (
    <div className="notion-page prose prose-lg max-w-none">
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
      />
    </div>
  );
}
