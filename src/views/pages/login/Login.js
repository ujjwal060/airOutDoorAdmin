import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../scss/common.css'
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
  CSpinner // Import CSpinner for the loader
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

// Import your image here
import logoImage from '../../../../public/logo.png'; // Replace with your actual image path

const API_URL = 'http://3.111.163.2:8000/api/admin/login'; // Backend API URL

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader when request starts
    try {
      const response = await axios.post(API_URL, { email, password });
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);

        navigate('/Dashboard');
      } else {
        setError(response.data.message || 'Failed to login. Please check your credentials.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('Failed to login. Please check your credentials.');
      }
      console.error('Admin Login Error:', error);
    } finally {
      setLoading(false); // Hide loader when request is complete
    }

    

  };
  

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center ">
      <CContainer >
        <CRow className="justify-content-center" >
          <CCol style={{maxWidth: '37%'}}>
            <CCardGroup>
              <CCard className="p-4 bg-dark-gray">
                <CCardBody className="text-center">
                  {/* Insert image in the center */}
                  <div className="mb-4">
                    <img src={logoImage} alt="Logo" style={{ maxWidth: '45%', height: 'auto' }} />
                  </div>
                  <CForm onSubmit={handleSubmit}>
                    <h1 className='text-dark'>Welcome!</h1>
                    <p className="text-dark" >Admin Sign In</p>
                    {error && <p className="text-danger">{error}</p>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CCol>
                      <CCol>
                      <CButton
                          type="submit"
                          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }}
                          className="px-4"
                          disabled={loading} // Disable button while loading
                        >
                          {loading ? <CSpinner size="sm" /> : 'Login'} {/* Show loader in button */}
                        </CButton>
                      </CCol>
                      {/* <CCol className="text-right">
                        <Link to="/forgot-password">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </Link>
                      </CCol> */}
                    </CCol>
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

export default AdminLogin;
