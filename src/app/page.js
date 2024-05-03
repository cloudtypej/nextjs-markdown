'use client';

import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Home() {
  const [markdown, setMarkdown] = useState(`
  # Hello, Cloudtype!

  \`\`\`javascript
  function sum(a, b) {
    return a + b;
  }
  \`\`\`
  `);

  const contentRef = useRef(null);

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <div className="flex h-screen font-sans">
      <div className="flex-1 p-6">
        <textarea
          value={markdown}
          onChange={handleChange}
          className="w-full h-full resize-none border-2 border-gray-300 rounded-lg p-4 text-lg leading-normal focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex-1 p-6 overflow-auto border-l border-gray-300">
        <div ref={contentRef} className='markdown'>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={materialLight}
                    language={match[1]}
                    PreTag="div"
                    children={String(children).replace(/\n$/, '')}
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
