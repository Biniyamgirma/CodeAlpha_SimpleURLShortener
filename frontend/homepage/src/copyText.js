import { useState } from 'react';
 const CopiableText = ({ text, Loading }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center mt-4">
    <div className='bg-[#090040] text-[#B13BFF] border-2 border-[#B13BFF] rounded-lg p-2 mt-2  '>
      <code className="flex-1 overflow-x-auto py-2 px-3 rounded text-[#FFCC00]">
        {Loading?"Loading...":text}
      </code>
      <button
        onClick={copyToClipboard}
        className="px-3 py-2 bg-[#255F38] text-white rounded hover:bg-[#1F7D53] transition-colors "
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
     
    </div>
   
    
  );
};

export default CopiableText;
// Usage
