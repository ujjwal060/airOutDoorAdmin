import React, { useState, useEffect } from "react";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CPagination,
  CPaginationItem,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import axios from "axios";

const PropertyManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const LIMIT = 10;

  const fetchUsers = async (page = 1, search = "") => {
    try {
      const response = await axios.post("http://44.196.64.110:8000/admin/alluser", {
        search: search,
        page: page,
        limit: LIMIT,
      });
      const result = await response.data;
      setUsers(result.users);
      setTotalPages(result.totalPages);
      setCurrentPage(result.currentPage);
      setTotalUsers(result.totalUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchUser = (e) => {
    setSearchUser(e.target.value);
    fetchUsers(1, e.target.value);
  };

  const handleClear = () => {
    setSearchUser("");
    fetchUsers(1, "");
  };

  const handleViewUser = (user) => {
    setSelectedUser(user); // Set the selected user data
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const startIndex = (currentPage - 1) * LIMIT + 1;
  const endIndex = Math.min(currentPage * LIMIT, totalUsers);

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          value={searchUser}
          onChange={handleSearchUser}
          placeholder="Search by Name"
        />
        {searchUser && <button onClick={handleClear}>Clear</button>}
      </div>

      <CTable responsive striped hover bordered>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>S.No</CTableHeaderCell>
            <CTableHeaderCell>Full Name</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Username</CTableHeaderCell>
            <CTableHeaderCell>Mobile Number</CTableHeaderCell>
            <CTableHeaderCell>View</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan="6" className="text-center">
                No data
              </CTableDataCell>
            </CTableRow>
          ) : (
            users.map((user, index) => (
              <CTableRow key={user._id}>
                <CTableDataCell>{startIndex + index}</CTableDataCell>
                <CTableDataCell>{user.fullName}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.username}</CTableDataCell>
                <CTableDataCell>{user.mobileNumber}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="primary"
                    onClick={() => handleViewUser(user)}
                  >
                    View
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))
          )}
        </CTableBody>
      </CTable>

      <div className="pagination">
        <div className="total-users">Total Users: {totalUsers}</div>
        <div className="pagination-controls">
          <CPagination aria-label="Page navigation example">
            <CPaginationItem
              onClick={() => fetchUsers(currentPage - 1, searchUser)}
              disabled={currentPage === 1}
            >
              &lt;
            </CPaginationItem>
            <div className="pagination-info">
              {startIndex}-{endIndex}
            </div>
            <CPaginationItem
              onClick={() => fetchUsers(currentPage + 1, searchUser)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </CPaginationItem>
          </CPagination>
        </div>
      </div>

      {/* Modal for showing user details */}
      {selectedUser && (
        <CModal visible={showModal} onClose={handleCloseModal}>
          <CModalHeader>
            <CModalTitle>User Details</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p><strong>Full Name:</strong> {selectedUser.fullName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <p><strong>Mobile Number:</strong> {selectedUser.mobileNumber}</p>
            <p><strong>User Type:</strong> {selectedUser.userType}</p>
            <p><strong>Terms Accepted:</strong> {selectedUser.termsAccepted ? "Yes" : "No"}</p>
            <p><strong>SMS Consent:</strong> {selectedUser.smsConsent ? "Yes" : "No"}</p>
            <p><strong>Verified:</strong> {selectedUser.isVerified ? "Yes" : "No"}</p>
            <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(selectedUser.updatedAt).toLocaleString()}</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={handleCloseModal}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}

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

        .total-users {
          display: flex;
          justify-content: flex-end;
          margin-right: 20px;
        }
      `}</style>
    </>
  );
};

export default PropertyManagement;
