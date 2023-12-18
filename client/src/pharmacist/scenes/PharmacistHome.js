import * as React from 'react';
import pharma from '../../shared/assets/vaccine.jpg'
import sales from '../../shared/assets/salesIcon.jpg'
import med from '../../shared/assets/med.png'
import medIcon from '../../shared/assets/medIcon.png'
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
import { IoIosGitPullRequest } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Table } from 'antd';
import { useGetSalesReportsQuery } from "../../store";
import LoadingIndicator from '../../shared/components/LoadingIndicator';


const PharmacistHome = () => {
  const navigate = useNavigate();
  const { data, isFetching, error } = useGetSalesReportsQuery();
  if (isFetching) {
    return <LoadingIndicator />;
  }

  const obj = {};
  data.forEach((order) => {
    const date = order.purchaseDate.substring(0, 7);
    if (obj[date] === undefined) {
      obj[date] = [];
    }
    obj[date].push(order);
  });

  const groupedData = Object.entries(obj).map(([date, orders]) => {
    const totalSales = orders.reduce((acc, order) => acc + order.sales, 0);
  
    const medicineNames = [...new Set(orders.map(order => order.medicineId.name))];
  
    return {
      date: date, 
      sales: totalSales,  
      names: medicineNames, 
    };
  });

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Total Sales',
      dataIndex: 'sales',
      key: 'sales',
    },
    {
      title: 'Medicine Names',
      key: 'names',
      render: (record) => (
        <div>
          {record.names.map((name, index) => (
            <div key={index}>{name}</div>
          ))}
        </div>
      ),
    },
  ];
  

  const getCurrentDate = () => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  const handleClickAddMedicine = () => {
    navigate("/pharmacist/addMedicine");
  };
  const handleClickSalesReport = () => {
    navigate("/pharmacist/salesReport");
  };
  const handleClickMedicine = () => {
    navigate("/pharmacist/medicine");
  };

  return (
    <div
      className="relative flex flex-col items-center min-h-screen object-scale-down"
      style={{
        backgroundImage: `url(${pharma})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      ></div>

      <div className="flex justify-center mt-5 mb-5">
        <div className="w-80 ml-5">
          <Card
            variant="solid"
            color="white"
            text="black"
            style={{ backgroundColor: "white", color: "black" }}
          >
            <CardContent orientation="horizontal">
              <div className="mt-5">
                <CircularProgress size="lg" determinate value={60}>
                  <img
                    src={med}
                    className="img-fluid"
                    alt="medicine"
                    style={{ color: "black" }}
                  />
                </CircularProgress>
              </div>
              <CardContent>
                <Typography level="body-md">Total Medicines</Typography>
                <Typography level="h2">100+</Typography>
                <Typography level="body-md">{getCurrentDate()}</Typography>
              </CardContent>
            </CardContent>
            <CardActions>
              <Button variant="soft" size="md" onClick={handleClickMedicine}>
                View Medicines
              </Button>
            </CardActions>
          </Card>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-300 h-full mx-5"></div>

        <div className="w-80">
          <Card
            variant="solid"
            color="white"
            text="black"
            style={{ backgroundColor: "white", color: "black" }}
          >
            <CardContent orientation="horizontal">
              <div className="mt-5">
                <CircularProgress size="lg" determinate value={40}>
                  <img
                    src={medIcon}
                    className="img-fluid"
                    alt="medicine"
                    style={{ color: "black" }}
                  />
                </CircularProgress>
              </div>
              <CardContent>
                <Typography level="body-md">Recently Added Medicines</Typography>
                <Typography level="h2">50+</Typography>
                <Typography level="body-md">{getCurrentDate()}</Typography>
              </CardContent>
            </CardContent>
            <CardActions>
              <Button
                variant="soft"
                size="md"
                onClick={handleClickAddMedicine}
              >
                Add Medicine
              </Button>
            </CardActions>
          </Card>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-300 h-full mx-5"></div>

        <div className="w-80">
          <Card
            variant="solid"
            color="white"
            text="black"
            style={{ backgroundColor: "white", color: "black" }}
          >
            <CardContent orientation="horizontal">
              <div className="mt-5">
                <CircularProgress size="lg" determinate value={20}>
                <img
                    src={sales}
                    className="img-fluid"
                    alt="medicine"
                    style={{ color: "black" }}
                  />
                </CircularProgress>
              </div>
              <CardContent>
                <Typography level="body-md">Total Sales</Typography>
                <Typography level="h2">1000+</Typography>
                <Typography level="body-md">{getCurrentDate()}</Typography>
              </CardContent>
            </CardContent>
            <CardActions>
              <Button variant="soft" size="md" onClick={handleClickSalesReport}>
                View Sales
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>

      <div className="w-1/2 mt-10 rounded-s">
        <Table columns={columns} dataSource={groupedData} />
      </div>



    </div>
  );
};

export default PharmacistHome;
