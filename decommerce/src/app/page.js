'use client'

import React from 'react'
import Sidenavbar from './Components/sidenavbar'

const page = () => {
  return (
    <div className={style.container}>
      <Sidenavbar/>

    </div>
  )
}

export default page

const style={
  container:"h-full w-full flex bg-[#000000]"
}