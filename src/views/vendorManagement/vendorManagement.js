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
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const VendorManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const LIMIT = 10;

  const fetchUsers = async (page = 1, search = "") => {
    try {
      const response = await axios.post("http://3.111.163.2:8000/admin/getVendor", {
        search: search,
        page: page,
        limit: LIMIT,
      });
      const result = await response.data;

      setUsers(result.vendors);
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

  const handleApprove = async (id) => {
    try {
      await axios.post("http://3.111.163.2:8000/admin/verify", {
        vendorId: id,
        status: "approved",
      });
      fetchUsers(currentPage, searchUser); 
    } catch (error) {
      console.error("Error approving vendor:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      console.log(id);
      
      await axios.post("http://3.111.163.2:8000/admin/verify", {
        vendorId: id,
        status: "rejected",
      });
      fetchUsers(currentPage, searchUser); 
    } catch (error) {
      console.error("Error rejecting vendor:", error);
    }
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
        {searchUser && <FaTimes onClick={handleClear} />}
      </div>

      <CTable responsive striped hover bordered>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>S.No</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Contact Number</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            <CTableHeaderCell>Action</CTableHeaderCell>
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
                <CTableDataCell>{user.name}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.phone}</CTableDataCell>
                <CTableDataCell>{user.status}</CTableDataCell>
                <CTableDataCell>
                  {user.status === "pending" && (
                    <>
                      <CButton onClick={() => handleApprove(user.vendorId)}>
                        <FontAwesomeIcon icon={faCheck} />
                      </CButton>
                      <CButton onClick={() => handleReject(user.vendorId)}>
                        <FontAwesomeIcon icon={faBan} />
                      </CButton>
                    </>
                  )}
                </CTableDataCell>
              </CTableRow>
            ))
          )}
        </CTableBody>
      </CTable>

      <div className="pagination">
        <div className="total-users">Total : {totalUsers}</div>
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

export default VendorManagement;
