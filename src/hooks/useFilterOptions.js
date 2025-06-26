// src/hooks/useFilterOptions.js
import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

export const useFilterOptions = () => {
  const [options, setOptions] = useState({
    cities: [],
    industries: [],
    subIndustries: [],
    awsServices: [],
    useCases: [],
    accountSegments: [],
    availabilityOptions: []
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { data, error } = await supabase
          .from('case_studies')
          .select('city, industry, sub_industry, aws_services, use_case, account_segment, availability');
        
        if (error) throw error;

        // Get unique values for each field
        const uniqueCities = [...new Set(data.map(item => item.city).filter(Boolean))];
        const uniqueIndustries = [...new Set(data.map(item => item.industry).filter(Boolean))];
        const uniqueSubIndustries = [...new Set(data.map(item => item.sub_industry).filter(Boolean))];
        const uniqueUseCases = [...new Set(data.map(item => item.use_case).filter(Boolean))];
        const uniqueAccountSegments = [...new Set(data.map(item => item.account_segment).filter(Boolean))];
        const uniqueAvailability = [...new Set(data.map(item => item.availability).filter(Boolean))];
        
        // Handle AWS services array
        const allAwsServices = data
          .map(item => item.aws_services || [])
          .flat();
        const uniqueAwsServices = [...new Set(allAwsServices)];

        setOptions({
          cities: uniqueCities,
          industries: uniqueIndustries,
          subIndustries: uniqueSubIndustries,
          awsServices: uniqueAwsServices,
          useCases: uniqueUseCases,
          accountSegments: uniqueAccountSegments,
          availabilityOptions: uniqueAvailability
        });
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchOptions();
  }, []);

  return options;
};
