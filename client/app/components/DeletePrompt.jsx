export default function DeletePrompt({ handleNo, handleYes }) {
  return (
    <div className='h-32 w-[50%] p-10 shadow-lg shadow-black rounded bg-[#323232] absolute left-[25%] top-[27%] z-10'>
      <p className='text-center font-bold mb-5 text-white'>Are you sure ?</p>

      <div className='flex justify-center items-center gap-x-10 '>
        <button
          className='px-2 py-1 rounded w-20 outline outline-red-600 hover:bg-red-600 text-white'
          onClick={handleNo}
        >
          No
        </button>
        <button
          className='px-2 py-1 rounded w-20 outline outline-green-600 hover:bg-green-600 text-white'
          onClick={handleYes}
        >
          Yes
        </button>
      </div>
    </div>
  )
}
