// src/pages/CreateCaseStudy.jsx
import { Container, Typography, Box } from '@mui/material';
import CaseStudyForm from '../components/CaseStudy/CaseStudyForm';

const CreateCaseStudy = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Create New Case Study
        </Typography>
        <Typography color="text.secondary" gutterBottom sx={{ mb: 4 }}>
          Fill in the details below to create a new case study
        </Typography>
        <CaseStudyForm />
      </Container>
    </Box>
  );
};

export default CreateCaseStudy;
