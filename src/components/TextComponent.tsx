import { parseMarkdown } from "@/lib/markdown";

interface TextComponentProps {
  data: {
    content: string;
  };
  isPreview?: boolean;
}

export default function TextComponent({ data, isPreview = false }: TextComponentProps) {
  return (
    <div className={`${!isPreview && 'border border-neutral-200'} rounded-lg p-4`}>
      <div 
        className="markdown-preview"
        dangerouslySetInnerHTML={{ __html: parseMarkdown(data.content) }}
      />
    </div>
  );
}
