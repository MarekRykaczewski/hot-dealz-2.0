"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string | null;
}

const Preview = ({ value }: PreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  if (value) {
    return <ReactQuill theme="bubble" value={value} readOnly />;
  } else {
    return (
      <p className="text-gray-500 text-center font-bold">
        No description provided
      </p>
    );
  }
};

export default Preview;
