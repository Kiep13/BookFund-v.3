import { Box } from '@mui/material';

import { PageHeaderCard } from '@components/PageHeaderCard';
import { AdminRoutePaths } from '@utils/enums';

import { CollectionsContent } from './components/collectionsContent';
import { STYLES } from './constants';

export const Collections = () => {
  return (
    <>
      <Box sx={STYLES.header}>
        <PageHeaderCard
          title={'Collections'}
          url={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION_NEW}`}/>
      </Box>

      <Box sx={STYLES.content}>
        <CollectionsContent/>
      </Box>
    </>
  )
}
