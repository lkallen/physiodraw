import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

const supabase = createClient("https://gwtujtqvhhjxkziphkvf.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3dHVqdHF2aGhqeGt6aXBoa3ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5NTM2MTgsImV4cCI6MjAzODUyOTYxOH0.-Cv9HfOrzYNTFwemHQ7C2qGmtmHKPSmrbUcb5LIIrUc")



export default function LegFootPics(props) {

    
    const [pics, setPics] = useState([])

    useEffect(() => {
        getPics()
    }, [])
  
    async function getPics() {
       const { data } = await supabase.from("anatomy")
            .select()
            .eq('name', 'Leg & Foot')
            setPics(data);
    }
  
    console.log(pics)

    const [imageUrl, setImageUrl] = useState()

    function handleClick(id) {
        // console.log(id)
        // console.log(event.target)
        setImageUrl(event.target)
    }

    useEffect(() => {
        console.log(imageUrl)
    }, [imageUrl])

    const clickImage = props.clickImage


    const imagesElements = pics.map(pic => (
        <div className='image-card' key={pic.id}>
            {/* <p>{pic.name}</p> */}
            {/* <p>{pic.tags}</p> */}
            <img 
                // onClick={() => handleClick(pic.id)}
                onClick={() => clickImage()}
                src={pic.url} 
            />
        </div>
    ))

    return (
        <div className='images-elements'>
            {imagesElements}

        </div>
    )

}