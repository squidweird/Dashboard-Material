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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
// import ReportsBarChart from "../../examples/Charts/BarCharts/ReportsBarChart";
import ComplexStatisticsCard from "../../examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
// import reportsBarChartData from "./data/reportsBarChartData";

// Dashboard components
import Projects from "./components/Projects";
// import OrdersOverview from "./components/OrdersOverview";

import DefaultLineChart from "../../examples/Charts/LineCharts/DefaultLineChart";
import PolarChart from "../../examples/Charts/PolarChart";
// import SimpleBlogCard from "../../examples/Cards/BlogCards/SimpleBlogCard";
function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Parliamentary Constituencey"
                count="Malkajgiri"
                percentage={{
                  color: "success",
                  amount: "District:",
                  label: "Malkajgiri",
                }}
                showMenu="True"
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
          <Grid container spacing={3}>
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
                Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PolarChart
                title="Polar Chart"
                description="Analytics Insights"
                chart={{
                  labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
                  datasets: {
                    label: "My First Dataset",
                    data: [11, 16, 7, 3, 14],
                    backgroundColors: ["info", "primary", "dark", "secondary", "success"],
                  },
                }}
              />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
