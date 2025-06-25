import { Droppable, Draggable } from "react-beautiful-dnd";
import TextComponent from "./TextComponent";
import ImageComponent from "./ImageComponent";
import { Button } from "@/components/ui/button";
import { Minimize2, Maximize2, Trash, CloudUpload } from "lucide-react";
import type { LayoutComponent } from "@/types/builder";

interface MainCanvasProps {
  components: LayoutComponent[];
  selectedComponentId?: string;
  onToggleWidth: (componentId: string) => void;
  onSelectComponent: (component: LayoutComponent) => void;
  onDeleteComponent: (componentId: string) => void;
  onClearAll: () => void;
}

export default function MainCanvas({
  components,
  selectedComponentId,
  onToggleWidth,
  onSelectComponent,
  onDeleteComponent,
  onClearAll,
}: MainCanvasProps) {
  const renderComponent = (component: LayoutComponent, isPreview = false) => {
    switch (component.type) {
      case "text":
        return <TextComponent data={component.data} isPreview={isPreview} />;
      case "image":
        return <ImageComponent data={component.data} isPreview={isPreview} />;
      default:
        return (
          <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-4 text-center text-neutral-500">
            Unknown component
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white border-b border-neutral-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-neutral-500">
            {components.length} component{components.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={components.length === 0}
            onClick={onClearAll}
            className="text-red-600 hover:text-red-600 hover:bg-red-100"
          >
            Clear All
          </Button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <Droppable droppableId="canvas">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`drop-zone bg-white rounded-lg border-2 border-dashed border-neutral-300 p-8 min-h-full ${
                components.length === 0 && "flex items-center justify-center"
              } transition-all duration-200 ${
                snapshot.isDraggingOver ? "border-primary bg-blue-50" : ""
              }`}
            >
              {components.length === 0 ? (
                <div className="text-center text-neutral-500">
                  <CloudUpload className="w-10 h-10 mb-1 mx-auto text-neutral-400" />
                  <p className="text-lg font-medium mb-2">
                    Drop components here
                  </p>
                  <p className="text-sm">
                    Drag components from the sidebar to start building your
                    layout
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {components.map((component, index) => (
                    <Draggable
                      key={component.id}
                      draggableId={component.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`layout-component group relative transition-all duration-200 cursor-pointer ${
                            component.isFullWidth
                              ? "w-full"
                              : "w-[calc(50%-0.5rem)]"
                          } ${
                            snapshot.isDragging ? "opacity-75 scale-105" : ""
                          } ${
                            selectedComponentId === component.id
                              ? "ring-2 ring-primary rounded-lg"
                              : ""
                          }`}
                          onClick={() => onSelectComponent(component)}
                        >
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-grab active:cursor-grabbing"
                          >
                            {renderComponent(component)}
                          </div>

                          <div className="component-controls absolute top-2 right-2 flex bg-white rounded shadow-sm border border-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleWidth(component.id);
                              }}
                              className="p-1 h-auto"
                              title="Toggle width"
                            >
                              {component.isFullWidth ? (
                                <Minimize2 />
                              ) : (
                                <Maximize2 />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteComponent(component.id);
                              }}
                              className="p-1 h-auto rounded-sm text-red-600 hover:text-red-600 hover:bg-red-100"
                              title="Delete"
                            >
                              <Trash />
                            </Button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}
