
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // 1. Split content into blocks: code blocks and text blocks
  const blocks = content.split(/(```[\s\S]*?```)/g).filter(Boolean);

  const renderTextBlock = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-1 my-2 pl-2">
            {listItems.map((item, i) => (
              <li key={i}>{renderInline(item.substring(item.indexOf(' ') + 1))}</li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const renderInline = (text: string): React.ReactNode[] => {
        // Regex to split by bold and links, keeping the delimiters
        const parts = text.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g).filter(Boolean);
        return parts.map((part, i) => {
          // Handle bold text
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
          }
          // Handle markdown links
          if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
            const linkTextMatch = part.match(/\[(.*?)\]/);
            const urlMatch = part.match(/\((.*?)\)/);
            if (linkTextMatch && urlMatch) {
                const linkText = linkTextMatch[1];
                const url = urlMatch[1];
                return (
                    <a 
                        href={url} 
                        key={i} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-brand-red hover:underline"
                    >
                        {linkText}
                    </a>
                );
            }
          }
          return part;
        });
      };

    lines.forEach((line, index) => {
      if (line.startsWith('* ') || line.startsWith('- ')) {
        listItems.push(line);
      } else {
        flushList();
        if (line.startsWith('## ')) {
          elements.push(<h2 key={index} className="text-base font-semibold mt-3 mb-1">{renderInline(line.substring(3))}</h2>);
        } else if (line.trim() !== '') {
          elements.push(<p key={index} className="my-1">{renderInline(line)}</p>);
        } else if (index > 0 && lines[index-1]?.trim() !== '') {
          elements.push(<div key={index} className="h-2" />);
        }
      }
    });

    flushList(); // Flush any remaining list items at the end
    return elements;
  };

  return (
    <div className="text-sm">
      {blocks.map((block, index) => {
        if (block.startsWith('```') && block.endsWith('```')) {
          const code = block.slice(3, -3).trim();
          return (
            <pre key={index} className="bg-brand-charcoal text-white p-3 my-2 rounded-lg text-xs overflow-x-auto font-mono whitespace-pre-wrap">
              <code>{code}</code>
            </pre>
          );
        }
        return <div key={index}>{renderTextBlock(block)}</div>;
      })}
    </div>
  );
};

export default MarkdownRenderer;
