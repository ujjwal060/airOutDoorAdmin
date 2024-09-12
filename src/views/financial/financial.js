import React, { useState } from "react";
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
  CAlert,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CListGroup,
  CListGroupItem,
  CForm,
  CFormInput,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faCog, faMoneyBill } from "@fortawesome/free-solid-svg-icons";

// Static data for financial reports
const staticReports = {
  totalRevenue: 50000,
  vendorPayouts: [
    { vendor: "Vendor A", amount: 2000, date: "2024-09-10" },
    { vendor: "Vendor B", amount: 1500, date: "2024-09-11" },
  ],
  transactions: [
    { transactionId: "TX12345", amount: 3000, date: "2024-09-12", status: "Completed" },
    { transactionId: "TX12346", amount: 2000, date: "2024-09-13", status: "Pending" },
  ],
};

const FinancialManagement = () => {
  const [visible, setVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [error, setError] = useState(null);

  const handleDownloadReport = () => {
    // Placeholder for generating and downloading reports
    alert("Download report functionality not implemented");
  };

  const handleManageGateways = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {error && <CAlert color="danger">{error}</CAlert>}
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h3>Financial Management</h3>
          <div className="d-flex">
            <CButton color="primary" className="me-2" onClick={handleDownloadReport}>
              <FontAwesomeIcon icon={faDownload} /> Download Reports
            </CButton>
            <CButton color="secondary" onClick={handleManageGateways}>
              <FontAwesomeIcon icon={faCog} /> Manage Payment Gateways
            </CButton>
          </div>
        </CCardHeader>

        <CCardBody>
          <h5>Total Revenue: ${staticReports.totalRevenue}</h5>

          <h6 className="mt-4">Vendor Payouts</h6>
          <CTable responsive striped hover bordered>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Vendor</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Amount</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Date</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {staticReports.vendorPayouts.map((payout, index) => (
                <CTableRow key={index}>
                  <CTableDataCell style={{ textAlign: "center" }}>{payout.vendor}</CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>${payout.amount}</CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>{payout.date}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          <h6 className="mt-4">Transaction History</h6>
          <CTable responsive striped hover bordered>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Transaction ID</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Amount</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Date</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {staticReports.transactions.map((transaction, index) => (
                <CTableRow key={index}>
                  <CTableDataCell style={{ textAlign: "center" }}>{transaction.transactionId}</CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>${transaction.amount}</CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>{transaction.date}</CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>{transaction.status}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Manage Payment Gateways Modal */}
      <CModal visible={visible} onClose={handleClose}>
        <CModalHeader onClose={handleClose} closeButton>
          <CModalTitle>Manage Payment Gateways</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              label="Payment Gateway API Key"
              placeholder="Enter API Key"
              className="mb-3"
            />
            <CFormInput
              type="text"
              label="Payment Gateway Secret"
              placeholder="Enter Secret"
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleClose}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={() => alert("Payment gateway settings saved!")}>
            Save Changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default FinancialManagement;
