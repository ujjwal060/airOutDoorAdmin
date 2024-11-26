import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';

import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

const Login = () => {
    
//   const navigateTo = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:3002/api/auths/login', {
//         email,
//         password,
//       });
//       setMessage(response.data.message);
//       if (response.status === 200) {
//         navigateTo('/Subscription'); // Navigate to the desired page upon successful login
//       }
//     } catch (error) {
//       setMessage('Login failed');
//     }
//   };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>

              <CCard className="p-4" style={{maxWidth: "65%", margin: "auto"}}>

                <CCardBody>
                  <CForm>
                    <h1 className="text-center">Forgot Password</h1>
                    <p className="text-body-secondary text-center">Enter the email address associated with your account and we'll send you a link to reset your password.</p>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>

                      <CFormInput
                        placeholder="Email"
                        // autoComplete="email"
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                      />

                    </CInputGroup>
                    

                    <CRow className="justify-content-center">
                      <CCol xs={6} className="text-center">
                        <CButton
                          color="primary"
                          variant="outline"
                          className="px-4"
                        //   onClick={handleLogin}
                        >
                          Continue
                        </CButton>
                      </CCol>
                      
                    </CRow>

                    {/* {message && <p className="text-danger mt-3">{message}</p>}
                    {/ Display the message if it exists /} */}
                  </CForm>
                </CCardBody>
                
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
