import React from 'react'
import kannada_girl from '../../assets/images/kannada_girl.png'



const Banner:React.FC = () => {
  return (
    <>
    <div className="w-full h-[90vh] flex justify-center items-center">
      <div className="w-full md:w-3/4 lg:w-1/2 bg-white flex flex-col justify-center items-centerz">
      <div className="max-w-max ml-20 pl-10">
             <h1 className="text-7xl font-medium text-black mb-10">More visibility and a better patient experience</h1>
             <h2 className="text-2xl font-semibold text-black mb-8">QuickDoc helps over a million patients connect and engage with practices just like yours.</h2>
             {/* <h3 className="text-3xl font-bold text-black mb-8">in Medical Excellence</h3> */}
            <button className=" w-64 bg-green-700 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-green-600">Get Started</button>
            </div>
      </div>
      <div className="hidden md:block w-1/2 h-auto pl-20">
        <img src={kannada_girl} alt="Kannada Girl" className="w-full  sm:w-3/4 md:w-3/4 lg:w-4/5 xl:w-11/12 2xl:w-10/12 h-auto" />
      </div>
    </div>
  </>
  )
}

export default Banner