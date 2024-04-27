import { Button, Stack, TextField, Typography, colors } from '@mui/material';
import React, { useState } from 'react';
import { ScreenMode } from '../pages/signinPage';
import emailjs from 'emailjs-com';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignupForm = ({ onSwitchMode }) => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [termsChecked, setTermsChecked] = useState(false); // State to track if terms are checked
  const [error, setError] = useState('');
  const [isTeacher,setisTeacher]= useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleCheckboxChange = (event) => {
    setTermsChecked(event.target.checked);
    setError('');
    setisTeacher(true);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values) => {
    // if (!termsChecked) {
    //   setError('Please accept the terms and conditions');
    //   return;
    // }
    const { user_name, user_email, user_password } = values;
    const val = { name:user_name, email:user_email, password:user_password,isTeacher };

    console.log(val);
    try {
      const response = await signup(val);
      // const response = await fetch('http://localhost:9000/user/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(val)
      // });
      // const data = await response.json()
      // console.log(data)
      // if (!response.ok) {

      //   throw new Error('Error signing up');

      // }
      console.log(response)
      if (response.status) {
        //alert(`${response.message}`)
        toast.success(`${response.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log('User signed up successfully');
        //alert("register successfully");
        navigate("/")
      } else {
        //alert(`${response.message}`)
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

      // User signed up successfully
      // You can handle the response as needed, e.g., show a success message

      // navigate("/")
    } catch (error) {
      console.error('Error signing up:', error.message);
      console.log(error)
      // Handle error, e.g., show an error message to the user
    }
    // emailjs.send('service_cr4jrzb', 'template_2bqguoo', {
    //   to_email: user_name,
    //   to_name: user_email,
    // }, 'sImhH-s2k3gEn3ti1')
    //   .then((response) => {
    //     console.log('Email sent successfully:', response);
    //     // Handle success, e.g., show a success message
    //   })
    //   .catch((error) => {
    //     console.error('Email sending failed:', error);
    //     // Handle error, e.g., show an error message
    //   });
    // Handle form submission
  };
  return (
    <Formik
      initialValues={{
        user_name: '',
        user_email: '',
        user_password: ''
      }}
      validationSchema={Yup.object({
        user_name: Yup.string().required('Name is required'),
        user_email: Yup.string().email('Invalid email address').required('Email is required'),
        user_password: Yup.string().required('Password is required')
      })}
      onSubmit={handleSubmit}
    >

      <Form>
        <div className='mt-10'>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              height: "100%",
              color: colors.grey[800]
            }}
          >

            <Stack spacing={5} sx={{
              width: "100%",
              maxWidth: "500px"
            }}>
              <Stack>
                <Typography variant='h4' fontWeight={600} color={colors.green[400]}>
                  Create an account
                </Typography>
                <Typography color={colors.grey[200]}>
                  Register now and open the door to endless possibilities.
                </Typography>
              </Stack>

              <Stack spacing={4}>
                <Stack spacing={2}>
                  <Stack spacing={1}>
                    <Typography color={colors.grey[400]}>Name</Typography>
                    <Field name='user_name' as={TextField} sx={{ input: { color: 'white' } }} />
                    <div className='text-red-600'>
                      <ErrorMessage name="user_name" component="div" color={colors.red[400]} />
                    </div>


                  </Stack>
                  <Stack spacing={1}>
                    <Typography color={colors.grey[400]}>Email</Typography>

                    <Field name='user_email' as={TextField} sx={{ input: { color: 'white' } }} />
                    <div className='text-red-600'>
                      <ErrorMessage name="user_email" component="div" color={colors.red[400]} />
                    </div>

                  </Stack>
                  <Stack spacing={1}>
                    <Typography color={colors.grey[400]}>Password</Typography>



                    <Field name='user_password' as={TextField} sx={{ input: { color: 'white' } }}
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <Button className='ml-2' onClick={togglePasswordVisibility}>
                            <svg className="flex-shrink-0 size-3.5 text-teal-400 dark:text-teal-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                              <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                              <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                              <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22" />
                              <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                              <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3" />
                            </svg>
                          </Button>
                        ),
                      }} // Conditionally set the type of the password field
                    />



                    <div className='text-red-600'>
                      <ErrorMessage name="user_password" component="div" color={colors.red[400]} />
                    </div>

                  </Stack>
                </Stack>
                <div className="flex items-start mb-5">
                  <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  onChange={handleCheckboxChange} />
                  </div>
                  <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Signup as Teacaher?</label>
                </div>
                {error && <Typography color={colors.red[400]}>{error}</Typography>}
                <Button
                  type='submit'
                  onSubmit={handleSubmit}
                  variant='contained'
                  size='large'
                  sx={{
                    bgcolor: colors.teal[800],
                    "&:hover": {
                      bgcolor: colors.teal[400]
                    }
                  }}

                  
                >
                  Sign up
                </Button>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Typography color={colors.red[400]}>Already have an account?</Typography>
                <Typography
                  color={colors.teal[400]}
                  onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}
                  fontWeight={600}
                  sx={{
                    cursor: "pointer",
                    userSelect: "none"
                  }}
                >
                  Sign in
                </Typography>
              </Stack>
            </Stack>

          </Stack>
        </div>
      </Form>

    </Formik>
  );
};

export default SignupForm;