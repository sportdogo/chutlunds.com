import React, { useEffect } from 'react'
import Outstreams from '../components/Ads/Outstream'
import { getLocation } from '../config/firebase/lib'

export default function Rough() {

    useEffect(() => {

        getLocation()
   
    }, [])
    
    return (
        <div>

        
        </div>
    )
}
