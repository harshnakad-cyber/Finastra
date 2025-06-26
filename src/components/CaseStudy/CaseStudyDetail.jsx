// src/components/CaseStudy/CaseStudyDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Typography, 
  Chip, 
  Stack, 
  Box, 
  Button,
  CircularProgress,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { supabase } from '../../config/supabase';

const CaseStudyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const { data, error } = await supabase
          .from('case_studies')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setCaseStudy(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!caseStudy) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Case study not found</Typography>
      </Box>
    );
  }

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 4, 
        bgcolor: 'white', 
        borderRadius: 2,
        height: '100%'
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Button 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          variant="outlined"
        >
          Back
        </Button>
      </Box>

      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            color: theme => theme.palette.primary.main
          }}
        >
          {caseStudy.heading}
        </Typography>

        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {caseStudy.client_name}
        </Typography>
      </Box>

      {/* Key Information */}
      <Box sx={{ mb: 4 }}>
        <Stack spacing={2}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Typography variant="body1">
              <strong>Account Owner:</strong> {caseStudy.account_owner}
            </Typography>
            {caseStudy.mrr && (
              <Typography variant="body1">
                <strong>MRR:</strong> ${caseStudy.mrr}K
              </Typography>
            )}
          </Stack>
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Categories and Tags */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Categories
        </Typography>

        <Stack spacing={3}>
          {/* Basic Info */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Basic Information
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
              {caseStudy.industry && (
                <Chip label={`Industry: ${caseStudy.industry}`} />
              )}
              {caseStudy.sub_industry && (
                <Chip label={`Sub-Industry: ${caseStudy.sub_industry}`} />
              )}
              {caseStudy.city && (
                <Chip label={`City: ${caseStudy.city}`} />
              )}
            </Stack>
          </Stack>

          {/* Use Case and Segment */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Classification
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
              {caseStudy.use_case && (
                <Chip 
                  label={`Use Case: ${caseStudy.use_case}`}
                  color="secondary"
                />
              )}
              {caseStudy.account_segment && (
                <Chip 
                  label={`Segment: ${caseStudy.account_segment}`}
                  color="info"
                />
              )}
              {caseStudy.availability && (
                <Chip 
                  label={caseStudy.availability}
                  color={caseStudy.availability === 'Public' ? 'success' : 'warning'}
                />
              )}
            </Stack>
          </Stack>

          {/* AWS Services */}
          {caseStudy.aws_services && caseStudy.aws_services.length > 0 && (
            <Stack spacing={1}>
              <Typography variant="subtitle2" color="text.secondary">
                AWS Services
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                {caseStudy.aws_services.map((service, index) => (
                  <Chip 
                    key={index}
                    label={service}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Stack>
          )}
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Content */}
      <Box>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Case Study Content
        </Typography>
        
        <Box 
          className="case-study-content"
          sx={{
            '& p': { 
              mb: 2,
              lineHeight: 1.7,
              fontSize: '1rem'
            },
            '& ul, & ol': { 
              mb: 2, 
              pl: 3,
              '& li': {
                mb: 1,
                lineHeight: 1.6
              }
            },
            '& h1, & h2, & h3, & h4': { 
              mb: 2, 
              mt: 3,
              fontWeight: 600,
            },
            '& strong': { 
              fontWeight: 600,
            },
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: caseStudy.content }} />
        </Box>
      </Box>

      {/* Metadata */}
      <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary">
          Created: {new Date(caseStudy.created_at).toLocaleDateString()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CaseStudyDetail;
