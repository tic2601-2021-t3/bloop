import { useState, useEffect } from 'react';
import axios from 'axios';

const Protected = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get('/api/protected', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMessage(res.data); // when the /protected endpoint returns status 200, setMessage(res.data) will be executed
      } catch (err) {         // when the /protected endpoint returns status 403, this catch block will be executed naturally
        setMessage(err.response.data); // therefore, to display our customised message i.e. Opps! Only admins can access this route 🔮, we need to set the message here
        console.log(err); // this logs the 403 error to browser console
      }
    };

    fetchMessage();
  }, []);
  return (
    <div>
      <h2>Protected Page </h2>
      {message}
    </div>
  );
};

export default Protected;
