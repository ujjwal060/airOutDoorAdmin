import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CSpinner,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Tables = () => {
  const [Bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(10)
  const vendorId = localStorage.getItem('vendorId')

  // Fetch bookings from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsResponse = await axios.get(`http://44.196.64.110:8000/booking/getBooking`)
        setBookings(bookingsResponse.data || [])
        console.log(bookingsResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Delete a booking by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://44.196.64.110:8000/booking/delete/${id}`)
      setBookings(Bookings.filter((booking) => booking._id !== id))
    } catch (error) {
      console.error('Error deleting booking:', error)
      setError('Failed to delete booking')
    }
  }

  // Calculate current bookings for pagination
  const indexOfLastBooking = currentPage * rowsPerPage
  const indexOfFirstBooking = indexOfLastBooking - rowsPerPage
  const currentBookings = Bookings.slice(indexOfFirstBooking, indexOfLastBooking)

  // Pagination logic
  const totalPages = Math.ceil(Bookings.length / rowsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Bookings</strong>
            </CCardHeader>
            <CCardBody>
              {loading ? (
                <CSpinner color="primary" />
              ) : error ? (
                <div className="text-danger">{error}</div>
              ) : (
                <CTable>
                  <CTableHead color="dark">
                    <CTableRow>
                      <CTableHeaderCell>#</CTableHeaderCell>
                      <CTableHeaderCell>Check In</CTableHeaderCell>
                      <CTableHeaderCell>Check Out</CTableHeaderCell>
                      <CTableHeaderCell>Guests</CTableHeaderCell>
                      <CTableHeaderCell>VendorId</CTableHeaderCell>
                      <CTableHeaderCell>Property Name</CTableHeaderCell>
                      <CTableHeaderCell>User</CTableHeaderCell>
                      <CTableHeaderCell>Camper</CTableHeaderCell>
                      <CTableHeaderCell>Price</CTableHeaderCell>
                      <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {currentBookings.length > 0 ? (
                      currentBookings?.map((Booking, index) => (
                        <CTableRow key={Booking._id}>
                          <CTableHeaderCell scope="row">
                            {index + 1 + (currentPage - 1) * rowsPerPage}
                          </CTableHeaderCell>
                          <CTableDataCell>
                            {new Date(Booking.checkInDate).toLocaleDateString()}
                          </CTableDataCell>
                          <CTableDataCell>
                            {new Date(Booking.checkOutDate).toLocaleDateString()}
                          </CTableDataCell>
                          <CTableDataCell>{Booking.guests}</CTableDataCell>
                          <CTableHeaderCell>{Booking.vendorId}</CTableHeaderCell>
                          <CTableHeaderCell>
                            {Booking?.propertyDetails?.propertyName}
                          </CTableHeaderCell>
                          <CTableHeaderCell>{Booking.userId?.fullName}</CTableHeaderCell>
                          <CTableDataCell>{Booking.camper ? 'Yes' : 'No'}</CTableDataCell>
                          <CTableDataCell>{Booking.totalAmount}</CTableDataCell>
                          <CTableDataCell>
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() => handleDelete(Booking._id)}
                              style={{ cursor: 'pointer', color: 'red' }}
                            />
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan={7} className="text-center">
                          No bookings found
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* Pagination */}
      <CPagination
        aria-label="Page navigation example"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <CPaginationItem disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
          &laquo;
        </CPaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <CPaginationItem
            key={index + 1}
            active={currentPage === index + 1}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </CPaginationItem>
        ))}
        <CPaginationItem
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          &raquo;
        </CPaginationItem>
      </CPagination>
    </>
  )
}

export default Tables
