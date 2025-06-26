// src/components/CaseStudy/CaseStudyCard.jsx
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Stack, 
  CardActionArea,
  Box 
} from '@mui/material';

const CaseStudyCard = ({ caseStudy }) => {
  const navigate = useNavigate();
  const CARD_SIZE = 310;

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  return (
    <Card 
      sx={{ 
        width: CARD_SIZE,
        height: CARD_SIZE,
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
      }}
    >
      <CardActionArea 
        onClick={() => navigate(`/case-study/${caseStudy.id}`)}
        sx={{ height: '100%' }}
      >
        <CardContent sx={{ 
          p: 2.5, 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column' 
        }}>
          {/* Basic Info */}
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '1.1rem',
              fontWeight: 600,
              mb: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {caseStudy.heading}
          </Typography>
          
          <Typography color="text.secondary" sx={{ mb: 0.5 }}>
            {caseStudy.client_name}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Owner: {caseStudy.account_owner}
          </Typography>
          
          {caseStudy.mrr && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              MRR: ${caseStudy.mrr}K
            </Typography>
          )}

          {/* Tags Container */}
          <Box sx={{ mt: 'auto' }}>
            {/* First Row: Industry & Location */}
            <Stack direction="row" flexWrap="wrap" sx={{ mb: 0.5, gap: 0.5 }}>
              {caseStudy.industry && (
                <Chip size="small" label={caseStudy.industry} />
              )}
              {caseStudy.sub_industry && (
                <Chip size="small" label={caseStudy.sub_industry} />
              )}
              {caseStudy.city && (
                <Chip size="small" label={caseStudy.city} />
              )}
            </Stack>

            {/* Second Row: New Categories */}
            <Stack direction="row" flexWrap="wrap" sx={{ mb: 0.5, gap: 0.5 }}>
              {caseStudy.use_case && (
                <Chip 
                  size="small" 
                  label={caseStudy.use_case}
                  color="secondary"
                />
              )}
              {caseStudy.account_segment && (
                <Chip 
                  size="small" 
                  label={caseStudy.account_segment}
                  color="info"
                />
              )}
              {caseStudy.availability && (
                <Chip 
                  size="small" 
                  label={caseStudy.availability}
                  color={caseStudy.availability === 'Public' ? 'success' : 'warning'}
                />
              )}
            </Stack>

            {/* Third Row: AWS Services (limited) */}
            {caseStudy.aws_services && caseStudy.aws_services.length > 0 && (
              <Stack direction="row" flexWrap="wrap" sx={{ gap: 0.5 }}>
                {caseStudy.aws_services.slice(0, 2).map((service, index) => (
                  <Chip 
                    key={index}
                    size="small" 
                    label={service}
                    color="primary"
                    variant="outlined"
                  />
                ))}
                {caseStudy.aws_services.length > 2 && (
                  <Chip 
                    size="small" 
                    label={`+${caseStudy.aws_services.length - 2}`}
                    variant="outlined"
                  />
                )}
              </Stack>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CaseStudyCard;



