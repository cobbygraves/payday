// import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { AiOutlineDelete } from 'react-icons/ai'

const ImageUpload = ({
  imgURL,
  imgFile,
  handleChange,
  deleteImgFile,
  imgH,
  imgW,
  isRounded
}) => {
  // const [imgURL, setImageURL] = useState('')
  // const [imgFile, setImageFile] = useState(null)

  // const handleChange = (e) => {
  //   setImageFile(e.target.files[0])
  //   setImageURL(URL.createObjectURL(e.target.files[0]))
  // }

  return (
    <div className='flex justify-center'>
      {imgFile ? (
        <div className='flex flex-col items-center w-full'>
          <img
            src={imgURL}
            className={`h-[${imgH}] w-[${imgW}] object-cover ${
              isRounded && 'rounded-[50%]'
            }`}
          />
          <AiOutlineDelete
            className='top-12 left-12 z-10 cursor-pointer'
            size={25}
            onClick={deleteImgFile}
          />
        </div>
      ) : (
        <label className='flex flex-col justify-center items-center gap-2 h-[125px] rounded-[50%] border-2 border-dashed border-gray-300 w-[125px] cursor-pointer'>
          <input
            type='file'
            hidden
            accept='image/png, image/gif, image/jpeg'
            onChange={handleChange}
          />
          Upload <PlusOutlined />
        </label>
      )}
    </div>
  )
}
export default ImageUpload
