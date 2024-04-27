import { createContext, useContext, useState,useEffect } from 'react';
import {  useNavigate} from 'react-router-dom'
import {jwtDecode as jwt_decode} from 'jwt-decode';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseURL from '../basUrl';
const backendUrl = process.env.REACT_APP_API_URL;
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
  //const navigate = useNavigate();
    const [username, setUser] = useState(() => {
      const storedUser = localStorage.getItem('current_User');
      return storedUser ? JSON.parse(storedUser) : null;
    }); 

    const checkTokenExpiration = () => {
      if (username && username.token) {
        const decodedToken = jwt_decode(username.token);
  
        // Check if the token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
          // Token is expired
          // Log out the user or handle the expiration accordingly
          setUser(null);
          localStorage.removeItem('current_User');
         // Redirect to the login page or another route
        }
      }
    };

    useEffect(() => {
      // Call the checkTokenExpiration function when the component mounts
      checkTokenExpiration();
  
      // You might want to set up a periodic check to handle token expiration during the user's session
      // For example, check every 5 minutes
      const intervalId = setInterval(checkTokenExpiration, 0.5 * 60 * 1000);
  
      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, [username]);
  

    const login = async (data) => {
    //  const email= formData.email
    //  const password=formData.password
     //const user={values}
     const user=data;
     
      try {
        const response = await fetch(`${baseURL}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        //console.log(data)
        if (response.status === 200) {
          setUser(data);
          localStorage.setItem('current_User', JSON.stringify(data));
          //console.log(data)
          //alert("signin success")
          // Set the user state
         return {success:true,message:"Authentication successful"}
        } else {
          // Handle authentication error (e.g., show an error message)
          // You can also clear the user state if necessary
          console.log("error")
          window.alert("Something wnet wrong")

          setUser(null);
          return {status:false,message:"Authentication failed"}
        }
      
      } catch (error) {
        // Handle network error or other exceptions
        // You can also clear the user state if necessary
        console.log(error)
        setUser(null);
        return {status:false,message:"Sign in failed"}
      }
    };

    const signup = async (val) => {
        //  const email= formData.email
        //  const password=formData.password
         //const user={values}
         const user=val;
         console.log(backendUrl)
          try {
            const response = await fetch(`${baseURL}/user/register`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(user),
            });
            const data = await response.json();
            console.log(data)
            if (response.status === 201) {
              setUser(data);
              localStorage.setItem('current_User', JSON.stringify(data));
              console.log(data)
             
                return {status:true,message:"authentication successfull"}
              //alert("signup success")
              // Set the user state
            } else {
              // Handle authentication error (e.g., show an error message)
              // You can also clear the user state if necessary
              //console.log("error")
              //window.alert("Something wnet wrong")
              setUser(null);
              return {status:false,message:"authentication failed"}
            }
          } catch (error) {
            // Handle network error or other exceptions
            // You can also clear the user state if necessary
            console.log(error)
            setUser(null);
            return {status:false,message:"signup failed"}
          }
        };

  
    const logout = () => {
      setUser(null);
      localStorage.removeItem("current_User");
      
    };
  
    return (
      <AuthContext.Provider value={{ username,login,signup, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };