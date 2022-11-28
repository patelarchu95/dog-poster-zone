import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { Suspense } from 'react';

export default function Loader() {
  return (
    <Stack role="Loader" sx={{ color: 'grey.500' }} spacing={2} direction="row">
          <Suspense fallback={<CircularProgress/>}/>
      </Stack>
  );
}
