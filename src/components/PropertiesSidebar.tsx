import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Settings } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import type { LayoutComponent } from "@/types/builder";

interface PropertiesSidebarProps {
  selectedComponent: LayoutComponent | null;
  onUpdateComponent: (componentId: string, data: any) => void;
  onDeselectComponent: () => void;
}

export default function PropertiesSidebar({
  selectedComponent,
  onUpdateComponent,
  onDeselectComponent,
}: PropertiesSidebarProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [activeTab, setActiveTab] = useState<string>("url");

  useEffect(() => {
    if (selectedComponent) {
      setFormData(selectedComponent.data);
      if (selectedComponent.type === "image") {
        setActiveTab(selectedComponent.data.inputType || "url");
      }
    } else {
      setFormData({});
    }
  }, [selectedComponent]);

  useEffect(() => {
    if (!selectedComponent || Object.keys(formData).length === 0) return;

    const timer = setTimeout(() => {
      const hasChanged =
        JSON.stringify(formData) !== JSON.stringify(selectedComponent.data);
      if (hasChanged) {
        onUpdateComponent(selectedComponent.id, formData);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData, selectedComponent, onUpdateComponent]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          src: e.target?.result as string,
          inputType: "upload",
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!selectedComponent) {
    return (
      <div className="w-80 bg-white border-l border-neutral-200 flex flex-col">
        <div className="px-4 py-3.5 border-b">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <h2 className="text-lg font-medium text-neutral-800">Properties</h2>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center text-center p-6">
          <div>
            <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="text-neutral-600" />
            </div>
            <p className="text-neutral-500 mb-2">No component selected</p>
            <p className="text-sm text-neutral-400">
              Click on a component to edit its properties
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-l border-neutral-200 flex flex-col">
      <div className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <h2 className="text-lg font-medium text-neutral-800 capitalize">
              {selectedComponent.type} Properties
            </h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onDeselectComponent}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-6 overflow-auto">
        {selectedComponent.type === "text" && (
          <>
            <div>
              <Label htmlFor="textContent" className="text-sm font-medium">
                Content (Markdown)
              </Label>
              <Textarea
                id="textContent"
                value={formData.content || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                className="mt-2 h-64 resize-none"
                placeholder="Enter markdown content..."
              />
            </div>
          </>
        )}

        {selectedComponent.type === "image" && (
          <>
            <div>
              <div className="flex items-center justify-between">
                <Tabs
                  defaultValue={activeTab}
                  onValueChange={(e) => setActiveTab(e)}
                  className="flex w-full flex-1"
                >
                  <div className="flex items-center justify-between flex-1">
                    <Label className="text-sm font-medium">Image Source</Label>
                    <TabsList>
                      <TabsTrigger value="url">URL</TabsTrigger>
                      <TabsTrigger value="upload">Upload</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="url" className="w-full flex-1">
                    <Input
                      type="url"
                      className="w-full"
                      value={formData.src || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          src: e.target.value,
                          inputType: "url",
                        }))
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                  </TabsContent>
                  <TabsContent value="upload" className="w-full flex-1">
                    <Input
                      type="file"
                      className="w-full"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div>
              <Label htmlFor="imageAlt" className="text-sm font-medium">
                Alt Text
              </Label>
              <Input
                id="imageAlt"
                value={formData.alt || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, alt: e.target.value }))
                }
                placeholder="Describe the image..."
                className="mt-2"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
