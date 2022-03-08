import { Box, TablePagination, TextField } from '@mui/material';
import { debounce } from 'lodash';
import { useCallback, useState, useEffect, SyntheticEvent } from 'react';

import { API_TOOLTIP_ERROR, DELETE_CARD_ACTION, EDIT_CARD_ACTION } from '@core/constants';
import { PageSizes } from '@core/enums';
import { ICardAction, ICardItemAction, ICollection, IListApiView, ISearchOptions } from '@core/interfaces';
import { useAlerts } from '@features/alertsBlock/hooks';
import { State, StatefulCard } from '@features/statefulCard';
import { CollectionCard } from '@shared/components/colllectionCard';
import { useApi } from '@shared/hooks';

import { DELAY, NO_MATCHING_COLLECTIONS, STYLES } from '../../constants';

export const CollectionsContent = () => {
  const [state, setState] = useState<State>(State.LOADING);
  const [data, setData] = useState<ICollection[]>([]);
  const [count, setCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(PageSizes.Ten);

  const api = useApi();
  const { addError, addSuccess} = useAlerts();

  const rowsPerPageOptions = Object.values(PageSizes).map(value => +value).filter((value) => value);
  const cardActions: ICardAction[] = [EDIT_CARD_ACTION, DELETE_CARD_ACTION];

  const getCollections = useCallback(
    debounce(async (search) => {
      setState(State.LOADING);

      const searchOptions: ISearchOptions = {
        pageSize: rowsPerPage,
        page: page,
        searchTerm: search
      }

      api.getCollections(searchOptions)
        .then((response: IListApiView<ICollection>) => {
          setData(response.data);
          setCount(response.count);

          setState(response.data.length > 0 ? State.CONTENT : State.NO_CONTENT);
        })
        .catch(() => {
          setState(State.ERROR);
          addError(API_TOOLTIP_ERROR);
        })

    }, DELAY),
    []
  )

  const handleRowsPerPageChanged = (event: any): void => {
    const newRowsPerPage = parseInt(event.target.value, 10);

    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleCardAction = (cardAction: ICardItemAction) => {

  }

  const handleTyping = (event: SyntheticEvent) => {
    const { value } = event.target as HTMLTextAreaElement;
    setSearchTerm(value);
  }

  useEffect(() => {
    getCollections(searchTerm);
  }, [searchTerm]);

  return (
    <>
      <TextField
        fullWidth
        placeholder={'Type title here...'}
        sx={STYLES.searchInput}
        onChange={handleTyping}/>

      <StatefulCard state={state} noContentMessage={NO_MATCHING_COLLECTIONS}>
        <TablePagination
          component='div'
          count={count}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onRowsPerPageChange={handleRowsPerPageChanged}
        />

        <Box sx={STYLES.cardsWrapper}>
          {
           data.map((collection: ICollection) => {
              return <CollectionCard
                        key={collection.id}
                        collection={collection}
                        isActionsAvailable={true}
                        actions={cardActions}
                        onActionClick={handleCardAction}/>
            })
          }
        </Box>

      </StatefulCard>
    </>
  )
}
