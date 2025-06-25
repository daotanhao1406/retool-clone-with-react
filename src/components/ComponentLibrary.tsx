import { Draggable, Droppable } from "react-beautiful-dnd";
import { FileText, Image, Component } from "lucide-react";

const componentItems = [
  {
    type: "text",
    icon: FileText,
    title: "Text",
    description: "Markdown text content",
    color: "blue",
  },
  {
    type: "image",
    icon: Image,
    title: "Image",
    description: "Upload or URL image",
    color: "green",
  },
];

export default function ComponentLibrary() {
  return (
    <div className="w-80 bg-white border-r border-neutral-200 flex flex-col">
      {/* <div className="p-4 border-b border-neutral-100  mb-4">
        <h2 className="text-lg font-medium text-neutral-800">Components</h2>
      </div> */}
      <div className="px-4 py-3.5 border-b flex items-center space-x-2">
        <Component className="w-5 h-5" />
        <h2 className="text-lg font-medium text-neutral-800">Components</h2>
      </div>
      <div className="px-4 pt-6">
        <Droppable droppableId="component-library" isDropDisabled={true}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-3"
            >
              {componentItems.map((item, index) => (
                <Draggable
                  key={item.type}
                  draggableId={item.type}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`component-item hover:-translate-y-0.5 bg-neutral-50 border border-neutral-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-all duration-200 ${
                        snapshot.isDragging
                          ? "shadow-lg scale-105"
                          : "hover:shadow-md hover:-translate-y-1"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 bg-${item.color}-100 rounded flex items-center justify-center`}
                        >
                          <item.icon
                            className={`w-6 h-6 text-${item.color}-600`}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-neutral-800">
                            {item.title}
                          </h3>
                          <p className="text-sm text-neutral-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}
