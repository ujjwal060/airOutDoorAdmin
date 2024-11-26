import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CContainer,
  CFormSelect,
  CSpinner
} from '@coreui/react';
import axios from 'axios';

const Broadcast = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState({
    title: '',
    body: '',
    role: '',
  });
  const [loading, setLoading] = useState(false);

  const handleNewNotificationChange = (e) => {
    const { name, value } = e.target;
    let mappedValue = value;
    if (name === "role") {
      mappedValue = value === "Users" ? "user" : "vendor";
    }
    setNewNotification((prevState) => ({
      ...prevState,
      [name]: mappedValue,
    }));
  };

  const handleSendNotification = async () => {
    setLoading(true);
  
    try {
      const response = await axios.post('http://18.209.197.35:8000/notification/send', newNotification, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      setNotifications([response.data]);
      setNewNotification({ title: '', body: '', role: '' });
    } catch (error) {
      console.error('Error sending notification:', error);
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  return (
    <CContainer className="mt-4">
      <CRow>
        <CCol md="10">
          <h4>Send Manual Update</h4>
          <CCard className="bg-light text-dark mb-4">
            <CCardBody>
              <CForm>
                <div className="mb-3">
                  <CFormLabel htmlFor="title">Title</CFormLabel>
                  <CFormInput
                    type="text"
                    id="title"
                    name="title"
                    value={newNotification.title}
                    onChange={handleNewNotificationChange}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="message">Message</CFormLabel>
                  <CFormTextarea
                    id="message"
                    name="body"
                    value={newNotification.body}
                    onChange={handleNewNotificationChange}
                  />
                </div>
                <div className="mb-3">
                  <CCol>
                    <CFormSelect
                      id="role"
                      name="role"
                      value={newNotification.role === 'user' ? 'Users' : 'Vendors'}
                      onChange={handleNewNotificationChange}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Users">Users</option>
                      <option value="Vendors">Vendors</option>
                    </CFormSelect>
                  </CCol>
                </div>

                <CButton 
                  color="primary" 
                  onClick={handleSendNotification} 
                  disabled={loading} // Disable the button while loading
                >
                  {loading ? <CSpinner size="sm" /> : 'Send Notification'}
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Broadcast;
