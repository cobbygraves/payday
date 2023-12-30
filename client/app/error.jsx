'use client'

const Error = ({ error, reset }) => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h2 className='text-3xl text-center font-bold'>{error.message}</h2>
      <button
        onClick={reset}
        className='py-1 px-2 outline outline-blue-300 m-3 rounded-lg'
      >
        Reload Page
      </button>
    </div>
  )
}

export default Error
