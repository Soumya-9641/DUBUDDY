import React from 'react'
import Slideshow from '../components/Slide'
import { useAuth } from '../context/authContext'
import "./bg.css"
const Home = () => {
    const {username} = useAuth();
    //console.log(username)
    let user;
    if(username){
       user=username;
    }else{
        user=null;
    }
    return (
        <>

            <div className='shadow-lg shadow-cyan-500/50'>

                <div className='home-bg'>

                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="  text-green-400 tracking-widest font-bold mb-1">EazyBlog</h1>
                        {user ?( user.user && user.user.isTeacher===false?( <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-lime-300">Hello Student {user.user.name}</h1>
                        ):( <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-lime-300">Hello Teacher {user.user.name}</h1>)) 
                       :
                         <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-lime-300">Login to check your details</h1>}
                       
                        
                    </div>
                </div>
            </div>
            <div>

                <Slideshow />
            </div>
        </>

    )
}

export default Home