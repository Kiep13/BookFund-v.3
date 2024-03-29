import { IDataColumn } from '@utils/interfaces';
import { AlignTypes, DataTypes } from '@utils/enums';

export const COLUMNS: IDataColumn[] = [
  {
    id: 'fullName',
    numeric: false,
    label: 'Name',
    name: 'fullName',
    width: '30%',
    align: AlignTypes.Left,
    type: DataTypes.String,
  },
  {
    id: 'amountBooks',
    numeric: true,
    label: 'Amount of books',
    name: 'amountBooks',
    align: AlignTypes.Right,
    type: DataTypes.Number,
  },
  {
    id: 'createdAt',
    numeric: false,
    label: 'Created date',
    name: 'createdAt',
    align: AlignTypes.Right,
    type: DataTypes.Date,
  },
  {
    id: 'updatedAt',
    numeric: true,
    label: 'Updated date',
    name: 'updatedAt',
    align: AlignTypes.Right,
    type: DataTypes.Date
  },
];
