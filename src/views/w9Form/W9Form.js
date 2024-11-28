import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilChevronLeft, cilChevronRight } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const W9Form = () => {
  const navigate = useNavigate()

  const [payoutData, setPayoutData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const vendorId = localStorage.getItem('vendorId')
    const fetchPayoutData = async () => {
      try {
        const response = await axios.get(`http://44.196.64.110:8000/pdf/get`)
        console.log(response.data.data)

        setPayoutData(response.data.data)
        setLoading(false)
      } catch (error) {
        setError('Failed to fetch data')
        setLoading(false)
      }
    }

    fetchPayoutData()
  }, [])

  const totalPages = Math.ceil(payoutData.length / itemsPerPage)

  const handleW9Click = () => {
    navigate('/w9')
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = payoutData.slice(startIndex, startIndex + itemsPerPage)

  const handleViewClick = (pdfLink) => {
    window.open(pdfLink, '_blank')
  }

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between">
        <h4>W9 Form Vendor Details</h4>
      </CCardHeader>
      <CCardBody>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <CTable striped bordered hover responsive>
              <thead>
                <CTableRow>
                  <CTableHeaderCell>S.No</CTableHeaderCell>
                  <CTableHeaderCell>Vendor ID</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Date</CTableHeaderCell>
                  <CTableHeaderCell className=" d-flex justify-content-center">
                    W9 Information
                  </CTableHeaderCell>
                </CTableRow>
              </thead>
              <CTableBody>
                {currentItems.map((item, index) => (
                  <CTableRow key={item._id}>
                    <CTableDataCell>{startIndex + index + 1}</CTableDataCell>
                    <CTableDataCell>{item.vendorId}</CTableDataCell>
                    <CTableDataCell>{item.vendorName}</CTableDataCell>
                    <CTableDataCell>{new Date(item.date).toLocaleDateString()}</CTableDataCell>{' '}
                    {/* Format date */}
                    <CTableDataCell className=" d-flex justify-content-center">
                      <CButton color="warning" onClick={() => handleViewClick(item.pdfLink)}>
                        View
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            {/* Centered Pagination controls */}
            <CPagination aria-label="Page navigation" className="justify-content-center">
              <CPaginationItem onClick={handlePreviousPage} disabled={currentPage === 1}>
                <CIcon icon={cilChevronLeft} />
              </CPaginationItem>

              <CPaginationItem active>{currentPage}</CPaginationItem>

              <CPaginationItem onClick={handleNextPage} disabled={currentPage === totalPages}>
                <CIcon icon={cilChevronRight} />
              </CPaginationItem>
            </CPagination>
          </>
        )}
      </CCardBody>
    </CCard>
  )
}

export default W9Form
