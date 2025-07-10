import React ,{useState} from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CopiableText from './copyText.js'; 

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleShortenURL = async () => {
    try{
      setIsLoading(true);
const response = await fetch('http://localhost:3030/shorten',{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body: JSON.stringify({originalUrl: url})
});
      if(!response.ok){
        throw new Error('Network response have an error');
      }else{
        const data = await response.json();
        setShortUrl(data.shortURL);
      }
    }catch(error){

    }finally{
      setIsLoading(false);
    }
  };
  const handleButtonClick = () => {
    handleShortenURL();
  };


  return (
    <>
    <div class=" bg-gradient-to-r from-[#090040] to-[#471396] h-screen flex items-center justify-center">
      
      <div>
        <h1 className='bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-5xl font-extrabold text-transparent'>URL Shortener</h1>
    <p className='text-[#B13BFF]'>Enter a URL to shorten it</p>
    <div className='flex flex-row '>
       <TextareaAutosize
      aria-label="minimum height"
      minRows={3}
      placeholder="insert your URL here"
      style={{ width: 200 }}
      className='bg-[#090040] text-[#B13BFF] border-2 border-[#B13BFF] rounded-lg p-2 mt-2  '
      onChange={(e) => setUrl(e.target.value)}
      value={url}
    />
      <button onClick={handleButtonClick} className='bg-[#B13BFF] text-white rounded-lg p-2 mt-2 ml-2 hover:bg-[#471396] transition duration-300 ease-in-out'>Shorten</button>

    </div>
       <CopiableText text={shortUrl} Loading={isLoading}  />
      </div>
    
    </div>
   
    
    </>
    
  );
}

export default App;
