import { AlignTypes, CellTypes } from '@features/data-table/enums';
import { IDataColumn } from '@features/data-table/interfaces';

export const COLUMNS: IDataColumn[] = [
  {
    id: 'title',
    numeric: false,
    label: 'Title',
    name: 'title',
    align: AlignTypes.Left,
    type: CellTypes.String,
  },
  {
    id: 'authorFullName',
    numeric: true,
    label: 'Author',
    name: 'authorFullName',
    align: AlignTypes.Left,
    type: CellTypes.String,
  },
  {
    id: 'amountPages',
    numeric: true,
    label: 'Amount of pages',
    name: 'amountPages',
    align: AlignTypes.Right,
    type: CellTypes.Number,
  },
  {
    id: 'year',
    numeric: true,
    label: 'Year',
    name: 'year',
    align: AlignTypes.Right,
    type: CellTypes.Number,
  },
  {
    id: 'avgRate',
    numeric: true,
    label: 'Average rate',
    name: 'avgRate',
    align: AlignTypes.Right,
    type: CellTypes.Number,
  },
  {
    id: 'createdAt',
    numeric: false,
    label: 'Created date',
    name: 'createdAt',
    align: AlignTypes.Right,
    type: CellTypes.Date,
  },
  {
    id: 'updatedAt',
    numeric: true,
    label: 'Updated date',
    name: 'updatedAt',
    align: AlignTypes.Right,
    type: CellTypes.Date
  },
];