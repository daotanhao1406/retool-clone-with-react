export function parseMarkdown(content: string): string {
  if (!content) return "";
  
  // Simple markdown parser for demo purposes
  return content
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-semibold mb-4">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2">$1</h3>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
    .replace(/`(.*?)`/gim, '<code class="bg-neutral-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/^- (.*$)/gim, '<li class="mb-1">$1</li>')
    .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-neutral-300 pl-4 my-4 text-neutral-600 italic">$1</blockquote>')
    .replace(/\n\n/gim, '</p><p class="mb-4">')
    .replace(/\n/gim, '<br>')
    .replace(/^(?!<[h1-6|blockquote|li])/, '<p class="mb-4">')
    .replace(/$(?!<\/[h1-6|blockquote|li])/, '</p>')
    .replace(/<li>/gim, '<ul class="list-disc list-inside mb-4"><li>')
    .replace(/<\/li>/gim, '</li></ul>')
    .replace(/<\/ul><ul[^>]*>/gim, '');
}
