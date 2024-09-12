import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react';
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const WidgetsDropdown = (props) => {
  const [data, setData] = useState({
    users: 0,
    revenue: {
      orderAmount: 0,
      subscriptionAmount: 0,
    },
    vendor: 0,
    bookings: 0,
    properties: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://3.111.163.2:3002/api/admin/dashboard');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={data.users}
          title="Users"
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="info"
          value={`$${data.revenue.orderAmount}`}
          title="Total Order Amount"
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="warning"
          value={`$${data.revenue.subscriptionAmount}`}
          title="Subscription Amount"
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="danger"
          value={data.vendor}
          title="Vendors"
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="success"
          value={data.bookings}
          title="Total Bookings"
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="secondary"
          value={data.properties}
          title="Active Properties"
        />
      </CCol>
      <CCol sm={12} xl={12} xxl={12}>
        <CDropdown alignment="end">
          <CDropdownToggle color="transparent" caret={false} className="text-dark">
            Quick Links
            <CIcon icon={cilOptions} />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem>View Bookings</CDropdownItem>
            <CDropdownItem>Manage Properties</CDropdownItem>
            <CDropdownItem>View Users</CDropdownItem>
            <CDropdownItem>Financial Reports</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CCol>
    </CRow>
  );
};

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
};

export default WidgetsDropdown;
