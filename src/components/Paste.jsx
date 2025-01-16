import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className='relative mt-10 '>
      <input
        className="p-2 rounded-sm border min-w-[600px] mt-5 w-full pl-5"
        type="search"
        placeholder="search here...."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 my-4 border">
        <div
        className='flex w-full py-3 place-items-center pl-5 border text-4xl font-bold'
        >
          All Pastes
        </div>
        {filterData.length > 0 &&
          filterData.map((paste) => (
            <div className="border m-3 flex justify-between p-2" key={paste._id}>
              <div className='flex flex-col  justify-center gap-3'>
              <div className='text-3xl font-bold self-start'>{paste.title}</div>
              <div className='self-start'>{paste.content}</div>
              </div>


                  <div className='flex flex-col space-y-3 justify-center'>
              <div className="flex flex-row gap-3 place-content-evenly ">
                <button className='border-sky-400'>
                  <a href={`/?pasteId=${paste?._id}`}>
                  Edit</a>
                  </button>
                <button className='border-sky-400'>
                 <a href={`/pastes/${paste?._id}`}>View</a>
                  </button>
                <button onClick={() => handleDelete(paste._id)} className='border-sky-400'>Delete</button>
                <button
                className='border-sky-400'
                onClick={() => {navigator.clipboard.writeText(paste?.content)
                  toast.success("copied to clipboard")

                }
              }

                >Copy</button>
                {/* home work */}
                <button
                className='border-sky-400'
                
                onClick={() => {
                  const shareableLink = `${window.location.origin}/paste/${paste._id}`;
                  if (navigator.share) {
                    navigator.share({
                      title: paste.title,
                      text: paste.content,
                      url: shareableLink,
                    })
                      .then(() => toast.success("Shared successfully!"))
                      
                  } 
                }}

                >Share</button>
              </div>

              <div>{paste.createAt}</div>
            </div>

            </div>


          ))}
      </div>
    </div>
  );
};

export default Paste;
