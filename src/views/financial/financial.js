import React, { useState, useEffect } from "react";
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
} from "@coreui/react";

const FinancialManagement = () => {
  const [vendorsData, setVendorsData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    const fetchVendorsData = async () => {
      try {
        const response = await fetch("http://44.196.192.232:8000/payouts/getAll");
        const data = await response.json();
        

        if (data.status === 200) {
          setVendorsData(data.data);
        } else {
          console.error("Failed to fetch data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching vendors data:", error);
      }
    };

    fetchVendorsData();
  }, []);

  const handleViewPayouts = (vendor) => {
    setSelectedVendor(vendor);
    setVisible(true);
  };

  const handlePayout = (vendor) => {
    alert(`Processing payout for ${vendor.vendorName}`);
  };

  const handleClose = () => {
    setVisible(false);
    setSelectedVendor(null);
  };

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h3>Financial Management</h3>
        </CCardHeader>

        <CCardBody>
          <h5>Vendors</h5>

          <CTable responsive striped hover bordered>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                  Vendor ID
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                  Vendor Name
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                  Remaining Amount
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                  Contact
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                  Actions
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {vendorsData.length > 0 ? (
                vendorsData.map((vendor) => (
                  <CTableRow key={vendor._id}>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      {vendor.vendorId}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      {vendor.vendorName}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      ${vendor.remainingAmount}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      {vendor.vendorContact}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      <CButton color="info" onClick={() => handleViewPayouts(vendor)}>
                        View
                      </CButton>{" "}
                      <CButton color="primary" onClick={() => handlePayout(vendor)}>
                        Payout
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan="5" style={{ textAlign: "center" }}>
                    No vendors found
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CModal visible={visible} onClose={handleClose}>
        <CModalHeader onClose={handleClose} closeButton>
          <CModalTitle>Payouts for {selectedVendor?.vendorName}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedVendor?.payouts.length > 0 ? (
            <CTable responsive striped hover bordered>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                    Amount
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                    Date
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {selectedVendor.payouts.map((payout, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      ${payout.amount}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      {payout.date}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          ) : (
            <p>No payouts available for this vendor.</p>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleClose}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default FinancialManagement;
