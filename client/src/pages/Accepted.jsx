import React,{useState,useEffect} from 'react'
import { useAuth } from '../context/authContext';
import baseURL from '../basUrl';
const Accepted = () => {
    const {username} = useAuth();
    const [sessions, setSessions] = useState([]);
    let token;
    if(username){
        token=username.token
        console.log(token)
    }else{
        token=null;
    }
    const fetchSessions = async () => {
        try {
            // Fetch sessions associated with the user
            const response = await fetch(`${baseURL}/session/sessions/acceptedrequests`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,  // Add any headers like authorization token if required
                },
            });
            //console.log(response)
            const data = await response.json();
            //console.log(data);
            //const updatedata= data.data;
            
            // Update the state with fetched sessions
            setSessions(data);
            
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };
    console.log(sessions)
    useEffect(() => {
        
        fetchSessions();
    }, []);
  return (
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap -m-4">
       
      {sessions.map(session => (
      <div key={session._id} className="p-4 md:w-1/3 shadow-2xl shadow-red-950 mb-6 rounded-md">
        <div className="h-full shadow-yellow-950 bg-gradient-to-r from-slate-800 to-gray-500 border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{new Date(session.date).toLocaleDateString()} {new Date(session.date).toLocaleTimeString([], { timeZone: 'UTC' })}</h2>
            <h1 className="title-font text-lg font-medium text-indigo-300 mb-3">{session.user.name}</h1>
            <p className="leading-relaxed mb-3 text-gray-200">{session.details}</p>
            
            <div className="flex items-center flex-wrap">
             
                <button  className="text-green-500 inline-flex items-center md:mb-2 lg:mb-0 pr-4" >
                  Accepted
                  
                </button>
              
                
              
            </div>
          </div>
        </div>
      </div>
    ))}
       
      </div>
    </div>
  </section>
  )
}

export default Accepted