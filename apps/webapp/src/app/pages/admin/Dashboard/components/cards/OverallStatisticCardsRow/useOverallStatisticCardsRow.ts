import moment from 'moment';
import { useState } from 'react';

import { OVERALL_STATISTIC_MOCK } from '@mocks/overallStatisticsMock';
import { API_TOOLTIP_ERROR, DATE_API_FORMAT } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { useAlerts, useCharts } from '@utils/hooks';
import { IAdminDashboardSearchOptions, IOverallStatistic, IOverallStatisticRaw } from '@utils/interfaces';

import { useDashboardApi } from '../../../hooks';
import { LABELS } from './constants';

export const useOverallStatisticCardsRow = (selectedMonth: Date) => {
  const [cardState, setCardState] = useState<CardStates>(CardStates.LOADING);
  const [overallStatisticData, setOverallStatisticData] = useState<IOverallStatistic[]>(OVERALL_STATISTIC_MOCK);

  const {getOverallStatistic} = useDashboardApi();
  const {addError} = useAlerts();
  const {transformToOverallStatistic} = useCharts();

  const loadStatistic = () => {
    setCardState(CardStates.LOADING);
    const date = moment(selectedMonth).format(DATE_API_FORMAT);

    const searchOptions: IAdminDashboardSearchOptions = {
      date
    }

    getOverallStatistic(searchOptions)
      .then((response: IOverallStatisticRaw) => {
        const data: IOverallStatistic[] = transformToOverallStatistic(response, LABELS);
        setOverallStatisticData(data);

        setCardState(CardStates.CONTENT)
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setCardState(CardStates.ERROR);
      })
  }

  return {
    cardState,
    overallStatisticData,
    loadStatistic
  }
}
