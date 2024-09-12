import React, { useState,useRef  } from "react";
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
  CFormSelect,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import { FaTimes } from 'react-icons/fa';

// Static data for properties
const staticProperties = [
  { _id: "1", name: "Property A", location: "Location A", price: "$1000", status: "pending" },
  { _id: "2", name: "Property B", location: "Location B", price: "$1500", status: "pending" },
  // Add more static properties here
];

const PropertyManagement = () => {
  const [visible, setVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState(staticProperties);
  const [error, setError] = useState(null);
  const [searchProperty, setSearchProperty] = useState('');
  const searchPropertyRef = useRef(searchProperty);

  const handleDelete = (id) => {
    setProperties(properties.filter((property) => property._id !== id));
  };

  const handleSearchProperty = (e) => {
    const value = e.target.value;
    setSearchProperty(value);
    searchPropertyRef.current = value;

    // Filter static data based on search input
    const filteredProperties = staticProperties.filter(property =>
      property.name.toLowerCase().includes(value.toLowerCase())
    );
    setProperties(filteredProperties);
  };

  const handleClear = () => {
    setSearchProperty('');
    setProperties(staticProperties);
  };

  const handleApprove = (id) => {
    setProperties(properties.map(property =>
      property._id === id ? { ...property, status: "approved" } : property
    ));
  };

  const handleReject = (id) => {
    setProperties(properties.map(property =>
      property._id === id ? { ...property, status: "rejected" } : property
    ));
  };

  const handleEdit = () => {
    // Placeholder for actual edit logic
    setVisible(true);
  };

  const handleSave = () => {
    // Placeholder for save logic
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      {error && <CAlert color="danger">{error}</CAlert>}
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h3>Property Management</h3>
          <CForm className="d-flex align-items-center" style={{ width: '12rem', marginLeft: 'auto' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <CFormInput
                type="text"
                placeholder="Search by Name"
                value={searchProperty}
                onChange={handleSearchProperty}
              />
              {searchProperty && (
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
                  <FaTimes size={16} />
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
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Name</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Location</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Price</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Status</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {properties.map((property, index) => (
                <CTableRow key={property._id}>
                  <CTableHeaderCell scope="row" style={{ textAlign: "center" }}>{index + 1}</CTableHeaderCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    {property.name || "null"}
                  </CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    {property.location || "null"}
                  </CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    {property.price || "null"}
                  </CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    {property.status || "null"}
                  </CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    {property.status === "pending" && (
                      <>
                        <CButton size="sm" onClick={() => handleApprove(property._id)}>
                          <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
                        </CButton>
                        <CButton size="sm" onClick={() => handleReject(property._id)}>
                          <FontAwesomeIcon icon={faBan} style={{ color: "#fd2b2b" }} />
                        </CButton>
                      </>
                    )}
                    {property.status === "approved" && (
                      <CButton size="sm" disabled>
                        <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
                      </CButton>
                    )}
                    {property.status === "rejected" && (
                      <CButton size="sm" disabled>
                        <FontAwesomeIcon icon={faBan} style={{ color: "#fd2b2b" }} />
                      </CButton>
                    )}
                    <CButton size="sm" onClick={() => { setSelectedProperty(property); handleEdit(); }}>
                      <FontAwesomeIcon icon={faEdit} />
                    </CButton>
                    <CButton size="sm" onClick={() => handleDelete(property._id)}>
                      <FontAwesomeIcon icon={faTrash} style={{ color: "#fd2b2b" }} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Edit Modal */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)} closeButton>
          <CModalTitle>Edit Property</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* Placeholder form for editing */}
          <CForm>
            <CFormInput
              label="Name"
              defaultValue={selectedProperty?.name}
            />
            <CFormInput
              label="Location"
              defaultValue={selectedProperty?.location}
            />
            <CFormInput
              label="Price"
              defaultValue={selectedProperty?.price}
            />
            <CFormSelect
              label="Status"
              defaultValue={selectedProperty?.status}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              {/* Add other statuses if necessary */}
            </CFormSelect>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={() => handleSave()}>
            Save Changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default PropertyManagement;
