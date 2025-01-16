

import React, { useState,useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const ViewPaste = () => {

  const {id}=useParams();

  const allPaste=useSelector((state)=>state.paste.pastes);

  const paste=allPaste.find((p) => p._id===id);

  console.log("paste ->",paste)
  return (
    <div>
        <div className='flex flex-row gap-7 justify-between'>
      <input
      className='p-1 border rounded-2xl mt-2 w-[67%] pl-5'
      type='text'
      placeholder='enter title  here'
      value={paste.title}
      disabled
      onChange={(e)=>setTitle(e.target.value)}
      />
      
      {/* <button
      onClick={createPaste}
      className='p-2 border rounded-2xl mt-2'
      >
        {
            pasteId ? "Upadate Paste":"Create My Paste"
        }
      </button> */}
    </div>

    <div>
        <textarea
        className='rounded-2xl mt-8 min-w-[500px] p-4 border'
        value={paste.content}
        placeholder='enter content here'
        disabled
        onChange={(e)=>{setValue(e.target.value)}}
        rows={20}
        />
    </div>
    </div>
  )
}

export default ViewPaste
