// src/hooks/useCaseStudies.js
import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

export const useCaseStudies = (filters) => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('case_studies')
          .select('*')
          .order('created_at', { ascending: false });

        // Apply search filter
        if (filters.search) {
          query = query.or(
            `heading.ilike.%${filters.search}%,` +
            `content.ilike.%${filters.search}%,` +
            `client_name.ilike.%${filters.search}%`
          );
        }

        // Apply city filter
        if (filters.city?.length > 0) {
          query = query.in('city', filters.city);
        }

        // Apply industry filter
        if (filters.industry?.length > 0) {
          query = query.in('industry', filters.industry);
        }

        // Apply sub-industry filter
        if (filters.subIndustry?.length > 0) {
          query = query.in('sub_industry', filters.subIndustry);
        }

        // Apply use case filter
        if (filters.useCase?.length > 0) {
          query = query.in('use_case', filters.useCase);
        }

        // Apply account segment filter
        if (filters.accountSegment?.length > 0) {
          query = query.in('account_segment', filters.accountSegment);
        }

        // Apply availability filter
        if (filters.availability?.length > 0) {
          query = query.in('availability', filters.availability);
        }

        // Apply AWS services filter
        if (filters.awsServices?.length > 0) {
          filters.awsServices.forEach(service => {
            query = query.contains('aws_services', [service]);
          });
        }

        // Apply MRR range filter
        if (filters.mrrRange) {
          if (filters.mrrRange[0] > 0) {
            query = query.gte('mrr', filters.mrrRange[0]);
          }
          if (filters.mrrRange[1] < 1000) {
            query = query.lte('mrr', filters.mrrRange[1]);
          }
        }

        const { data, error: supabaseError } = await query;

        if (supabaseError) throw supabaseError;
        setCaseStudies(data || []);
      } catch (err) {
        console.error('Error fetching case studies:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, [filters]);

  return { caseStudies, loading, error };
};

export default useCaseStudies;