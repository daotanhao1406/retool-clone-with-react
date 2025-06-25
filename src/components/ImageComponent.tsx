interface ImageComponentProps {
  data: {
    src: string;
    alt: string;
    inputType?: "url" | "upload";
  };
  isPreview?: boolean;
}

export default function ImageComponent({
  data,
  isPreview = false,
}: ImageComponentProps) {
  return (
    <div
      className={`${!isPreview && "border border-neutral-200"} rounded-lg p-4`}
    >
      <img
        src={data.src}
        alt={data.alt}
        className="w-full h-auto "
        onError={(e) => {
          e.currentTarget.src =
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNzUgNzVMMjI1IDEyNUwxNzUgMTc1SDE1MEwxMzAgMTU1TDEyMCAxNjVMMTEwIDE1NUwxMDAuNSAxNjQuNUw5MCAxNTRMOTAgNzVIMTc1WiIgZmlsbD0iI0Q5RDlEOSIvPgo8Y2lyY2xlIGN4PSIxNDAiIGN5PSIxMDAiIHI9IjEwIiBmaWxsPSIjRDlEOUQ5Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTA1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM4QzhDOEMiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPHN2Zz4K";
        }}
      />
    </div>
  );
}
