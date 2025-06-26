// src/components/CaseStudy/CaseStudyForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  TextField,
  Button,
  Stack,
  Autocomplete,
  Box,
  Alert,
  InputAdornment,
  Typography,
  CircularProgress
} from '@mui/material';
import { supabase } from '../../config/supabase';
// Simple import for ReactQuill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CITIES = [
  'Ahmedabad', 'Bangalore', 'Bhopal', 'Calcutta', 'Coimbatore',
  'Delhi NCR', 'Goa', 'Gurgaon', 'Hyderabad', 'Jaipur', 'Kochi',
  'Mumbai', 'Nepal', 'Pune', 'Chennai'
];

const INDUSTRIES = [
  'Banking', 'Insurance', 'Payments/FinTechs', 'Capital Markets'
];

const SUB_INDUSTRIES = [
  'NBFC', 'Co-operative banks', 'Health Insurance',
  'General Insurance', 'Life Insurance', 'Insurance broking',
  'Insurance TPA', 'Trading/Broking', 'Mutual Funds/Security Investment'
];

const AWS_SERVICES = [
  'EC2', 'RDS', 'EBS', 'AWS Lambda', 'DynamoDB'
];

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

// If ReactQuill still causes issues, we can use this alternative content component
const ContentField = ({ value, onChange, error }) => {
  return (
    <TextField
      multiline
      rows={6}
      fullWidth
      label="Content"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={!!error}
      helperText={error}
    />
  );
};

const CaseStudyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: '',
    heading: '',
    accountOwner: '',
    content: '',
    mrr: '',
    industry: null,
    subIndustry: null,
    city: null,
    awsServices: [],
    useCase: null,
    accountSegment: null,
    availability: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.clientName) errors.clientName = 'Client Name is required';
    if (!formData.heading) errors.heading = 'Heading is required';
    if (!formData.accountOwner) errors.accountOwner = 'Account Owner is required';
    if (!formData.content) errors.content = 'Content is required';
    if (!formData.industry) errors.industry = 'Industry is required';
    if (!formData.subIndustry) errors.subIndustry = 'Sub-Industry is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.useCase) errors.useCase = 'Use Case is required';
    if (!formData.accountSegment) errors.accountSegment = 'Account Segmentation is required';
    if (!formData.availability) errors.availability = 'Availability is required';
    if (formData.awsServices.length === 0) errors.awsServices = 'At least one AWS Service is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('case_studies')
        .insert([{
          client_name: formData.clientName,
          heading: formData.heading,
          account_owner: formData.accountOwner,
          content: formData.content,
          mrr: formData.mrr ? parseFloat(formData.mrr) : null,
          industry: formData.industry,
          sub_industry: formData.subIndustry,
          city: formData.city,
          aws_services: formData.awsServices,
          use_case: formData.useCase,
          account_segment: formData.accountSegment,
          availability: formData.availability,
          created_at: new Date().toISOString()
        }]);

      if (supabaseError) throw supabaseError;

      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 4, bgcolor: 'white', borderRadius: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Case study created successfully! Redirecting to home page...
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Client Name"
            value={formData.clientName}
            onChange={handleChange('clientName')}
            fullWidth
            error={!!formErrors.clientName}
            helperText={formErrors.clientName}
          />

          <TextField
            label="Heading"
            value={formData.heading}
            onChange={handleChange('heading')}
            fullWidth
            error={!!formErrors.heading}
            helperText={formErrors.heading}
          />

          <TextField
            label="Account Owner"
            value={formData.accountOwner}
            onChange={handleChange('accountOwner')}
            fullWidth
            error={!!formErrors.accountOwner}
            helperText={formErrors.accountOwner}
          />

          <TextField
            label="Monthly Recurring Revenue"
            type="number"
            value={formData.mrr}
            onChange={handleChange('mrr')}
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              endAdornment: <InputAdornment position="end">K</InputAdornment>,
            }}
          />

          <Autocomplete
            value={formData.industry}
            onChange={(_, newValue) => {
              setFormData(prev => ({ ...prev, industry: newValue }));
              if (formErrors.industry) {
                setFormErrors(prev => ({ ...prev, industry: undefined }));
              }
            }}
            options={INDUSTRIES}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="Industry"
                error={!!formErrors.industry}
                helperText={formErrors.industry}
              />
            )}
          />

          <Autocomplete
            value={formData.subIndustry}
            onChange={(_, newValue) => {
              setFormData(prev => ({ ...prev, subIndustry: newValue }));
              if (formErrors.subIndustry) {
                setFormErrors(prev => ({ ...prev, subIndustry: undefined }));
              }
            }}
            options={SUB_INDUSTRIES}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="Sub-Industry"
                error={!!formErrors.subIndustry}
                helperText={formErrors.subIndustry}
              />
            )}
          />

          <Autocomplete
            value={formData.city}
            onChange={(_, newValue) => {
              setFormData(prev => ({ ...prev, city: newValue }));
              if (formErrors.city) {
                setFormErrors(prev => ({ ...prev, city: undefined }));
              }
            }}
            options={CITIES}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="City"
                error={!!formErrors.city}
                helperText={formErrors.city}
              />
            )}
          />



          <Autocomplete
            value={formData.useCase}
            onChange={(_, newValue) => {
              setFormData(prev => ({ ...prev, useCase: newValue }));
            }}
            options={USE_CASES}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Use Case"
                required
              />
            )}
          />

          <Autocomplete
            value={formData.accountSegment}
            onChange={(_, newValue) => {
              setFormData(prev => ({ ...prev, accountSegment: newValue }));
            }}
            options={ACCOUNT_SEGMENTS}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Account Segment"
                required
              />
            )}
          />

          <Autocomplete
            value={formData.availability}
            onChange={(_, newValue) => {
              setFormData(prev => ({ ...prev, availability: newValue }));
            }}
            options={AVAILABILITY_OPTIONS}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Availability"
                required
              />
            )}
          />

          <Autocomplete
            multiple
            value={formData.awsServices}
            onChange={(_, newValue) => {
              setFormData(prev => ({ ...prev, awsServices: newValue }));
              if (formErrors.awsServices) {
                setFormErrors(prev => ({ ...prev, awsServices: undefined }));
              }
            }}
            options={AWS_SERVICES}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="AWS Services"
                error={!!formErrors.awsServices}
                helperText={formErrors.awsServices}
              />
            )}
          />

          {/* Using simple TextField for content instead of ReactQuill */}
          <ContentField
            value={formData.content}
            onChange={(value) => {
              setFormData(prev => ({ ...prev, content: value }));
              if (formErrors.content) {
                setFormErrors(prev => ({ ...prev, content: undefined }));
              }
            }}
            error={formErrors.content}
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Create Case Study'
              )}
            </Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};

export default CaseStudyForm;
