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
import { useState, useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import { DataGrid } from "@mui/x-data-grid";
import { List, ListItem, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MDButton from "components/MDButton";
import MDTypography from "../../components/MDTypography";
// import MDProgress from "../../components/MDProgress";
// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
// import Footer from "../../examples/Footer";
// import ReportsBarChart from "../../examples/Charts/BarCharts/ReportsBarChart";
import ComplexStatisticsCard from "../../examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
// import reportsBarChartData from "./data/reportsBarChartData";

// Dashboard components
// import Projects from "./components/Projects";
// import OrdersOverview from "./components/OrdersOverview";

import DefaultLineChart from "../../examples/Charts/LineCharts/DefaultLineChart";
// import PolarChart from "../../examples/Charts/PolarChart";
// Material Dashboard 2 React Examples
import PieChart from "../../examples/Charts/PieChart";
// import DataTable from "../../examples/Tables/DataTable";

// import SimpleBlogCard from "../../examples/Cards/BlogCards/SimpleBlogCard";
// function Candidate(name, index) {
//   return (
//     <MDBox display="flex" alignItems="center" lineHeight={1}>
//       <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
//         {index}
//       </MDTypography>
//       <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
//         {name}
//       </MDTypography>
//     </MDBox>
//   );
// }
// function Party(name) {
//   return (
//     <MDTypography variant="caption" color="text" fontWeight="medium">
//       {name}
//     </MDTypography>
//   );
// }

// function Completion(value) {
//   return (
//     <MDBox width="8rem" textAlign="left">
//       <MDProgress value={value} color="info" variant="gradient" label={false} />
//     </MDBox>
//   );
// }
function Dashboard() {
  const [assemblyList, setAssemblyList] = useState([]);
  const [menu, setMenu] = useState(null);
  const [currentAssembly, setCurrentAssembly] = useState("");
  const [currentAssemblyId, setCurrentAssemblyId] = useState(null);
  const [assemblyFactorsData, setAssemblyFactorsData] = useState([]);
  const [candidateData, setCandidateData] = useState([]);
  const [casteData, setCasteData] = useState([]);
  const [seatCategory, setSeatcategory] = useState("");
  const [seatStatus, setSeatStatus] = useState("");
  const [booths, setBooths] = useState("");
  const [voters, setVoters] = useState("");

  const placeholder = "Select a constituency";

  const fetchData = async () => {
    const data = await fetch("https://3.110.175.216:3000/getAssemblyList");
    const json = await data.json();
    console.log(json.result, "l");
    setAssemblyList(json.result);
  };

  const fetchAssemblyData = async () => {
    const data = await fetch(
      `https://3.110.175.216:3000/getAssemblyData?assembly_id=${currentAssemblyId}`
    );
    const json = await data.json();
    const obj = json.result[0];
    setSeatcategory(obj.seat_category);
    setSeatStatus(obj.seat_status);
    setBooths(obj.total_booth);
    setVoters(obj.total_voters);
    console.log(obj, "assembly data xx");
  };

  const fetchAssemblyFactorsData = async () => {
    const data = await fetch(
      `https://3.110.175.216:3000/getAssemblyFactorsData?assembly_id=${currentAssemblyId}`
    );
    const json = await data.json();
    console.log(json.result, "factors data");
    setAssemblyFactorsData(json.result);
  };

  const fetchCandidatesData = async () => {
    const data = await fetch(
      `https://3.110.175.216:3000/getAssemblyCandidateData?assembly_id=${currentAssemblyId}`
    );
    const json = await data.json();
    console.log(json.result, "Candidates data");
    setCandidateData(json.result);
  };

  const fetchCasteData = async () => {
    const data = await fetch(
      `https://3.110.175.216:3000/getAssemblyCasteData?assembly_id=${currentAssemblyId}`
    );
    const json = await data.json();
    console.log(json.result, "Caste data");
    setCasteData(json.result);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);
  localStorage.setItem("AssemblyList", JSON.stringify(assemblyList));
  localStorage.setItem("candidateData", JSON.stringify(candidateData));

  useEffect(() => {
    setSeatcategory("");
    setSeatStatus("");
    setBooths("");
    setVoters("");
    fetchAssemblyFactorsData().catch(console.error);
    fetchCandidatesData().catch(console.error);
    fetchCasteData().catch(console.error);
    fetchAssemblyData().catch(console.error);
  }, [currentAssembly]);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const handleChange = (e) => {
    setCurrentAssembly(e.currentTarget.outerText);
    setCurrentAssemblyId(e.currentTarget.value);
    closeMenu();
  };

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "middle",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      {assemblyList.map((item) => (
        <MenuItem key={item.assembly_id} value={item.assembly_id} onClick={handleChange}>
          {item.assembly_name}
          {/* {console.log(item.assembly_name, item.assembly_id, "Asa")} */}
        </MenuItem>
      ))}
    </Menu>
  );

  const casteArray = casteData.map((item) => item.caste_name);
  const casteRatioArray = casteData.map((item) => item.caste_ratio);

  const columns = [
    { headerName: "#", field: "num", width: 200 },
    { headerName: "Name", field: "candidate", width: 200, align: "left" },
    { headerName: "Party", field: "party", width: 200, align: "center" },
    { headerName: "Candidate rating", field: "completion", width: 200, align: "center" },
  ];
  // const candiArray = [
  //   { candidate_name: "Select Constituency", candidate_id: " ", party_name: " " },
  // ];
  // const rows = candiArray.map((candi) => ({
  //   candidate: <Candidate name={candi.candidate_name} index={candi.candidate_id} />,
  //   party: <Party name={candi.party_name} />,
  //   completion: <Completion value={Math.floor(Math.random() * 100)} />,
  // }));

  // const rows = [
  //   {
  //     candidate: "Select Constituency",
  //     index: 1,
  //     party: "BJP",
  //     completion: Math.floor(Math.random() * 101),
  //   },
  //   { candidate: "Select Constituency", num: 1, party: "BJP" },
  // ];
  const candidateArray = JSON.parse(localStorage.getItem("candidateData"));
  const candiSimple = candidateArray.map((item) => ({
    num: JSON.stringify(item.candidate_id),
    candidate: item.candidate_name,
    party: item.party_name,
    completion: JSON.stringify(Math.floor(Math.random() * 101)),
  }));

  console.log(candiSimple, "ASSSS");

  const row2 = candiSimple.map((item) => ({
    id: item.num,
    num: item.num,
    candidate: item.candidate,
    party: item.party,
    completion: item.completion,
  }));

  console.log(row2, "row2");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <MDButton onClick={openMenu} variant="text" color="dark">
          Select Constituency
        </MDButton>
        <ArrowDropDownIcon fontSize="large" sx={{ verticalAlign: "middle" }} />
        {renderMenu}
      </MDBox>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Parliamentary Constituencey"
                count={currentAssembly.length > 0 ? currentAssembly : placeholder}
                percentage={{
                  color: "success",
                  amount: "District:",
                  label: "Malkajgiri",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Total Voters"
                count={voters.length > 0 ? voters : placeholder}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                  text: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Total Booths"
                count={booths.length > 0 ? booths : placeholder}
                percentage={{
                  color: "success",
                  amount: "Urban : Rural =",
                  label: "100% : 0%",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Seat Status"
                count={seatStatus.length > 0 ? seatStatus : placeholder}
                percentage={{
                  color: "success",
                  amount: "Seat category:",
                  label: `${seatCategory}`,
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={8}>
              <MDBox mb={4}>
                {/* <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                /> */}
                <DefaultLineChart
                  icon={{ color: "info", component: "leaderboard" }}
                  title="Default Line Chart"
                  description="Product insights"
                  chart={{
                    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                      {
                        label: "Organic Search",
                        color: "info",
                        data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                      },
                      {
                        label: "Referral",
                        color: "dark",
                        data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
                      },
                    ],
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox
                color="black"
                bgColor="transparent"
                variant="gradient"
                borderRadius="lg"
                shadow="lg"
                opacity={1}
                p={2}
                height="400px"
              >
                <MDBox
                  color="black"
                  bgColor="info"
                  variant="gradient"
                  borderRadius="lg"
                  shadow="lg"
                  opacity={1}
                  p={2}
                >
                  <MDTypography p={0.5} fontWeight="bold" variant="h5" color="white">
                    MP:{" "}
                  </MDTypography>
                  <MDTypography p={0.5} fontWeight="bold" variant="h5" color="white">
                    MLA:{" "}
                  </MDTypography>
                </MDBox>
                <Typography p={0.5} variant="h5">
                  Key Factors
                </Typography>
                <MDBox borderRadius="lg">
                  <List
                    sx={{
                      listStyleType: "disc",
                      pl: 2,
                      "& .MuiListItem-root": {
                        display: "list-item",
                      },
                      "& .MuiListItem-padding": {
                        padding: "0px",
                      },
                    }}
                  >
                    {assemblyFactorsData.map((item) => (
                      <ListItem>
                        <p style={{ fontSize: "13px", padding: "0" }}>{item.description}</p>
                      </ListItem>
                    ))}
                  </List>
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              {/* {candidateData ? <Projects candiDatesData={candidateData} /> : null} */}
              <Card>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                  <MDTypography variant="h6" gutterBottom>
                    Top candidates
                  </MDTypography>
                </MDBox>
                <MDBox>
                  {candidateData.length > 0 ? (
                    <DataGrid
                      rows={row2}
                      columns={columns}
                      pageSize={5}
                      autoHeight
                      disableSelectionOnClick
                    />
                  ) : (
                    <MDTypography p={3} fontWeight="bold" variant="h5" color="Info">
                      Select The constituency to View Candidates
                    </MDTypography>
                  )}
                </MDBox>
              </Card>
            </Grid>
            {console.log(candidateData)}
            <Grid item xs={12} md={6} lg={4}>
              <PieChart
                icon={{ color: "info", component: "leaderboard" }}
                title="Caste Equation"
                description={`${currentAssembly} Assembly insights`}
                height="15rem"
                chart={{
                  labels:
                    casteArray.length > 0 ? casteArray : ["Red", "Green", "Yellow", "Grey", "Blue"],
                  datasets: {
                    label: "Projects",
                    backgroundColors: [
                      "primary",
                      "secondary",
                      "info",
                      "success",
                      "warning",
                      "error",
                      "light",
                      "dark",
                    ],
                    data: casteRatioArray.length > 0 ? casteRatioArray : [11, 16, 7, 3, 14],
                  },
                }}
              />
              {console.log(casteData, "castedata2")}
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
