import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

import { Select } from 'antd';

import BrainPics from './ImageApp/BrainPics'
import HeadNeckPics from './ImageApp/HeckNeckPics'
import ThoraxAbdomenPelvisPics from './ImageApp/ThoraxAbdomenPelvisPics'
import UpperArmElbowForearmPics from './ImageApp/UpperArmElbowForearmPics'
import WristHandPics from './ImageApp/WristHandPics'
import HipThighKneePics from './ImageApp/HipThighKneePics'
import LegFootPics from './ImageApp/LegFootPics'
import Canvas from './Canvas'



const supabase = createClient("https://gwtujtqvhhjxkziphkvf.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3dHVqdHF2aGhqeGt6aXBoa3ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5NTM2MTgsImV4cCI6MjAzODUyOTYxOH0.-Cv9HfOrzYNTFwemHQ7C2qGmtmHKPSmrbUcb5LIIrUc")

export default function ImageApp() {

  const [pics, setPics] = useState([])
  const [selectedUrl, setSelectedUrl] = useState()
  const [category, setCategory] = useState('brain')

  useEffect(() => {
      getAnatomyPics()
  }, [])

  async function getAnatomyPics() {
     const { data } = await supabase.from("anatomy").select();
     setPics(data);
  }

  function clickImage() {
    setSelectedUrl(event.target.src)
    toggleIsOpenFalse()
  }

  useEffect(() => {
    console.log(selectedUrl)
  }, [selectedUrl])

  useEffect(() => {
    console.log(category)
  }, [category])

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setCategory(value)
  };

  const [isOpen, setIsOpen] = useState(false)

  function toggleIsOpenTrue() {
    setIsOpen(true)
  }

  function toggleIsOpenFalse() {
    setIsOpen(false)
  }

    return (
        <div>
          <div className='dropdown-container'>
            {
              (isOpen === false) && 
              <button id='open-button' onClick={toggleIsOpenTrue}>
              Open Image Selector
          </button>
            }
            {
              (isOpen === true) && 
              <button id='close-button' onClick={toggleIsOpenFalse}>
              Close Image Selector
          </button>
            }
            {
              isOpen && <Select 
              className='dropdown'
              defaultValue={category}
              onChange={handleChange}
              options={[
                {
                  value: 'brain',
                  label: 'Brain',
                },
                {
                  value: 'headneck',
                  label: 'Head / Neck',
                },
                {
                  value: 'thoraxabdomenpelvis',
                  label: 'Thorax / Abdomen / Pelvis',
                },
                {
                  value: 'upperarmelbowforearm',
                  label: 'Upper Arm / Elbow / Forearm',
                },
                {
                  value: 'wristhand',
                  label: 'Wrist / Hand',
                },
                {
                  value: 'hipthighknee',
                  label: 'Hip / Thigh / Knee',
                },
                {
                  value: 'legfoot',
                  label: 'Leg / Foot',
                },
              ]}
          />
            }

          </div>

            <div>
              { (category === 'brain' && isOpen) && <BrainPics clickImage={clickImage} /> }
              { (category === 'headneck' && isOpen) && <HeadNeckPics clickImage={clickImage} /> }
              { (category === 'thoraxabdomenpelvis' && isOpen) && <ThoraxAbdomenPelvisPics clickImage={clickImage} /> }
              { (category === 'upperarmelbowforearm' && isOpen) && <UpperArmElbowForearmPics clickImage={clickImage} /> }
              { (category === 'wristhand' && isOpen) && <WristHandPics clickImage={clickImage} /> }
              { (category === 'hipthighknee' && isOpen) && <HipThighKneePics clickImage={clickImage} /> }
              { (category === 'legfoot' && isOpen) && <LegFootPics clickImage={clickImage} /> }

            </div>

       

            <Canvas 
                selectedUrl={selectedUrl}
            />


        </div>
    )
}