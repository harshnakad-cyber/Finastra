// src/pages/About.jsx
import { Container, Typography, Paper, Box, Grid } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CreateIcon from '@mui/icons-material/Create';

const About = () => {
  const features = [
    {
      icon: <StorageIcon sx={{ fontSize: 40 }} />,
      title: 'Centralized Repository',
      description: 'A comprehensive collection of FSI case studies in one place, making it easier to access and reference successful implementations.'
    },
    {
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      title: 'Advanced Search',
      description: 'Powerful search functionality allowing users to find relevant case studies using keywords, tags, and multiple filters.'
    },
    {
      icon: <FilterAltIcon sx={{ fontSize: 40 }} />,
      title: 'Smart Filtering',
      description: 'Filter case studies by industry, location, AWS services, and revenue range to find exactly what you need.'
    },
    {
      icon: <CreateIcon sx={{ fontSize: 40 }} />,
      title: 'Easy Content Creation',
      description: 'Simple and intuitive interface for creating and managing case studies with rich text editing capabilities.'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box py={8}>
        {/* Main Introduction */}
        <Typography variant="h3" component="h1" gutterBottom align="center">
          About Finastra
        </Typography>
        
        <Paper elevation={0} sx={{ p: 4, mb: 4, backgroundColor: 'primary.light' }}>
          <Typography variant="h5" gutterBottom>
            Our Mission
          </Typography>
          <Typography paragraph>
            Finastra is designed to streamline the process of managing and accessing 
            Financial Services Industry (FSI) case studies. Our platform serves as a 
            centralized repository for success stories, implementations, and learning 
            experiences across the FSI sector.
          </Typography>
        </Paper>

        {/* Key Features */}
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ my: 4 }}>
          Key Features
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* How to Use Section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            How to Use
          </Typography>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              1. Browse and Search
            </Typography>
            <Typography paragraph>
              Use the search bar and filters on the landing page to find relevant case studies. 
              Filter by industry, location, AWS services, or use the MRR slider to narrow down results.
            </Typography>

            <Typography variant="h6" gutterBottom>
              2. Create New Case Studies
            </Typography>
            <Typography paragraph>
              Click the "Create New" button to add a new case study. Fill in the required 
              information including client details, content, and relevant tags.
            </Typography>

            <Typography variant="h6" gutterBottom>
              3. View and Share
            </Typography>
            <Typography paragraph>
              Click on any case study to view its complete details. Share interesting cases 
              with your team using the share functionality.
            </Typography>
          </Paper>
        </Box>

        {/* Contact Information */}
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Need Help?
          </Typography>
          <Typography>
            If you have any questions or need assistance, please contact our support team at{' '}
            <Typography component="span" color="primary">
              support@finastra.com
            </Typography>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;
