// src/pages/HomePage.jsx
import { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography,
  Container
} from '@mui/material';
import SearchBar from '../components/Filters/SearchBar';
import FilterPanel from '../components/Filters/FilterPanel';
import CaseStudyList from '../components/CaseStudy/CaseStudyList';
import { useCaseStudies } from '../hooks/useCaseStudies';

const HomePage = () => {
  const [filters, setFilters] = useState({
    search: '',
    city: [],
    industry: [],
    subIndustry: [],
    awsServices: [],
    mrrRange: [0, 1000],
    useCase: [],
    accountSegment: [],
    availability: []
  });

  const { caseStudies, loading, error } = useCaseStudies(filters);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Finastra: The FSI Case Repository
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Browse and filter financial services industry case studies
        </Typography>
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
          <SearchBar 
            value={filters.search}
            onChange={(value) => setFilters(prev => ({ ...prev, search: value }))}
          />
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Filters Panel */}
        <Box 
          sx={{ 
            width: 280,
            flexShrink: 0,
            position: 'sticky',
            top: 24,
            height: 'fit-content',
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto'
          }}
        >
          <FilterPanel filters={filters} setFilters={setFilters} />
        </Box>

        {/* Case Studies List */}
        <Box sx={{ flexGrow: 1 }}>
          <CaseStudyList 
            caseStudies={caseStudies}
            loading={loading}
            error={error}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
