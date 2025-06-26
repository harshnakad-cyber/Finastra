// src/pages/CaseStudyDetail.jsx
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
import { supabase } from '../config/supabase';

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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
        variant="outlined"
      >
        Back
      </Button>

      {caseStudy && (
        <Paper elevation={0} sx={{ p: 4, bgcolor: 'white', borderRadius: 2 }}>
          {/* Title Section */}
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              mb: 2,
              fontWeight: 600,
              color: theme => theme.palette.primary.main
            }}
          >
            {caseStudy.heading}
          </Typography>

          <Typography 
            variant="h6" 
            color="text.secondary" 
            gutterBottom
            sx={{ mb: 3 }}
          >
            {caseStudy.client_name}
          </Typography>

          {/* Basic Information */}
          <Box sx={{ mb: 4 }}>
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
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Categories Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Categories
            </Typography>
            
            {/* Business Information */}
            <Stack spacing={2}>
              {/* Industry Information */}
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                {caseStudy.industry && (
                  <Chip 
                    label={`Industry: ${caseStudy.industry}`}
                    color="default"
                  />
                )}
                {caseStudy.sub_industry && (
                  <Chip 
                    label={`Sub-Industry: ${caseStudy.sub_industry}`}
                    color="default"
                  />
                )}
                {caseStudy.city && (
                  <Chip 
                    label={`City: ${caseStudy.city}`}
                    color="default"
                  />
                )}
              </Stack>

              {/* Use Case and Account Segment */}
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

              {/* AWS Services */}
              {caseStudy.aws_services && caseStudy.aws_services.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom sx={{ mt: 1 }}>
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
                </Box>
              )}
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Content Section */}
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

          {/* Created Date */}
          <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary">
              Created: {new Date(caseStudy.created_at).toLocaleDateString()}
            </Typography>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default CaseStudyDetail;