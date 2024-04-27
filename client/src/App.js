
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import styles from "./style"
import SigninPage from './pages/signinPage';
import Home from './pages/Home';
import Navbar from './components/Navbar';

import {  Routes, Route } from "react-router-dom"
import Footer from './components/Footer';
import CreateSession from './pages/CreateSession';
import ListSession from "./pages/ListSession"
import Teacher from './pages/Teacher';
import Accepted from './pages/Accepted';
function App() {
  return (
   <>
   <div className='bg-gradient-to-r from-slate-900 via-gray-700 to-slate-600  w-full overflow-hidden'>
   <div>
   <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Navbar/>
            </div>
          </div>
   </div>
    <Routes>
      <Route exact path="/" element={<><Home/><Footer/></>}/>
      <Route exact path="/login" element={<><SigninPage/></>}/>
     
      <Route exact path="/createsession" element={<><CreateSession/></>}/>
      <Route exact path="/listsession" element={<><ListSession/></>}/>
      <Route exact path="/teachersession" element={<><Teacher/><Footer/></>}/>
      <Route exact path="/teacheracceptedsession" element={<><Accepted/><Footer/></>}/>
    </Routes>
    </div>
   
   </>
  );
}

export default App;
