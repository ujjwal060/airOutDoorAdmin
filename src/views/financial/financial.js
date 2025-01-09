import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CPagination,
} from "@coreui/react";
import { toast } from "react-toastify";
import axios from "axios";

const FinancialManagement = () => {
  const [vendorsData, setVendorsData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchVendorsData();
  }, []);

  const handleViewPayouts = (vendor) => {
    setSelectedVendor(vendor);
    setVisible(true);
    setCurrentPage(1);
  };

  const fetchVendorsData = async () => {
    try {
      const response = await fetch("http://44.196.64.110:8000/payouts/getAll");
      const data = await response.json();
      if (data.status === 200 && Array.isArray(data.data.allPay)) {
        setVendorsData(data.data.allPay);
      } else {
        toast.error(`Failed to fetch data: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Error fetching vendors data: ${error.message}`);
    }
  };

  const handleApprove = async (vendorid, requestid) => {
    try {
      const response = await axios.post("http://44.196.64.110:8000/payouts/approvePayout", {
        payoutRequestId: requestid,
        vendorId: vendorid,
      });

      if (response.status === 200) {
        toast.success("Cashout request approved!");
  
        const updatedRequests = selectedVendor.cashoutRequests.map((request) => {
          if (request._id === requestid) {
            return { ...request, status: "paid" };
          }
          return request;
        });
  
        setSelectedVendor((prev) => ({
          ...prev,
          cashoutRequests: updatedRequests,
        }));
        fetchVendorsData();
      }
    } catch (error) {
      toast.error(`Error approving request: ${error.message}`);
    }
  };

  const handleClose = () => {
    setVisible(false)
    setSelectedVendor(null)
  }

  const sortedVendorsData = vendorsData.sort((a, b) => {
    const aHasPendingRequest = a.cashoutRequests?.some(
      (request) => request.status === "pending"
    );
    const bHasPendingRequest = b.cashoutRequests?.some(
      (request) => request.status === "pending"
    );
    return aHasPendingRequest && !bHasPendingRequest ? -1 : bHasPendingRequest && !aHasPendingRequest ? 1 : 0;
  });

  const indexOfLastRequest = currentPage * itemsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
  const currentRequests = selectedVendor
    ? selectedVendor.cashoutRequests?.slice(indexOfFirstRequest, indexOfLastRequest) || []
    : [];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h3>Financial Management</h3>
          {/* {totalExp && <h5 style={{ color: 'blue' }}>Total Expense:${totalExp}</h5>} */}
        </CCardHeader>

        <CCardBody>
          <h5>Vendors</h5>

          <CTable responsive striped hover bordered>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                  Vendor ID
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                  Vendor Name
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                  Remaining Amount
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                  Contact
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                  Status
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                  Actions
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {sortedVendorsData.length > 0 ? (
                sortedVendorsData.map((vendor) => {
                  const hasPendingRequest = vendor.cashoutRequests?.some(
                    (request) => request.status === "pending"
                  );
                  return (
                    <CTableRow
                      key={vendor._id}
                      style={{
                        backgroundColor: hasPendingRequest ? '#f8d7da' : '', // Highlight the row with a background color
                      }}
                    >
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        {vendor.vendorId}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        {vendor.vendorName}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        ${vendor.remainingAmount}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        {vendor.vendorContact}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        {hasPendingRequest ? (
                          <span style={{ color: 'red', fontWeight: 'bold' }}>Request Received</span>
                        ) : (
                          'No Requests'
                        )}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        <CButton
                          color="info"
                          onClick={() => handleViewPayouts(vendor)}
                          className="ms-2"
                        >
                          View
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan="6" style={{ textAlign: 'center' }}>
                    No vendors found
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CModal visible={visible} onClose={handleClose} size="lg">
        <CModalHeader onClose={handleClose} closeButton>
          <CModalTitle>Payout Requests for {selectedVendor?.vendorName}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedVendor?.cashoutRequests?.length > 0 ? (
            <>
              <CTable responsive striped hover bordered>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                      Remaining
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                      Amount Requested
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                      Commission
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                      Request Date
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                      Status
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                      Payment Date
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                      Actions
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentRequests.map((request, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell style={{ textAlign: "center" }}>
                        ${request.remainingAmount}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: "center" }}>
                        ${request.amountRequested}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: "center" }}>
                        ${request.adminCommissionDeducted}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: "center" }}>
                        {new Date(request.requestDate).toLocaleDateString()}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        {request.status}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        {request.paymentDate
                          ? new Date(request.paymentDate).toLocaleDateString()
                          : "-- -- --"}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: "center" }}>
                        {request.status === "pending" ? (
                          <CButton
                            color="success"
                            onClick={() => handleApprove(selectedVendor.vendorId, request._id)}
                          >
                            Approve
                          </CButton>
                        ) : request.status === "paid" ? (
                          <span style={{ color: "green", fontWeight: "bold" }}>Success</span>
                        ) : (
                          <span style={{ color: "gray" }}>Processed</span>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <CPagination
                activePage={currentPage}
                pages={Math.ceil(selectedVendor.cashoutRequests?.length / itemsPerPage)}
                onActivePageChange={handlePageChange}
              />
            </>
          ) : (
            <p>No payout requests found for this vendor.</p>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleClose}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default FinancialManagement
