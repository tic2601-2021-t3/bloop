import React, { useEffect, useState }  from 'react'
import axios from 'axios'

function GetOne () {  
    const [backendData, setBackendData] = useState([])

    const getOne = async () => {
        const data = await axios.get("/api/get/64326e6d8a9a7e73327dc343")
          if (backendData !== undefined){
            setBackendData(data.data)
          }
      }
      
    useEffect(() => {
      getOne()
    }, [])
      
    
    return <div>  
      <h2> This pages displays one entry from my mongoDB database </h2>
      {backendData.length > 0 && backendData[0].food && (
        <p>{backendData[0].food}</p>
      )}
    </div>  
}  
export default GetOne;  