import React, { useState,useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';



const Home = () => {
    const [title,setTitle]=useState('');
    const [value,setValue]=useState('');

    const [searchParams,setSearchParams]=useSearchParams();

    const pasteId=searchParams.get("pasteId")

    const dispatch =useDispatch();

    const allPaste=useSelector((state)=>state.paste.pastes);

    useEffect(() => {
      
      if(pasteId){
        const paste=allPaste.find((p)=>p._id===pasteId);
        setTitle(paste.title);
        setValue(paste.content);
      }

    }, [pasteId])
    

    function createPaste(){
        const paste={
            title:title,
            content:value,
            _id:pasteId || Date.now().toString(36),
            createAt:new Date().toISOString(),
        }

        if(pasteId){
            // upadate
            dispatch(updateToPastes(paste))
        }else{
            //create
            dispatch(addToPastes(paste))
        }

        // after creation or updation
        setTitle('');
        setValue('');
        setSearchParams({}); 
    }

    
  return (
    
    <div className='relative my-20 w-full'>
        <div className='flex flex-row  justify-between  min-w-[500px] w-[80%] mx-auto'>
      <input
      className='border-2 focus:outline-none  rounded-2xl mt-2 w-[85%] pl-5 h-[40px] focus:border-blue-600'
      type='text'
      placeholder='enter title  here'
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />
      
      <button
      onClick={createPaste}
      className=' p-1 h-[40px]  border rounded-lg border-none mt-2 bg-blue-700 text-white border-black '
      >
        {
            pasteId ? "Upadate Paste":"Create My Paste"
        }
      </button>
    </div>

    <div className='w-full relative  mx-auto'>
      <div
      className='w-[80%] relative mx-auto border h-[25px] mt-4 pl-5 flex justify-between'>
        <div className='flex gap-1 items-center h-full'>
        <div className='w-[10px] h-[10px] bg-red-500 rounded-full'></div>
        <div 
        className='w-[10px] h-[10px] bg-yellow-300 rounded-full'></div>
        <div 
        className='w-[10px] h-[10px] bg-green-500 rounded-full'></div>
        </div>
        
        <button
  className="pr-5 flex items-center cursor-pointer border-none"
  onClick={() => {
    navigator.clipboard.writeText(value);
    toast.success("copied to clipboard");
  }}
>
  <img
    src="../src/images/copy.png"
    alt=""
    className="w-[20px] h-[20px] bg-cover"
  />
</button>

        

      </div>
        <textarea
        
        className='  min-w-[500px] w-[80%] p-4 border'
        value={value}
        placeholder='enter content here'
        onChange={(e)=>{setValue(e.target.value)}}
        rows={20}
        />
    </div>
    </div>
  )
}

export default Home;

