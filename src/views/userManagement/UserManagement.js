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
  CFormSelect,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye, faEdit, faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import { FaTimes } from 'react-icons/fa';

// Static data for users
const staticUsers = [
  { _id: "1", name: "John Doe", email: "john.doe@example.com", contactNumber: "123-456-7890", role: "guest", isActive: true },
  { _id: "2", name: "Jane Smith", email: "jane.smith@example.com", contactNumber: "987-654-3210", role: "vendor", isActive: false },
  // Add more static users here
];

const UserManagement = () => {
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(staticUsers);
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
    const filteredUsers = staticUsers.filter(user =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const handleClear = () => {
    setSearchUser('');
    setUsers(staticUsers);
  };

  const handleApprove = (id) => {
    setUsers(users.map(user =>
      user._id === id ? { ...user, isActive: true } : user
    ));
  };

  const handleDeactivate = (id) => {
    setUsers(users.map(user =>
      user._id === id ? { ...user, isActive: false } : user
    ));
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
          <h3>Manage Users</h3>
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
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Role</CTableHeaderCell>
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
                    {user.role || "null"}
                  </CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    <CButton size="sm" onClick={() => { setSelectedUser(user); setVisible(true); }}>
                      <FontAwesomeIcon icon={faEye} style={{ color: "grey", cursor: 'pointer', marginRight: '5px' }} />
                    </CButton>
                    <CButton size="sm" onClick={() => handleEdit(user._id)}>
                      <FontAwesomeIcon icon={faEdit} style={{ color: "blue", cursor: 'pointer', marginRight: '5px' }} />
                    </CButton>
                    {user.isActive ? (
                      <CButton size="sm" onClick={() => handleDeactivate(user._id)}>
                        <FontAwesomeIcon icon={faBan} style={{ color: "#fd2b2b" }} />
                      </CButton>
                    ) : (
                      <CButton size="sm" onClick={() => handleApprove(user._id)}>
                        <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
                      </CButton>
                    )}
                    <CButton size="sm" onClick={() => handleDelete(user._id)}>
                      <FontAwesomeIcon icon={faTrash} style={{ color: "#fd2b2b" }} />
                    </CButton>
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
              <strong>Role: </strong> {selectedUser?.role}
            </CListGroupItem>
            <CListGroupItem>
              <strong>Status: </strong> {selectedUser?.isActive ? 'Active' : 'Inactive'}
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
          <CButton color="secondary" onClick={handleCancel}>
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

export default UserManagement;
