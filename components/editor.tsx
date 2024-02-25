"use client";

import dynamic from "next/dynamic";
import { forwardRef, useMemo } from "react";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

export const Editor = forwardRef<HTMLDivElement, EditorProps>(
  ({ onChange, value }: EditorProps, ref) => {
    const ReactQuill = useMemo(
      () => dynamic(() => import("react-quill"), { ssr: false }),
      []
    );

    return (
      <div className="bg-white" ref={ref}>
        <ReactQuill theme="snow" value={value} onChange={onChange} />
      </div>
    );
  }
);

Editor.displayName = "Editor";
