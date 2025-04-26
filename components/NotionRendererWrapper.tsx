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
    <div>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
        components={{
          nextImage: null,
          image: ({ block }) => {
            const source = block?.format?.display_source;
            const alt = block?.properties?.caption?.[0]?.[0] ?? "";

            if (!source) return null;

            return (
              <div className="my-6 flex justify-center">
                <img
                  src={source}
                  alt={alt}
                  className="rounded-xl shadow-md max-w-full h-auto"
                />
              </div>
            );
          },
        }}
      />
    </div>
  );
}
