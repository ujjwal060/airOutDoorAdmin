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
  CPagination,CPaginationItem,
} from '@coreui/react'
import { FaTimes, FaEye } from 'react-icons/fa'

import axios from 'axios'

const PropertyManagement = () => {
  const [properties, setProperties] = useState([])
  const [searchProperty, setSearchProperty] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const [detailsModal, setDetailsModal] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [totalProperties, setTotalProperties] = useState(0)
  const LIMIT = 10

  const fetchProperties = async (page = 1, search = '') => {
    try {
      const response = await axios.post('http://44.196.64.110:8000/admin/allProoerty', {
        search: search,
        page: page,
        limit: LIMIT,
      })
      const result = await response.data
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
            <CTableHeaderCell>Guest Limit</CTableHeaderCell>
            <CTableHeaderCell>Guest Pricing</CTableHeaderCell>
            <CTableHeaderCell>Availability</CTableHeaderCell>
            <CTableHeaderCell>Details</CTableHeaderCell>
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
                <CTableDataCell>{property.details.guestLimitPerDay}</CTableDataCell>
                <CTableDataCell>${property.details.guestPricePerDay}</CTableDataCell>
                <CTableDataCell>
                  {property.startDate} to {property.startDate}
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="primary" onClick={() => handleViewDetails(property)}>
                    <FaEye />
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

                {/* Acreage */}
                <p>
                  <strong>Acreage:</strong> {selectedProperty.details.acreage}
                </p>

                {/* Guest Details */}
                <p>
                  <strong>Guest Limit Per Day:</strong> {selectedProperty.details.guestLimitPerDay}
                </p>
                <p>
                  <strong>Guest Price Per Day:</strong> ${selectedProperty.details.guestPricePerDay}
                </p>

                {/* Guided Hunt */}
                <p>
                  <strong>Guided Hunt:</strong> {selectedProperty.details.guidedHunt}
                </p>

                {/* Lodging */}
                <p>
                  <strong>Lodging:</strong> {selectedProperty.details.lodging}
                </p>

                {/* Shooting Range */}
                <p>
                  <strong>Shooting Range:</strong> {selectedProperty.details.shootingRange}
                </p>

                {/* Optional Extended Details */}
                <p>
                  <strong>Optional Extended Details:</strong>{' '}
                  {selectedProperty.details.optionalExtendedDetails}
                </p>

                {/* Price Range */}
                <p>
                  <strong>Price Range:</strong> ${selectedProperty.priceRange.min} - $
                  {selectedProperty.priceRange.max}
                </p>

                {/* Price Per Group Size */}
                <p>
                  <strong>Price Per Group Size:</strong>
                  {selectedProperty.pricePerGroupSize.groupPrice
                    ? `$${selectedProperty.pricePerGroupSize.groupPrice} for ${selectedProperty.pricePerGroupSize.groupSize} guests`
                    : `N/A`}
                </p>

                {/* Instant Booking */}
                <p>
                  <strong>Instant Booking:</strong>{' '}
                  {selectedProperty.details.instantBooking ? 'Yes' : 'No'}
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
