import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CRow,
  CCol,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCardText,
  CPagination,
  CPaginationItem
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash, faComment } from '@fortawesome/free-solid-svg-icons';

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState(''); // New state for the updated status
  const [visible, setVisible] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [filter, setFilter] = useState('ALL');

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/OrderDetails/');
      setOrderDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status); // Initialize the newStatus state with the current status
    setVisible(true);
  };

  const handleChatOrder = (order) => {
    setSelectedOrder(order);
    setChatVisible(true);
  };

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await axios.put(`http://localhost:3002/api/OrderDetails/${selectedOrder._id}`, { status: newStatus });
      setSelectedOrder({ ...selectedOrder, status: newStatus });
      setOrderDetails((prevDetails) =>
        prevDetails.map((order) =>
          order._id === selectedOrder._id ? { ...order, status: newStatus } : order
        )
      );
      setVisible(false); // Close the modal after updating
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const filteredOrderDetails = filter === 'ALL'
    ? orderDetails
    : orderDetails.filter(order => order.status === filter);

  return (
    <CCard>
      <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4>Order Details</h4>
        <CDropdown className="float-right">
          <CDropdownToggle color="secondary">
            Filter Orders
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => handleFilterChange('ALL')}>ALL</CDropdownItem>
            <CDropdownItem onClick={() => handleFilterChange('ACCEPT')}>ACCEPT</CDropdownItem>
            <CDropdownItem onClick={() => handleFilterChange('REJECT')}>REJECT</CDropdownItem>
            <CDropdownItem onClick={() => handleFilterChange('PENDING')}>PENDING</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CCardHeader>
      <CCardBody>
        <CCardText>
        <CTable hover bordered striped responsive>
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell>Order ID</CTableHeaderCell>
              <CTableHeaderCell>Items</CTableHeaderCell>
              <CTableHeaderCell>Date and Time</CTableHeaderCell>
              <CTableHeaderCell>Price</CTableHeaderCell>
              <CTableHeaderCell>Special Note</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {loading ? (
              <CTableRow>
                <CTableDataCell colSpan="7">Loading...</CTableDataCell>
              </CTableRow>
            ) : (
              filteredOrderDetails.map((order, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{order.orderId}</CTableDataCell>
                  <CTableDataCell>{order.items}</CTableDataCell>
                  <CTableDataCell>{order.dateTime}</CTableDataCell>
                  <CTableDataCell>{order.price}</CTableDataCell>
                  <CTableDataCell>{order.specialNote}</CTableDataCell>
                  <CTableDataCell>{order.status}</CTableDataCell>
                  <CTableDataCell>

                    <CButton onClick={() => handleViewOrder(order)}>
                      <FontAwesomeIcon icon={faEye} style={{ color: '#975c26' }} />
                    </CButton>

                    <CButton onClick={() => handleChatOrder(order)}>
                      <FontAwesomeIcon icon={faComment} style={{ color: '#1d979f' }} />
                    </CButton>

                    <CButton>
                      <FontAwesomeIcon icon={faTrash} style={{ color: '#b71f1f' }} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable>

        </CCardText>
        <CPagination align="center" aria-label="Page navigation example">
            <CPaginationItem disabled aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
            <CPaginationItem active>1</CPaginationItem>
            <CPaginationItem>2</CPaginationItem>
            <CPaginationItem>3</CPaginationItem>
            <CPaginationItem aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </CPagination>
      </CCardBody>
      

      {selectedOrder && (
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>View Order</CModalTitle>
          </CModalHeader>
          <CModalBody>
            
            <CForm>
              <CRow>
                <CCol md={6}>
                  <CFormLabel>Order ID</CFormLabel>
                  <CFormInput value={selectedOrder.orderId} readOnly />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Items</CFormLabel>
                  <CFormInput value={selectedOrder.items} readOnly />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Date and Time</CFormLabel>
                  <CFormInput value={selectedOrder.dateTime} readOnly />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Price</CFormLabel>
                  <CFormInput value={selectedOrder.price} readOnly />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Special Note</CFormLabel>
                  <CFormInput value={selectedOrder.specialNote} readOnly />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Additional Items</CFormLabel>
                  <CFormInput value={selectedOrder.additionalItems} readOnly />
                </CCol>

                <CCol md={6}>
                  <CFormLabel>Status</CFormLabel>
                  <CFormSelect value={newStatus} onChange={handleStatusChange}>
                    <option value="ACCEPT">ACCEPT</option>
                    <option value="REJECT">REJECT</option>
                    <option value="PENDING">PENDING</option>
                  </CFormSelect>
                </CCol>

                <CCol md={12}>
                  <h5>User Details</h5>
                </CCol>
                <CCol md={6}>
                  <CFormLabel>User Name</CFormLabel>
                  <CFormInput value={selectedOrder.userName} readOnly />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Mobile Number</CFormLabel>
                  <CFormInput value={selectedOrder.mobileNumber} readOnly />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Email</CFormLabel>
                  <CFormInput value={selectedOrder.email} readOnly />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Address</CFormLabel>
                  <CFormInput value={selectedOrder.address} readOnly />
                </CCol>
              </CRow>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={handleUpdateStatus}>
              Update
            </CButton>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}



      {selectedOrder && (
        <CModal visible={chatVisible} onClose={() => setChatVisible(false)}>
          <CModalHeader onClose={() => setChatVisible(false)}>
            <CModalTitle>Chat</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {/* Add your chat component here */}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setChatVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}
</CCard>
    
  );
};

export default OrderDetails;
