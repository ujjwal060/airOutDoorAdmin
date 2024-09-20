import React, { useEffect, useState } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash} from '@fortawesome/free-solid-svg-icons';

const feedback = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    fetchMessage();
  }, []);

  const fetchMessage=async()=>{
    const response = await axios.get(`http://localhost:3002/api/getFeedback`);
    setMessage(response.data.data)
  };
 

  return (
    <div>
      <h3>Contact Us / Feedbacks</h3>

      <div className="tables-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div className="table" style={{ flex: '1', marginRight: '10px' }}>
          <h5>Contact Us</h5>
          <CTable className="table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>S.No</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>User Name</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>message</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Ratings</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {message.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan="5" style={{ textAlign: "center" }}>No Data</CTableDataCell>
                </CTableRow>
              ) : (
                message.map((specie, index) => (
                  <CTableRow key={specie._id}>
                    <CTableDataCell style={{ textAlign: "center" }}>{index + 1}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>{specie.username}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>{specie.comments || 'N/A'}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>{specie.rating}/5</CTableDataCell>
                    {/* <CTableDataCell style={{ textAlign: "center" }}>
                      <button
                        style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                        >
                        <FontAwesomeIcon icon={faTrash} style={{ color: "#fd2b2b", fontSize: '20px' }} />
                        </button>
                    </CTableDataCell> */}
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>
        </div>
      </div>
    </div>
  );
};

export default feedback;
