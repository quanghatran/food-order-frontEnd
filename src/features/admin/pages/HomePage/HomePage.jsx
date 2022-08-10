import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Legend as LegendPieChart,
  Tooltip as TooltipPieChart,
} from 'chart.js';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useDispatch } from 'react-redux';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import { getNewJoinAccount, getOrderReportByMonth } from '../../adminSlice';
import './homePage.scss';
import CurrencyFormat from 'react-currency-format';

ChartJS.register(ArcElement, TooltipPieChart, LegendPieChart);

export default function HomePage() {
  const dispatch = useDispatch();
  const [dataNewAccount, setDataNewAccount] = useState(null);
  const [dataOrderReportCurr, setDataOrderReportCurr] = useState(null);
  const [dataOrderReportPrev, setDataOrderReportPrev] = useState(null);

  let dataNewAccountModified = null;
  const date = new Date();
  const month = date.getMonth();
  let dataCurr = {};
  let dataPrev = {};

  const monthName = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  useEffect(() => {
    const fetGetchNewAccount = async () => {
      try {
        const resultNewAccount = await dispatch(getNewJoinAccount());
        setDataNewAccount(resultNewAccount.payload);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchGetOrderReportByMonth = async () => {
      try {
        const resultOrderReportCurr = await dispatch(getOrderReportByMonth(month + 1));
        const resultOrderReportPrev = await dispatch(getOrderReportByMonth(month));

        setDataOrderReportCurr(resultOrderReportCurr.payload);
        setDataOrderReportPrev(resultOrderReportPrev.payload);
      } catch (error) {
        console.log(error);
      }
    };

    fetGetchNewAccount();
    fetchGetOrderReportByMonth();
  }, [dispatch]);

  if (dataNewAccount) {
    dataNewAccountModified = dataNewAccount.map((obj) => {
      return {
        name: obj.month,
        new_user: obj.new_user,
        new_store: obj.new_store,
      };
    });
  }

  //  pie chart
  if (dataOrderReportPrev) {
    dataPrev = {
      labels: ['pending', 'confirm', 'success', 'cancelled', 'failed'],
      datasets: [
        {
          label: 'last_month',
          data: Object.values(dataOrderReportPrev.order[0]),
          backgroundColor: [
            'rgba(153, 102, 255, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 0, 0, 1)',
          ],
          borderColor: [
            'rgba(153, 102, 255, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 0, 0, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  if (dataOrderReportCurr) {
    dataCurr = {
      labels: ['pending', 'confirm', 'success', 'cancelled', 'failed'],
      datasets: [
        {
          label: 'this_month',
          data: Object.values(dataOrderReportCurr.order[0]),
          backgroundColor: [
            'rgba(153, 102, 255, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 0, 0, 1)',
          ],
          borderColor: [
            'rgba(153, 102, 255, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 0, 0, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  return (
    <div className="homePageAdminWrapper">
      <TitleAdminStorePage title="Dashboard" />
      <div>Overall report</div>
      {dataOrderReportCurr && (
        <Box className="overallWrapepr">
          <div className="revenueClass">
            Revenue:{' '}
            <CurrencyFormat
              value={dataOrderReportCurr.revenue}
              displayType={'text'}
              thousandSeparator={true}
            />
            đ
          </div>
          <div className="revenueClass">New Product: {dataOrderReportCurr.new_product}</div>
        </Box>
      )}
      <div>Report order by month</div>
      <Box className="boxPieChart">
        {dataOrderReportPrev && (
          <Box>
            <div style={{ fontSize: '22px' }}>
              <b>{monthName[month - 1]}</b>{' '}
            </div>

            <Pie data={dataPrev} />
          </Box>
        )}

        {dataOrderReportCurr && (
          <Box>
            <div style={{ fontSize: '22px' }}>
              <b>{monthName[month]}</b>{' '}
            </div>

            <Pie data={dataCurr} />
          </Box>
        )}
      </Box>

      {dataNewAccountModified && (
        <>
          <div>Statistic new user and store by month</div>
          <Box className="boxChart">
            <LineChart
              width={1700}
              height={500}
              data={dataNewAccountModified}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Legend />
              <Tooltip />
              <Line type="monotone" dataKey="new_user" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="new_store" stroke="#82ca9d" />
            </LineChart>
          </Box>
        </>
      )}
    </div>
  );
}
