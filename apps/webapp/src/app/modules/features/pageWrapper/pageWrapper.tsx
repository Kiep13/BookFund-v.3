import { useSelector } from 'react-redux';

import { getIsAuthorized } from '@store/reducers';
import { PageWithSidebar, PageWithoutSidebar } from './components';
import { IProps } from './props.interface';

export const PageWrapper = (props: IProps) => {
  const isAuthorized = useSelector(getIsAuthorized);

  return isAuthorized ? <PageWithSidebar {...props}/> : <PageWithoutSidebar children={props.children}/>
}
