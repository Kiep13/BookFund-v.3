import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { COMMENTS_LINE_CHART_DATA } from '@mocks/lineChartDataMock';
import { LINE_CHART_OPTIONS } from '@utils/constants';

import { COMMENTS_CARD_TITLE } from '../../../constants';
import { DashboardCardWrapper } from '../../shared';

ChartJS.register(CategoryScale, Filler, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const CommentsCard = () =>
  <DashboardCardWrapper title={COMMENTS_CARD_TITLE}>
    <Line options={LINE_CHART_OPTIONS} data={COMMENTS_LINE_CHART_DATA}/>
  </DashboardCardWrapper>