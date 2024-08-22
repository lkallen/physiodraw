import './App.css'
import { useState, useEffect } from 'react'

import ImageApp from './ImageApp'
import Canvas from './Canvas'
import Header from './Header'


export default function App() {

  return (
    <div>
      <Header />
      <ImageApp />

    </div>
  )
}