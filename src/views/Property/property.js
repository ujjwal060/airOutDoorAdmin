import React, { useState, useEffect, useRef } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CButton,
  CPagination,
  CPaginationItem,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import { FaTimes, FaEye } from 'react-icons/fa'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

const PropertyManagement = () => {
  const [properties, setProperties] = useState([])
  const [searchProperty, setSearchProperty] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const [detailsModal, setDetailsModal] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [totalProperties, setTotalProperties] = useState(0)
  const LIMIT = 10
  const [inputModal, setInputModal] = useState(false)
  const [approvalPropertyId, setApprovalPropertyId] = useState(null)
  const [formData, setFormData] = useState({
    commisionPercent: null,
    dropdownValue: '',
  })

  // Handle input field change
  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      commisionPercent: e.target.value,
    }))
  }

  // Handle dropdown change
  const handleDropdownChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      dropdownValue: e.target.value,
    }))
  }

  const fetchProperties = async (page = 1, search = '') => {
    try {
      const response = await axios.post('http://44.196.64.110:8000/admin/allProoerty', {
        search: search,
        page: page,
        limit: LIMIT,
      })
      const result = await response.data
      console.log(result)
      const formattedProperties = result.data.map((property) => {
        const formattedStartDate = new Intl.DateTimeFormat('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }).format(new Date(property.startDate))

        const formattedEndDate = new Intl.DateTimeFormat('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }).format(new Date(property.endDate))

        return {
          ...property,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        }
      })

      // Update state with formatted data
      setProperties(formattedProperties)
      setTotalPages(result.totalPages)
      setCurrentPage(result.currentPage)
      setTotalProperties(result.total)
    } catch (error) {
      console.error('Error fetching properties:', error)
    }
  }
  const handleCommissionApproval = async () => {
    try {
      const dataToSubmit = { ...formData, approvalPropertyId }
      if (parseFloat(dataToSubmit.commisionPercent) > 100) {
        toast.warn('Commission Percentage should be less than or equal to 100%')
        return
      }
      const approvalData = await axios.patch(
        'http://44.196.64.110:8000/property/commission-approve',
        dataToSubmit,
      )
      setFormData({ commisionPercent: null, dropdownValue: '' })
      toast.success(approvalData.data.message)
      console.log('into commissional submission', approvalData)
      setInputModal(false)
      fetchProperties()
    } catch (error) {
      console.log(error.response)
      toast.error(error?.response?.data?.message)
    }
  }
  const handleApprovalAction = (property) => {
    setApprovalPropertyId(property._id)
    setInputModal(true)
  }
  const handleViewDetails = (property) => {
    setSelectedProperty(property)
    setDetailsModal(true)
  }
  useEffect(() => {
    fetchProperties()
  }, [])

  const handleSearchProperty = (e) => {
    setSearchProperty(e.target.value)
    fetchProperties(1, e.target.value)
  }

  const handleClear = () => {
    setSearchProperty('')
    fetchProperties(1, '')
  }

  const startIndex = (currentPage - 1) * LIMIT + 1
  const endIndex = Math.min(currentPage * LIMIT, totalProperties)

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <div className="search-container">
        <input
          type="text"
          value={searchProperty}
          onChange={handleSearchProperty}
          placeholder="Search by Name"
        />
        {searchProperty && <FaTimes onClick={handleClear} />}
      </div>

      <CTable responsive striped hover bordered>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>S.No</CTableHeaderCell>
            <CTableHeaderCell>Image</CTableHeaderCell> {/* New Image Column */}
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>location</CTableHeaderCell>
            <CTableHeaderCell>Availability</CTableHeaderCell>
            <CTableHeaderCell>Details</CTableHeaderCell>
            <CTableHeaderCell>Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {properties.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan="8" className="text-center">
                No data
              </CTableDataCell>
            </CTableRow>
          ) : (
            properties?.map((property, index) => (
              <CTableRow key={property._id}>
                <CTableDataCell>{startIndex + index}</CTableDataCell>
                <CTableDataCell>
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    style={{ width: '50PX', height: 'auto' }}
                  />
                </CTableDataCell>
                <CTableDataCell>{property.propertyName}</CTableDataCell>
                <CTableDataCell>{property.location.address}</CTableDataCell>
                <CTableDataCell>
                  {property.startDate} to {property.startDate}
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="primary" onClick={() => handleViewDetails(property)}>
                    <FaEye />
                  </CButton>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    disabled={property?.isApproveByAdmin}
                    color={!property?.isApproveByAdmin ? 'warning' : 'success'}
                    onClick={() => handleApprovalAction(property)}
                  >
                    {property?.isApproveByAdmin ? 'Approved' : 'Approve'}
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))
          )}
          {selectedProperty && (
            <CModal
              visible={detailsModal}
              // style={{ marginTop: '50px', zIndex: 9999 }}
              onClose={() => setDetailsModal(false)}
            >
              <CModalHeader>
                <CModalTitle>Property Details</CModalTitle>
              </CModalHeader>
              <CModalBody>
                {/* Property Name and Nickname */}
                <p>
                  <strong>Property Name:</strong> {selectedProperty.propertyName}
                </p>
                <p>
                  <strong>Property Nickname:</strong> {selectedProperty.propertyNickname}
                </p>

                {/* Description */}
                <p>
                  <strong>Description:</strong> {selectedProperty.propertyDescription}
                </p>

                {/* Price Range */}
                <p>
                  <strong>Price Range:</strong> ${selectedProperty.priceRange.min} - $
                  {selectedProperty.priceRange.max}
                </p>

                {/* Address */}
                <p>
                  <strong>Address:</strong> {selectedProperty.location.address}
                </p>

                {/* Coordinates */}
                <p>
                  <strong>Coordinates:</strong> Latitude: {selectedProperty.location.latitude},
                  Longitude: {selectedProperty.location.longitude}
                </p>

                {/* Vendor ID */}
                <p>
                  <strong>Vendor ID:</strong> {selectedProperty.vendorId}
                </p>

                {/* Category */}
                <p>
                  <strong>Category:</strong> {selectedProperty.category}
                </p>

                {/* Images */}
                <div>
                  <strong>Images:</strong>
                  <div
                    style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}
                  >
                    {selectedProperty.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`Property image ${idx + 1}`}
                        style={{
                          width: '100px',
                          height: 'auto',
                          borderRadius: '5px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <p>
                  <strong>Start Date:</strong>{' '}
                  {new Date(selectedProperty.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{' '}
                  {new Date(selectedProperty.endDate).toLocaleDateString()}
                </p>

                {/* Approval */}
                <p>
                  <strong>Approved by Admin:</strong>{' '}
                  {selectedProperty.isApproveByAdmin ? 'Yes' : 'No'}
                </p>

                {/* Favorite */}
                <p>
                  <strong>Favorite:</strong> {selectedProperty.isFavorite ? 'Yes' : 'No'}
                </p>

                {/* Created At */}
                <p>
                  <strong>Created At:</strong>{' '}
                  {new Date(selectedProperty.createdAt).toLocaleString()}
                </p>
              </CModalBody>

              <CModalFooter>
                <CButton color="secondary" onClick={() => setDetailsModal(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
          )}
          <CModal visible={inputModal} onClose={() => setInputModal(false)}>
            <CModalHeader>
              <CModalTitle>Please fill Commission and Approval</CModalTitle>
            </CModalHeader>
            <CModalBody>
              {/* Input field */}
              <div className="mb-3">
                <CFormLabel htmlFor="commisionPercent">
                  Enter Commission for this Property
                </CFormLabel>
                <CFormInput
                  type="number"
                  id="commisionPercent"
                  value={formData.commisionPercent}
                  onChange={handleInputChange}
                  placeholder="Commission Percentage"
                />
              </div>

              {/* Dropdown field */}
              <div className="mb-3">
                <CFormLabel htmlFor="dropdown">Approve</CFormLabel>
                <CFormSelect
                  id="dropdown"
                  value={formData.dropdownValue}
                  onChange={handleDropdownChange}
                >
                  <option value="">Select an option</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </CFormSelect>
              </div>
            </CModalBody>
            <CModalFooter>
              <CButton color="primary" onClick={handleCommissionApproval}>
                Submit
              </CButton>
              <CButton color="secondary" onClick={() => setInputModal(false)}>
                Close
              </CButton>
            </CModalFooter>
          </CModal>
        </CTableBody>
      </CTable>

      <div className="pagination">
        <div className="total-properties">Total : {totalProperties}</div>
        <div className="pagination-controls">
          <CPagination aria-label="Page navigation example">
            <CPaginationItem
              onClick={() => fetchProperties(currentPage - 1, searchProperty)}
              disabled={currentPage === 1}
            >
              &lt;
            </CPaginationItem>
            <div className="pagination-info">
              {startIndex}-{endIndex}
            </div>
            <CPaginationItem
              onClick={() => fetchProperties(currentPage + 1, searchProperty)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </CPaginationItem>
          </CPagination>
        </div>
      </div>

      <style jsx>{`
        .search-container {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }

        .pagination {
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
        }

        .pagination-info {
          margin-right: 10px;
        }

        .pagination-controls {
          display: flex;
          align-items: center;
        }

        .total-properties {
          display: flex;
          justify-content: flex-end;
          margin-right: 20px;
        }
      `}</style>
    </>
  )
}

export default PropertyManagement
