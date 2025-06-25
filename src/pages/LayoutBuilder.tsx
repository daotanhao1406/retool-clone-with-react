import { useState } from "react";
import { DragDropContext, type DropResult } from "react-beautiful-dnd";
import ComponentLibrary from "@/components/ComponentLibrary";
import MainCanvas from "@/components/MainCanvas";
import PreviewModal from "@/components/PreviewModal";
import PropertiesSidebar from "@/components/PropertiesSidebar";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type {
  ComponentType,
  LayoutComponent,
  PreviewMode,
} from "@/types/builder";

export default function LayoutBuilder() {
  const [components, setComponents] = useState<LayoutComponent[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const [selectedComponent, setSelectedComponent] =
    useState<LayoutComponent | null>(null);

  const getDefaultComponentData = (type: ComponentType) => {
    switch (type) {
      case "text":
        return {
          content:
            "# Welcome\n\nThis is a **markdown** text component. You can:\n\n- Use *italic* and **bold** text\n- Create lists\n- Add `inline code`\n\n> And even blockquotes!",
        };
      case "image":
        return {
          src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
          alt: "Sample image",
          inputType: "url",
        };
      default:
        return {};
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (
      source.droppableId === "component-library" &&
      destination.droppableId === "canvas"
    ) {
      const componentType = draggableId as ComponentType;
      const newComponent: LayoutComponent = {
        id: Date.now().toString(),
        type: componentType,
        isFullWidth: true,
        data: getDefaultComponentData(componentType),
      };

      const newComponents = Array.from(components);
      newComponents.splice(destination.index, 0, newComponent);
      setComponents(newComponents);

      setSelectedComponent(newComponent);
      return;
    }

    if (
      source.droppableId === "canvas" &&
      destination.droppableId === "canvas"
    ) {
      const newComponents = Array.from(components);
      const [reorderedItem] = newComponents.splice(source.index, 1);
      newComponents.splice(destination.index, 0, reorderedItem);
      setComponents(newComponents);
    }
  };

  const toggleComponentWidth = (componentId: string) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === componentId
          ? { ...comp, isFullWidth: !comp.isFullWidth }
          : comp
      )
    );
  };

  const deleteComponent = (componentId: string) => {
    setComponents((prev) => prev.filter((comp) => comp.id !== componentId));

    if (selectedComponent && selectedComponent.id === componentId) {
      setSelectedComponent(null);
    }
  };

  const updateComponent = (componentId: string, data: any) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === componentId ? { ...comp, data: { ...data } } : comp
      )
    );
  };

  const clearAllComponents = () => {
    if (
      components.length > 0 &&
      confirm("Are you sure you want to clear all components?")
    ) {
      setComponents([]);
      setSelectedComponent(null);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="h-screen flex flex-col bg-neutral-50">
        <header className="bg-white border-b border-neutral-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/retool_logo.svg" alt="Logo" />
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setIsPreviewOpen(true)}>
              <Eye />
              Preview
            </Button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <ComponentLibrary />
          <MainCanvas
            components={components}
            selectedComponentId={selectedComponent?.id}
            onToggleWidth={toggleComponentWidth}
            onSelectComponent={(component) => setSelectedComponent(component)}
            onDeleteComponent={deleteComponent}
            onClearAll={clearAllComponents}
          />
          <PropertiesSidebar
            selectedComponent={selectedComponent}
            onUpdateComponent={updateComponent}
            onDeselectComponent={() => setSelectedComponent(null)}
          />
        </div>

        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          components={components}
          previewMode={previewMode}
          onPreviewModeChange={setPreviewMode}
        />
      </div>
    </DragDropContext>
  );
}
