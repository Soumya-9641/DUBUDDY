import { Button, Stack, TextField, Typography, colors } from '@mui/material';
import React,{useState} from 'react';
import { ScreenMode } from '../pages/signinPage';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {  useNavigate} from 'react-router-dom'
import * as Yup from 'yup';
import { useAuth } from '../context/authContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SigninForm = ({ onSwitchMode }) => {
  const {login}= useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const { email, password } = values;
    const data = {
      email: email,
      password: password
    };
    try {

     const response =await login(data);
      console.log(response)
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message);
      // }

      // Reset form after successful signup
      if(response.success){
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
        navigate("/")
      }else{
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
     
      //console.log(values)
      setSubmitting(false);
      setErrors({});
      //alert('Signin successful!');
      
    } catch (error) {
      //window.alert("Something wnet wrong")
      console.error('Error signing up:', error.message);
      setSubmitting(false);
      setErrors({ password: error.message }); // Display backend error message
    }
  };
  return (
<>
<div>



    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
     
      <Form>
        <div className=' mt-20'>
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
              <Stack >
                <Typography variant='h4' fontWeight={600} color={colors.green[400]}>
                Welcome back! Log in to join the community
                </Typography>
                <Typography color={colors.grey[100]}>
                Get back into the action. Log in to pick up where you left off.
                </Typography>
              </Stack>

              <Stack spacing={4}>
                <Stack spacing={2}>
                  <Stack spacing={1}>
                    <Typography color={colors.grey[500]}>Email</Typography>
                    <Field type="email" name="email" as={TextField} sx={{ input: { color: 'white' } }} />
                    <div className='text-red-600'>
                      <ErrorMessage name="email" />
                    </div>

                  </Stack>
                  <Stack spacing={1}>
                    <Typography color={colors.grey[500]}>Password</Typography>
                    <Field  name="password" as={TextField} sx={{ input: { color: 'white' } }}
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
                    }}
                    />
                    <div className='text-red-600'>
                      <ErrorMessage name="password" />
                    </div>

                  </Stack>
                  {/* <div class="max-w-sm">
                    <label class="block text-sm mb-2 dark:text-white">Password</label>
                    <div class="relative">
                      <input id="hs-toggle-password" type="password" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter password" value="12345qwerty"/>
                        <button type="button" data-hs-toggle-password='{
        "target": "#hs-toggle-password"
      }' class="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                          <svg class="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path class="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                            <path class="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                            <path class="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                            <line class="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22" />
                            <path class="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle class="hidden hs-password-active:block" cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                    </div>
                  </div> */}
                </Stack>
                <Button
                  type="submit"
                  variant='contained'
                  size='large'
                  sx={{
                    bgcolor: colors.teal[800],
                    "&:hover": {
                      bgcolor: colors.teal[400]
                    }
                  }}
                >
                  Sign in
                </Button>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Typography color={colors.red[400]}>Don't have an account?</Typography>
                <Typography
                  color={colors.teal[400]}
                  onClick={() => onSwitchMode(ScreenMode.SIGN_UP)}
                  fontWeight={600}
                  sx={{
                    cursor: "pointer",
                    userSelect: "none"
                  }}
                >
                  Sign up now
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </Form>
    </Formik>
    </div>
</>
  );
};

export default SigninForm;