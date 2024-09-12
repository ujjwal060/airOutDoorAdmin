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
  CSpinner // Import the spinner component for the loader
} from '@coreui/react';

const Broadcast = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState({
    title: '',
    body: '',
    role: '',
  });
  const [loading, setLoading] = useState(false); // Add loading state

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
    setLoading(true); // Set loading to true when starting the request
    const newNotif = {
      ...newNotification,
      timestamp: new Date().toLocaleString(),
    };

    try {
      const response = await fetch('http://3.111.163.2:3002/api/admin/sendN', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNotif),
      });

      if (!response.ok) {
        throw new Error('Failed to send notification');
      }
      const result = await response.json();
      setNotifications([result, ...notifications]);
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
