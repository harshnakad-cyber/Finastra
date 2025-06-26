// src/components/Filters/FilterPanel.jsx
import { 
  Box, 
  Typography, 
  FormGroup, 
  FormControlLabel, 
  Checkbox, 
  Slider, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFilterOptions } from '../../hooks/useFilterOptions';

// Default options if dynamic loading fails
const DEFAULT_OPTIONS = {
  INDUSTRIES: ['Banking', 'Insurance', 'Payments/FinTechs', 'Capital Markets'],
  SUB_INDUSTRIES: ['NBFC', 'Co-operative banks', 'Health Insurance','General Insurance', 'Life Insurance', 'Insurance broking','Insurance TPA', 'Trading/Broking', 'Mutual Funds/Security Investment'],  
  CITY: ['Ahmedabad', 'Bangalore', 'Bhopal', 'Calcutta', 'Coimbatore','Delhi NCR', 'Goa', 'Gurgaon', 'Hyderabad', 'Jaipur', 'Kochi','Mumbai', 'Nepal', 'Pune', 'Chennai'],
  AWS_SERVICES: ['EC2', 'S3', 'Lambda', 'DynamoDB', 'RDS'],
  USE_CASES: ['Migration', 'New Product Development', 'SAP', 'AI-ML', 'GenAI', 'VMware'],
  ACCOUNT_SEGMENTS: ['Scale', 'Focus', 'Deep', 'Startups'],
  AVAILABILITY_OPTIONS: ['Public', 'Non-Referenceable']
};

/*
// Define the constant options
const USE_CASES = [
  'Migration',
  'New Product Development',
  'SAP',
  'AI-ML',
  'GenAI',
  'VMware'
];

const ACCOUNT_SEGMENTS = [
  'Scale',
  'Focus',
  'Deep',
  'Startups'
];

const AVAILABILITY_OPTIONS = [
  'Public',
  'Non-Referenceable'
];
*/
const FilterPanel = ({ filters, setFilters }) => {
  const filterOptions = useFilterOptions();

  const handleClearFilters = () => {
    setFilters({
      ...filters,
      city: [],
      industry: [],
      subIndustry: [],
      awsServices: [],
      mrrRange: [0, 1000],
      useCase: [],
      accountSegment: [],
      availability: []
    });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Filters</Typography>
        <Button size="small" onClick={handleClearFilters}>
          Clear All
        </Button>
      </Box>

      {/* Industry Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Industry</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {filterOptions.industries?.map((industry) => (
              <FormControlLabel
                key={industry}
                control={
                  <Checkbox
                    checked={filters.industry.includes(industry)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters(prev => ({
                          ...prev,
                          industry: [...prev.industry, industry]
                        }));
                      } else {
                        setFilters(prev => ({
                          ...prev,
                          industry: prev.industry.filter(i => i !== industry)
                        }));
                      }
                    }}
                  />
                }
                label={industry}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Sub-Industry Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Sub-Industry</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {filterOptions.subIndustries?.map((subIndustry) => (
              <FormControlLabel
                key={subIndustry}
                control={
                  <Checkbox
                    checked={filters.subIndustry.includes(subIndustry)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters(prev => ({
                          ...prev,
                          subIndustry: [...prev.subIndustry, subIndustry]
                        }));
                      } else {
                        setFilters(prev => ({
                          ...prev,
                          subIndustry: prev.subIndustry.filter(i => i !== subIndustry)
                        }));
                      }
                    }}
                  />
                }
                label={subIndustry}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Use Case Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Use Case</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {(filterOptions.useCases?.length ? filterOptions.useCases : DEFAULT_OPTIONS.USE_CASES).map((useCase) => (
              <FormControlLabel
                key={useCase}
                control={
                  <Checkbox
                    checked={filters.useCase.includes(useCase)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters(prev => ({
                          ...prev,
                          useCase: [...prev.useCase, useCase]
                        }));
                      } else {
                        setFilters(prev => ({
                          ...prev,
                          useCase: prev.useCase.filter(u => u !== useCase)
                        }));
                      }
                    }}
                  />
                }
                label={useCase}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Account Segmentation Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Account Segmentation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {(filterOptions.accountSegments?.length ? filterOptions.accountSegments : DEFAULT_OPTIONS.ACCOUNT_SEGMENTS).map((segment) => (
              <FormControlLabel
                key={segment}
                control={
                  <Checkbox
                    checked={filters.accountSegment.includes(segment)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters(prev => ({
                          ...prev,
                          accountSegment: [...prev.accountSegment, segment]
                        }));
                      } else {
                        setFilters(prev => ({
                          ...prev,
                          accountSegment: prev.accountSegment.filter(s => s !== segment)
                        }));
                      }
                    }}
                  />
                }
                label={segment}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Availability Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Availability</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {(filterOptions.availabilityOptions?.length ? filterOptions.availabilityOptions : DEFAULT_OPTIONS.AVAILABILITY_OPTIONS).map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={filters.availability.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters(prev => ({
                          ...prev,
                          availability: [...prev.availability, option]
                        }));
                      } else {
                        setFilters(prev => ({
                          ...prev,
                          availability: prev.availability.filter(a => a !== option)
                        }));
                      }
                    }}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* City Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>City</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {filterOptions.cities?.map((city) => (
              <FormControlLabel
                key={city}
                control={
                  <Checkbox
                    checked={filters.city.includes(city)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters(prev => ({
                          ...prev,
                          city: [...prev.city, city]
                        }));
                      } else {
                        setFilters(prev => ({
                          ...prev,
                          city: prev.city.filter(c => c !== city)
                        }));
                      }
                    }}
                  />
                }
                label={city}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* MRR Range Filter */}
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom>MRR Range (K$)</Typography>
        <Slider
          value={filters.mrrRange}
          onChange={(_, newValue) => {
            setFilters(prev => ({
              ...prev,
              mrrRange: newValue
            }));
          }}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
      </Box>
    </Box>
  );
};

export default FilterPanel;
