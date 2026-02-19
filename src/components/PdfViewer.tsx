'use client';

interface PdfViewerProps {
  url: string;
}

export default function PdfViewer({ url }: PdfViewerProps) {
  return (
    <iframe
      src={url}
      className="flex-1 w-full border-0 min-h-0"
      title="PDF Viewer"
    />
  );
}
