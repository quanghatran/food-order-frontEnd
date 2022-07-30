import { Box } from '@mui/system';
import {
  ArcElement,
  Chart as ChartJS,
  Legend as LegendPieChart,
  Tooltip as TooltipPieChart,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import { getOrderReportByMonthStore } from '../../storeSlice';
import './homepage.scss';

ChartJS.register(ArcElement, TooltipPieChart, LegendPieChart);

export default function HomePage() {
  const dispatch = useDispatch();
  const [dataOrderReportCurr, setDataOrderReportCurr] = useState(null);
  const [dataOrderReportPrev, setDataOrderReportPrev] = useState(null);

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
    const fetchGetOrderReportByMonthStore = async () => {
      try {
        const resultOrderReportCurr = await dispatch(getOrderReportByMonthStore(month + 1));
        const resultOrderReportPrev = await dispatch(getOrderReportByMonthStore(month));

        setDataOrderReportCurr(resultOrderReportCurr.payload);
        setDataOrderReportPrev(resultOrderReportPrev.payload);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGetOrderReportByMonthStore();
  }, [dispatch]);

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
    <div className="homePageStoreWrapper">
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
    </div>
  );
}
