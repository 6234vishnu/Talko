import React, { useState } from 'react'
import GetStartedPageModal from "./GetStartPageModal"

function GetStartedPage() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
    <div className="flex flex-col items-center text-center w-screen text-black bg-white min-h-screen justify-center">
 <div className="flex justify-center mb-6">
  <img
    className="w-40 sm:w-52 md:w-72 lg:w-80 xl:w-[303px] aspect-square rounded-full object-cover"
    src="/src/assets/images/file-MNLWh3Knn3VmdNXgBsDF41.webp"
    alt="logo image"
  />
</div>


<div className="mb-4 text-center">
  <h2 className="text-2xl font-semibold">Welcome to Talko</h2>
  <p className="text-gray-700">
    A Simple, Reliable, Private Way To Use Talko On Your Computer
  </p>
</div>


  <div className="pt-5">
    <button
      className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition ml-32"
      onClick={() => setShowModal(true)}
    >
      Get Started
    </button>
    {showModal && <GetStartedPageModal onClose={() => setShowModal(false)} />}
  </div>
</div>

    </>
  )
}
export default GetStartedPage