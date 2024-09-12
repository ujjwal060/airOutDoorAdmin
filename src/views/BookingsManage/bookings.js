import React, { useState, useRef } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CForm,
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CAlert,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FaTimes as FaTimesIcon } from 'react-icons/fa';

// Static data for bookings
const staticBookings = [
  { _id: "1", user: "User A", property: "Property A", date: "2024-09-12", status: "pending" },
  { _id: "2", user: "User B", property: "Property B", date: "2024-09-13", status: "confirmed" },
  // Add more static bookings here
];

const BookingManagement = () => {
  const [visible, setVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState(staticBookings);
  const [error, setError] = useState(null);
  const [searchBooking, setSearchBooking] = useState('');
  const searchBookingRef = useRef(searchBooking);

  const handleDelete = (id) => {
    setBookings(bookings.filter((booking) => booking._id !== id));
  };

  const handleSearchBooking = (e) => {
    const value = e.target.value;
    setSearchBooking(value);
    searchBookingRef.current = value;

    // Filter static data based on search input
    const filteredBookings = staticBookings.filter(booking =>
      booking.user.toLowerCase().includes(value.toLowerCase()) ||
      booking.property.toLowerCase().includes(value.toLowerCase())
    );
    setBookings(filteredBookings);
  };

  const handleClear = () => {
    setSearchBooking('');
    setBookings(staticBookings);
  };

  const handleApprove = (id) => {
    setBookings(bookings.map(booking =>
      booking._id === id ? { ...booking, status: "confirmed" } : booking
    ));
  };

  const handleCancel = (id) => {
    setBookings(bookings.map(booking =>
      booking._id === id ? { ...booking, status: "cancelled" } : booking
    ));
  };

  const handleDispute = () => {
    // Placeholder for actual dispute handling logic
    setVisible(true);
  };

  const handleSave = () => {
    // Placeholder for save logic
    setVisible(false);
  };

  const handleCancelModal = () => {
    setVisible(false);
  };

  return (
    <>
      {error && <CAlert color="danger">{error}</CAlert>}
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h3>Booking Management</h3>
          <CForm className="d-flex align-items-center" style={{ width: '12rem', marginLeft: 'auto' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <CFormInput
                type="text"
                placeholder="Search by User/Property"
                value={searchBooking}
                onChange={handleSearchBooking}
              />
              {searchBooking && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '0.5rem',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer'
                  }}
                  onClick={handleClear}
                >
                  <FaTimesIcon size={16} />
                </div>
              )}
            </div>
          </CForm>
        </CCardHeader>

        <CCardBody>
          <CTable responsive striped hover bordered>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>S.No</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>User</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Property</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Date</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Status</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {bookings.map((booking, index) => (
                <CTableRow key={booking._id}>
                  <CTableHeaderCell scope="row" style={{ textAlign: "center" }}>{index + 1}</CTableHeaderCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    {booking.user || "null"}
                  </CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    {booking.property || "null"}
                  </CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    {booking.date || "null"}
                  </CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    {booking.status || "null"}
                  </CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    {booking.status === "pending" && (
                      <>
                        <CButton size="sm" onClick={() => handleApprove(booking._id)}>
                          <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
                        </CButton>
                        <CButton size="sm" onClick={() => handleCancel(booking._id)}>
                          <FontAwesomeIcon icon={faTimes} style={{ color: "#fd2b2b" }} />
                        </CButton>
                        <CButton size="sm" onClick={handleDispute}>
                          <FontAwesomeIcon icon={faEdit} />
                        </CButton>
                      </>
                    )}
                    {booking.status === "confirmed" && (
                      <CButton size="sm" disabled>
                        <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
                      </CButton>
                    )}
                    {booking.status === "cancelled" && (
                      <CButton size="sm" disabled>
                        <FontAwesomeIcon icon={faTimes} style={{ color: "#fd2b2b" }} />
                      </CButton>
                    )}
                    <CButton size="sm" onClick={() => handleDelete(booking._id)}>
                      <FontAwesomeIcon icon={faTrash} style={{ color: "#fd2b2b" }} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Dispute/Modal */}
      <CModal visible={visible} onClose={handleCancelModal}>
        <CModalHeader onClose={handleCancelModal} closeButton>
          <CModalTitle>Handle Dispute</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CListGroup>
            <CListGroupItem><strong>User: </strong> {selectedBooking?.user}</CListGroupItem>
            <CListGroupItem><strong>Property: </strong> {selectedBooking?.property}</CListGroupItem>
            <CListGroupItem><strong>Date: </strong> {selectedBooking?.date}</CListGroupItem>
            <CListGroupItem><strong>Status: </strong> {selectedBooking?.status}</CListGroupItem>
          </CListGroup>
          {/* Placeholder for dispute resolution */}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCancelModal}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleSave}>
            Save Changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default BookingManagement;
