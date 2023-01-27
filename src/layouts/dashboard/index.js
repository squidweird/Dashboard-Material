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
import { List, ListItem, Typography } from "@mui/material";
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

<PieChart
  icon={{ color: "info", component: "leaderboard" }}
  title="Pie Chart"
  description="Analytics Insights"
  chart={{
    labels: ["Facebook", "Direct", "Organic", "Referral"],
    datasets: {
      label: "Projects",
      backgroundColors: ["info", "primary", "dark", "secondary", "primary"],
      data: [15, 20, 12, 60],
    },
  }}
/>;

// import SimpleBlogCard from "../../examples/Cards/BlogCards/SimpleBlogCard";
function Dashboard() {
  const [assemblyList, setAssemblyList] = useState([]);
  // const [casteData, setCasteData] = useState({});
  const fetchData = async () => {
    const data = await fetch("http://3.110.175.216:3000/getAssemblyList");
    const json = await data.json();
    console.log(json.result, "l");
    setAssemblyList(json.result);
  };
  // async function fetchAssemblyList() {
  //   await fetch("http://3.110.175.216:3000/getAssemblyList")
  //     .then((resp) => resp.json())
  //     .then((resp) => console.log(resp, "ooo"))
  //     .then((resp) => setTimeout(setAssemblyList(resp.result), 5000));
  // }
  // useEffect(() => {
  //   fetchAssemblyList();
  //   console.log(assemblList, "kkk");
  // }, []);

  const [menu, setMenu] = useState(null);
  const [currentAssembly, setCurrentAssembly] = useState("");
  const [currentAssemblyId, setCurrentAssemblyId] = useState(1);
  const [assemblyFactorsData, setAssemblyFactorsData] = useState([]);
  const [candidateData, setCandidateData] = useState([]);
  const [casteData, setCasteData] = useState([]);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const handleChange = (e) => {
    console.log(e.currentTarget.value);
    setCurrentAssembly(e.currentTarget.outerText);
    setCurrentAssemblyId(e.currentTarget.value);
    closeMenu();
  };
  const fetchAssemblyFactorsData = async () => {
    const data = await fetch(
      `http://3.110.175.216:3000/getAssemblyFactorsData?assembly_id=${currentAssemblyId}`
    );
    const json = await data.json();
    console.log(json.result, "factors data");
    setAssemblyFactorsData(json.result);
  };

  const fetchCandidatesData = async () => {
    const data = await fetch(
      `http://3.110.175.216:3000/getAssemblyCandidateData?assembly_id=${currentAssemblyId}`
    );
    const json = await data.json();
    console.log(json.result, "Candidates data");
    setCandidateData(json.result);
  };

  const fetchCasteData = async () => {
    const data = await fetch(
      `http://3.110.175.216:3000/getAssemblyCasteData?assembly_id=${currentAssemblyId}`
    );
    const json = await data.json();
    console.log(json.result, "Caste data");
    setCasteData(json.result);
  };

  useEffect(() => {
    fetchData().catch(console.error);
    fetchCandidatesData().catch(console.error);
  }, []);
  localStorage.setItem("AssemblyList", JSON.stringify(assemblyList));

  useEffect(() => {
    fetchAssemblyFactorsData().catch(console.error);
    fetchCandidatesData().catch(console.error);
    fetchCasteData().catch(console.error);
  }, [currentAssemblyId]);

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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <Typography variant="button" onClick={openMenu}>
          Select Constituency
        </Typography>
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
                count={currentAssembly}
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
                count="4,29,418"
                percentage={{
                  color: "success",
                  amount: "SC Voters:",
                  label: "12 %",
                  text: "qwiuweyq",
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
                count="304"
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
                title="Seat Status:Battleground"
                count=""
                percentage={{
                  color: "success",
                  amount: "Seat category:",
                  label: "General",
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
                  p={1}
                >
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
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
                        <p style={{ fontSize: "12px", padding: "0" }}>{item.description}</p>
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
              {console.log(candidateData, "candidata")}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {/* <PolarChart
                title="Caste Equation"
                chart={{
                  labels:
                    casteArray.length > 0 ? casteArray : ["Red", "Green", "Yellow", "Grey", "Blue"],
                  datasets: {
                    label: "My First Dataset",
                    data: casteRatioArray.length > 0 ? casteRatioArray : [11, 16, 7, 3, 14],
                    backgroundColors: ["info", "primary", "dark", "secondary", "success"],
                  },
                }}
              /> */}
              <PieChart
                icon={{ color: "info", component: "leaderboard" }}
                title="Caste Equation"
                description={`${currentAssembly} Assembly insights`}
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
