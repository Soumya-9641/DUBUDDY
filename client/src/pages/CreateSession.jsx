import React, { useState,useEffect } from 'react'
import DateTimePicker from 'react-datetime-picker';
import DatePicker from 'react-datepicker'
import Select from 'react-select';
import { useAuth } from '../context/authContext'
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseURL from '../basUrl';
//import 'react-datetime-picker/dist/DateTimePicker.css';
const CreateSession = () => {
    const [teachers, setTeachers] = useState([]);
    const {username} = useAuth();
    const navigate= useNavigate();
    let token;
    if(username){
        token=username.token
    }else{
        token=null;
    }
    // const teachers = [
    //     { value: '1', label: 'Teacher 1' },
    //     { value: '2', label: 'Teacher 2' },
    //     { value: '3', label: 'Teacher 3' },
    //     { value: '4', label: 'Teacher 4' },
    //     { value: '5', label: 'Teacher 5' }
    // ];
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState('12:00')
    const handleTimeChange = (newTime) => {
        setTime(newTime);
    };
    const [message, setMessage] = useState('');
    const handleTeacherChange = (selectedOption) => {
        setSelectedTeacher(selectedOption);
    };
    useEffect(() => {
        // Fetch the list of teachers from the backend when the component mounts
        const fetchTeachers = async () => {
          try {
            // Get the token from localStorage or wherever it is stored
            
      
            const response = await fetch(`${baseURL}/session/getallteachers`, {
                method: 'GET',
                headers: {
                    Authorization: `${token}`,
                  },
            });
            //console.log(response)
            const data = await response.json();
            //console.log(data)
            const options = data.map(item => ({
                value: item.id, // Assuming the ID is unique and can be used as the value
                label: item.name
            }));
            
            console.log(options);
            setTeachers(options);
          } catch (error) {
            console.error('Error fetching teachers:', error);
          }
        };
      
        fetchTeachers();
      }, []);

      const handleSubmit = async () => {
        try {
            const utcDate = new Date(startDate).toISOString();

            // Concatenate the selected time with the date
            const dateTimeString = `${utcDate.slice(0, 10)}T${time}:00.000Z`;
            const data = JSON.stringify({
                        date: dateTimeString,
                        teacherId: selectedTeacher.value,
                        details: message,
                    })
            console.log(data);
            const response = await fetch(`${baseURL}/session/book-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },

                body: data
            });
            //const data = await response.json();
            //console.log(response);
            console.log(response.status)
            const updatedata = await response.json();
            if(response.status===201){
                toast.success(`${updatedata.message}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                  navigate("/")
            }else{
                toast.error(`${response.message}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
            console.log(updatedata)
        } catch (error) {
            console.error('Error creating session:', error);
        }
    };
    return (
        <section class="text-gray-600 body-font relative mt-10 pt-20">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-col text-center w-full mb-12">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-slate-400">Create your session</h1>
                    
                </div>
                <div class="lg:w-1/2 md:w-2/3 mx-auto">
                    <div class="flex flex-wrap -m-2">
                        <div class="p-2 w-1/2">
                            <div>
                                <label for="name" class="leading-7 text-sm text-gray-600">date</label>

                                <div class="relative ">

                                    {/* <input type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/> */}
                                    {/* <DateTimePicker  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleDateChange} value={date} /> */}
                                    <DatePicker
                                        showIcon
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="p-2 w-1/2">
                            <div className='time-picker-container'> 
                                
                            <label>Select Time:</label>
                                <div class="relative ">

                                    {/* <input type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/> */}
                                    {/* <DateTimePicker  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleDateChange} value={date} /> */}
                                   
                <TimePicker
                    onChange={handleTimeChange}
                    value={time}
                    className="text-black bg-slate-100"
                />

                                </div>
                            </div>
                        </div>
                        <div class="p-2 w-1/2">
                            <div class="relative">
                                <label for="email" class="leading-7 text-sm text-gray-600">Time</label>
                                {/* <input type="email" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/> */}
                                <Select
                                    options={teachers}
                                    value={selectedTeacher}
                                    onChange={handleTeacherChange}
                                    placeholder="Select a teacher"
                                />
                            </div>
                        </div>
                        <div class="p-2 w-full">
                            <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
                            <input style={{ resize: 'none' }} id="message" name="message" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" value={message} onChange={(e) => setMessage(e.target.value)}></input>
                        </div>
                        <div class="p-2 w-full">
                            <button onClick={handleSubmit} class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Book</button>
                        </div>

                    </div>

                </div>
            </div>

        </section>
    )
}

export default CreateSession