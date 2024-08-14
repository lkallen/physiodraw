import './App.css'
import { useState, useEffect } from 'react'

import ImageApp from './ImageApp'
import Canvas from './Canvas'
import Header from './Header'
import Details from './Details'


export default function App() {

  return (
    <div>
      <Header />
      {/* <Details /> */}
      <ImageApp />

    </div>
  )
}