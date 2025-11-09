'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function HomePage() {
  const [markdown, setMarkdown] = useState<string>('');

  const handleMarkdownChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 border-r border-gray-700">
        <h2 className="text-xl font-bold mb-2">Markdown Input</h2>
        <textarea
          className="w-full h-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={markdown}
          onChange={handleMarkdownChange}
          placeholder="Enter your Markdown here..."
        />
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-bold mb-2">HTML Preview</h2>
        <div className="prose max-w-none w-full h-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white overflow-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
