import React, { useState } from 'react';

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [inputText, setInputText] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleGenerate = () => {
    setGeneratedText("Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.");
  };

  const handleInsert = () => {
    const textarea = document.activeElement as HTMLTextAreaElement;
    if (textarea?.tagName === 'TEXTAREA') {
      textarea.value += generatedText;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          placeholder="Type a command"
        />
        <div className="flex justify-end">
          <button onClick={handleGenerate} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Generate</button>
          <button onClick={handleInsert} className="bg-green-500 text-white px-4 py-2 rounded">Insert</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
