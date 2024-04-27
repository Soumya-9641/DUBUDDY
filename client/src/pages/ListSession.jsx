import React,{useEffect,useState} from 'react'
import { useAuth } from '../context/authContext'
import baseURL from '../basUrl';
const ListSession = () => {
    const {username} = useAuth();
    const [sessions, setSessions] = useState([]);
    let token;
    if(username){
        token=username.token
        console.log(token)
    }else{
        token=null;
    }
    console.log(sessions)
    // Assuming you have a function to fetch sessions associated with the user from your backend
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                // Fetch sessions associated with the user
                const response = await fetch(`${baseURL}/session/sessions`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`,  // Add any headers like authorization token if required
                    },
                });
                //console.log(response)
                const data = await response.json();
                //console.log(data.data);
                const updatedata= data.data;
                // Update the state with fetched sessions
                setSessions(updatedata);
                
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };
        fetchSessions();
    }, []);
  return (
    <section className="text-gray-600 body-font overflow-hidden">
  <div className="container flex justify-center px-5 py-24 mx-auto">
    {/* <div className="-my-8 divide-y-2 divide-gray-100">
    {sessions.map(session => (
      <div key={session._id} className="py-8 flex flex-wrap md:flex-nowrap">
        <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
          <span className="font-semibold title-font text-gray-400">{new Date(session.date).toLocaleDateString()}</span>
          <span className="mt-1 text-slate-300 text-sm">{new Date(session.date).toLocaleTimeString([], { timeZone: 'UTC' })}</span>
        </div>
        <div className="md:flex-grow">
          <h2 className="text-2xl font-medium text-gray-100 title-font mb-2"><span className='text-teal-200'>Teacher:</span> {session.teacher.name}</h2>
          <p className="leading-relaxed text-slate-400">{session.details}</p>
          <p className={`text-${session.status === 'Rejected' ? 'red' : session.status === 'Accepted' ? 'green' : 'indigo'}-500 inline-flex items-center mt-4`}>{session.status}
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </p>
        </div>
      </div>
    ))}
      
      
    </div> */}
     <div className="flex flex-wrap -m-4">
     
     {sessions.map(session => (
     <div key={session._id} className="p-4 md:w-1/3 shadow-2xl shadow-red-950 mb-6 rounded-md">
       <div className="h-full shadow-yellow-950 bg-gradient-to-r from-slate-800 to-gray-500 border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
         <div className="p-6">
           <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{new Date(session.date).toLocaleDateString()} {new Date(session.date).toLocaleTimeString([], { timeZone: 'UTC' })}</h2>
           <h1 className="title-font text-lg font-medium text-indigo-300 mb-3"><span>Teacher:</span> {session.teacher.name}</h1>
           <p className="leading-relaxed mb-3 text-gray-200">{session.details}</p>
           
           <div className="flex items-center flex-wrap">
            
           <p className={`text-${session.status === 'Rejected' ? 'red' : session.status === 'Accepted' ? 'green' : 'indigo'}-500 inline-flex items-center mt-4`}>{session.status}
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </p>
             
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

export default ListSession