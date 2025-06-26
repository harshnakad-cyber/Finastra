// src/components/CaseStudy/CaseStudyList.jsx
import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import CaseStudyCard from './CaseStudyCard';

const CaseStudyList = ({ caseStudies, loading, error }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!caseStudies?.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography>No case studies found</Typography>
      </Box>
    );
  }

  return (
    <Grid 
      container 
      spacing={3}
      sx={{
        width: '100%',
        margin: 0
      }}
    >
      {caseStudies.map((caseStudy) => (
        <Grid 
          item 
          xs={12} 
          sm={6} 
          lg={4} 
          key={caseStudy.id}
          sx={{
            display: 'flex',
            padding: 1.5
          }}
        >
          <Box sx={{ 
            width: '100%',
            display: 'flex'
          }}>
            <CaseStudyCard caseStudy={caseStudy} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default CaseStudyList;
