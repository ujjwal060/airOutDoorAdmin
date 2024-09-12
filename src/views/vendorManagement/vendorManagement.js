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
import { faTrash, faEye, faEdit, faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import { FaTimes } from 'react-icons/fa';

// Static data for vendor requests
const staticVendorRequests = [
  { _id: "1", name: "Vendor A", email: "vendor.a@example.com", contactNumber: "123-456-7890", status: "pending" },
  { _id: "2", name: "Vendor B", email: "vendor.b@example.com", contactNumber: "987-654-3210", status: "pending" },
  // Add more static vendor requests here
];

const VendorManagement = () => {
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(staticVendorRequests);
  const [error, setError] = useState(null);
  const [searchUser, setSearchUser] = useState('');
  const [editMode, setEditMode] = useState(false);
  const searchUserRef = useRef(searchUser);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  const handleSearchUser = (e) => {
    const value = e.target.value;
    setSearchUser(value);
    searchUserRef.current = value;

    // Filter static data based on search input
    const filteredUsers = staticVendorRequests.filter(user =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const handleClear = () => {
    setSearchUser('');
    setUsers(staticVendorRequests);
  };

  const handleApprove = (id) => {
    setUsers(users.map(user =>
      user._id === id ? { ...user, status: "approved" } : user
    ));
    sendApprovalEmail(id); // Function to send email notification
  };

  const handleReject = (id) => {
    setUsers(users.map(user =>
      user._id === id ? { ...user, status: "rejected" } : user
    ));
  };

  const sendApprovalEmail = (id) => {
    // Placeholder function for sending email
    const user = users.find(user => user._id === id);
    alert(`Approval email sent to ${user.email}`);
    // Integrate with email service for real implementation
  };

  const handleEdit = () => {
    // Placeholder for actual edit logic
    setEditMode(true);
  };

  const handleSave = () => {
    // Placeholder for save logic
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handlePasswordReset = (email) => {
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <>
      {error && <CAlert color="danger">{error}</CAlert>}
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h3>Vendor Requests Management</h3>
          <CForm className="d-flex align-items-center" style={{ width: '12rem', marginLeft: 'auto' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <CFormInput
                type="text"
                placeholder="Search by Name"
                value={searchUser}
                onChange={handleSearchUser}
              />
              {searchUser && (
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
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Email</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Contact Number</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Status</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {users.map((user, index) => (
                <CTableRow key={user._id}>
                  <CTableHeaderCell scope="row" style={{ textAlign: "center" }}>{index + 1}</CTableHeaderCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    {user.name || "null"}
                  </CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    {user.email || "null"}
                  </CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    {user.contactNumber || "null"}
                  </CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    {user.status || "null"}
                  </CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    {user.status === "pending" && (
                      <>
                        <CButton size="sm" onClick={() => handleApprove(user._id)}>
                          <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
                        </CButton>
                        <CButton size="sm" onClick={() => handleReject(user._id)}>
                          <FontAwesomeIcon icon={faBan} style={{ color: "#fd2b2b" }} />
                        </CButton>
                      </>
                    )}
                    {user.status === "approved" && (
                      <CButton size="sm" disabled>
                        <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
                      </CButton>
                    )}
                    {user.status === "rejected" && (
                      <CButton size="sm" disabled>
                        <FontAwesomeIcon icon={faBan} style={{ color: "#fd2b2b" }} />
                      </CButton>
                    )}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)} closeButton>
          <CModalTitle>User Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CListGroup>
            <CListGroupItem><strong>Name: </strong> {selectedUser?.name}</CListGroupItem>
            <CListGroupItem><strong>Email: </strong> {selectedUser?.email}</CListGroupItem>
            <CListGroupItem><strong>Contact Number: </strong> {selectedUser?.contactNumber}</CListGroupItem>
            <CListGroupItem>
              <strong>Status: </strong> {selectedUser?.status}
            </CListGroupItem>
          </CListGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Edit Modal */}
      <CModal visible={editMode} onClose={() => setEditMode(false)}>
        <CModalHeader onClose={() => setEditMode(false)} closeButton>
          <CModalTitle>Edit User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* Placeholder form for editing */}
          <CForm>
            <CFormInput
              label="Name"
              defaultValue={selectedUser?.name}
            />
            <CFormInput
              label="Email"
              defaultValue={selectedUser?.email}
            />
            <CFormInput
              label="Contact Number"
              defaultValue={selectedUser?.contactNumber}
            />
            <CFormSelect
              label="Role"
              defaultValue={selectedUser?.role}
            >
              <option value="guest">Guest</option>
              <option value="vendor">Vendor</option>
              {/* Add other roles if necessary */}
            </CFormSelect>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEditMode(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={() => setEditMode(false)}>
            Save Changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default VendorManagement;
