import { Button } from "@/components/ui/button";
import TextComponent from "./TextComponent";
import ImageComponent from "./ImageComponent";
import { Smartphone, Monitor } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import type { LayoutComponent, PreviewMode } from "@/types/builder";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  components: LayoutComponent[];
  previewMode: PreviewMode;
  onPreviewModeChange: (mode: PreviewMode) => void;
}

export default function PreviewModal({
  isOpen,
  onClose,
  components,
  previewMode,
  onPreviewModeChange,
}: PreviewModalProps) {
  const renderComponent = (component: LayoutComponent) => {
    let content;
    switch (component.type) {
      case "text":
        content = <TextComponent data={component.data} isPreview={true} />;
        break;
      case "image":
        content = <ImageComponent data={component.data} isPreview={true} />;
        break;
      default:
        content = (
          <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-4 text-center text-neutral-500">
            Unknown component
          </div>
        );
    }

    if (previewMode === "desktop") {
      const widthClass = component.isFullWidth ? "col-span-2" : "col-span-1";
      return (
        <div key={component.id} className={`${widthClass} mb-4`}>
          {content}
        </div>
      );
    } else {
      return (
        <div key={component.id} className="w-full mb-4">
          {content}
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <DialogTitle className="text-lg font-medium">
              Preview Mode
            </DialogTitle>
            <div className="flex bg-neutral-100 rounded-lg p-1">
              <Button
                variant={previewMode === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => onPreviewModeChange("desktop")}
                className="px-3 py-1 text-sm"
              >
                <Monitor className="w-4 h-4 mr-1" />
                Desktop
              </Button>
              <Button
                variant={previewMode === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => onPreviewModeChange("mobile")}
                className="px-3 py-1 text-sm"
              >
                <Smartphone className="w-4 h-4 mr-1" />
                Mobile
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-auto px-6 py-4 bg-neutral-100 max-h-[650px]">
          <div
            className={`${
              previewMode === "desktop" ? "max-w-6xl" : "max-w-sm"
            }  mx-auto bg-white rounded-lg shadow-sm min-h-96 p-6`}
          >
            {components.length === 0 ? (
              <div className="text-center text-neutral-500 py-12">
                <p className="text-lg font-medium mb-2">
                  No components to preview
                </p>
                <p className="text-sm">
                  Add some components to see the preview
                </p>
              </div>
            ) : (
              <div
                className={previewMode === "desktop" ? "grid grid-cols-2" : ""}
              >
                {components.map(renderComponent)}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
