import { Logo } from '@shared/components/logo';
import { SearchInput } from '@shared/components/searchInput';

import './header.scss';

export const Header = () => {
  return (
    <header className='header'>
      <Logo/>
      <SearchInput/>
    </header>
  )
}