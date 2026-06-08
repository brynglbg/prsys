import React from 'react'

const LoadingScreen = () => {
  return (
    <>
      <div className="loading-container fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center backdrop-blur-xs bg-base-300/50">
        <span className="loading loading-dots loading-xl text-info"></span>
      </div>
    </>
  )
}

export default LoadingScreen