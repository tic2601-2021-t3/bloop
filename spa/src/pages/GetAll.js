import React, { useEffect, useState }  from 'react'
import axios from 'axios'

function GetAll () {  
  /* Alternative method to get data and display data
  const getEverything = (data) => {
      const result = []
      for (let i = 0; i < len(data); i++) {
        result.append((<p key={data[i]._id}>{data[i].food}</p>))
      }
      return result // will return to the frontend where getEverything(backendData) was called below
  }
  */

    const [backendData, setBackendData] = useState([{}])

    const getAll = async () => {
        const data = await axios.get("/api/getAll")
          if (backendData !== undefined){
            setBackendData(data.data)
          }
      }
      
    useEffect(() => {
      getAll() //const data = getAll()
    }, [])
      
    return <div>  
      <h2> This pages displays all the data from my mongoDB database </h2>
      {(
        (backendData.map((item) => (<p key={item._id}>{item.food}</p>))) // getEverything(backendData)
      )}
    </div>  
}  
export default GetAll;  