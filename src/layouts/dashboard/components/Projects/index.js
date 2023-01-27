/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// import { useState } from "react";
// import PropTypes from "prop-types";
// @mui material components
import Card from "@mui/material/Card";

// import Icon from "@mui/material/Icon";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import MDProgress from "../../../../components/MDProgress";

// Material Dashboard 2 React examples
import DataTable from "../../../../examples/Tables/DataTable";

// Data

function Projects(candiDatesData) {
  const columns = [
    { Header: "Name", accessor: "candidate", width: "45%", align: "left" },
    { Header: "Party", accessor: "party", align: "centre" },
    { Header: "Candidate rating", accessor: "candidate", align: "left" },
  ];

  function Candidate(name, index) {
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {index}
      </MDTypography>
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>;
  }
  function Party(name) {
    <MDTypography variant="caption" color="text" fontWeight="medium">
      {name}
    </MDTypography>;
  }

  function Completion(value) {
    <MDBox width="8rem" textAlign="left">
      <MDProgress value={value} color="info" variant="gradient" label={false} />
    </MDBox>;
  }

  const { candiArray } = candiDatesData;

  const rows = candiArray.map(({ candi }) => ({
    candidate: <Candidate name={candi.candidate_name} index={candi.candidate_id} />,
    party: <Party name={candi.party_name} />,
    completion: <Completion value={Math.floor(Math.random() * 100)} />,
  }));

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDTypography variant="h6" gutterBottom>
          Top candidates
        </MDTypography>
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}
Projects.defaultProps = {
  candiDatesData: [{ candidate_name: "Select Constituency", candidate_id: " ", party_name: " " }],
};

// Projects.propTypes = {
//   candiDatesData: PropTypes.arrayOf,
// };
export default Projects;
