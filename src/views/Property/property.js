import React, { useState, useEffect,useRef  } from "react";
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

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [searchProperty, setSearchProperty] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);
  const LIMIT = 10;

  const fetchProperties = async (page = 1, search = "") => {
    try {
      const response = await axios.post("http://44.196.64.110:8000/admin/allProoerty", {
        search: search,
        page: page,
        limit: LIMIT,
      });
      const result = await response.data;
      const formattedProperties = result.data.map(property => {
        const formattedStartDate = new Intl.DateTimeFormat('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }).format(new Date(property.startDate));
  
        const formattedEndDate = new Intl.DateTimeFormat('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }).format(new Date(property.endDate));
  
        return {
          ...property,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        };
      });
  
      // Update state with formatted data
      setProperties(formattedProperties);
      setTotalPages(result.totalPages);
      setCurrentPage(result.currentPage);
      setTotalProperties(result.total);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearchProperty = (e) => {
    setSearchProperty(e.target.value);
    fetchProperties(1, e.target.value);
  };

  const handleClear = () => {
    setSearchProperty("");
    fetchProperties(1, "");
  };

  const startIndex = (currentPage - 1) * LIMIT + 1;
  const endIndex = Math.min(currentPage * LIMIT, totalProperties);

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
                    style={{ width: "50PX", height: "auto" }}
                  />
                </CTableDataCell>
                <CTableDataCell>{property.propertyName}</CTableDataCell>
                <CTableDataCell>{property.location.address}</CTableDataCell>
                <CTableDataCell>{property.details.guestLimitPerDay}</CTableDataCell>
                <CTableDataCell>${property.details.guestPricePerDay}</CTableDataCell>
                <CTableDataCell>{property.startDate} to {property.startDate}</CTableDataCell>
              </CTableRow>
            ))
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
  );
};

export default PropertyManagement;
