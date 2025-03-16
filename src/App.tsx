import React, { useState, useEffect, useRef } from 'react';

export default function RichTextEditor() {
  const [text, setText] = useState<string>('');
  const [bold, setBold] = useState<boolean>(false);
  const [italic, setItalic] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#000000');
  const [fontSize, setFontSize] = useState<number>(16);
  const [previewText, setPreviewText] = useState<string>('');
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let formattedText = `<color=${color}>`;
    if (bold) {
      formattedText += '<b>';
    }
    if (italic) {
      formattedText += '<i>';
    }
    formattedText += text;
    if (italic) {
      formattedText += '</i>';
    }
    if (bold) {
      formattedText += '</b>';
    }
    formattedText += '</color>';
    setPreviewText(formattedText);

    if (previewRef.current) {
      previewRef.current.innerHTML = formattedText; // Safely inject HTML
    }


  }, [text, bold, italic, color]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleBoldChange = () => {
    setBold(!bold);
  };

  const handleItalicChange = () => {
    setItalic(!italic);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.target.value, 10));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(previewText);
    alert('Formatted text copied to clipboard!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Rich Text Editor</h1>

        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-700 text-sm font-bold mb-2">
            Text:
          </label>
          <textarea
            id="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={text}
            onChange={handleTextChange}
            rows={4}
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="bold" className="inline-flex items-center">
              <input
                type="checkbox"
                id="bold"
                className="form-checkbox h-5 w-5 text-indigo-600"
                checked={bold}
                onChange={handleBoldChange}
              />
              <span className="ml-2 text-gray-700">Bold</span>
            </label>
          </div>
          <div>
            <label htmlFor="italic" className="inline-flex items-center">
              <input
                type="checkbox"
                id="italic"
                className="form-checkbox h-5 w-5 text-indigo-600"
                checked={italic}
                onChange={handleItalicChange}
              />
              <span className="ml-2 text-gray-700">Italic</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="color" className="block text-gray-700 text-sm font-bold mb-2">
              Color:
            </label>
            <input
              type="color"
              id="color"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={color}
              onChange={handleColorChange}
            />
          </div>
          <div>
            <label htmlFor="fontSize" className="block text-gray-700 text-sm font-bold mb-2">
              Font Size:
            </label>
            <input
              type="number"
              id="fontSize"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={fontSize}
              onChange={handleFontSizeChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Preview:</label>
          <div
            ref={previewRef}
            style={{ fontSize: fontSize }}
            className="border rounded p-2"
          />

        </div>

        <div>
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleCopy}
          >
            Copy Formatted Text
          </button>
        </div>
      </div>
    </div>
  );
}