export interface Database {
  public: {
    Tables: {
      tools: {
        Row: {
          id: number;
          name: string;
          developer: string;
          category: string;
          primary_function: string;
          description: string;
          features: string[];
          pricing: string;
          pricing_details: {
            free_tier?: {
              features: string[];
              limitations: string[];
            };
            paid_tiers?: {
              name: string;
              price: number;
              billing: string;
              features: string[];
            }[];
          };
          platform_compatibility: string[];
          rating: number;
          reviews: number;
          logo: string;
          official_website: string;
          release_date: string;
          last_update: string;
          supported_languages: string[];
          os_requirements: string[];
          deployment_type: string[];
          integration_capabilities: string[];
          expertise_level: string;
          training_resources: string[];
          compliance_certifications: string[];
          advantages: string[];
          limitations: string[];
          hardware_requirements: string[];
          security_features: string[];
          technical_specs: {
            algorithms?: string[];
            frameworks?: string[];
            models?: string[];
          };
          model_customization: string[];
          api_documentation: string;
          technology_stack: string[];
          data_formats: string[];
          performance_metrics: {
            accuracy?: number;
            latency?: number;
            throughput?: number;
            custom_metrics?: Record<string, number>;
          };
          version_info: {
            current: string;
            changelog: string[];
          };
          energy_metrics: {
            consumption?: number;
            carbon_footprint?: number;
          };
          community_size: number;
          vendor_info: {
            company: string;
            founded: string;
            size: string;
            customers: string[];
          };
          access_control: string[];
          bias_mitigation: string[];
          operational_costs: {
            setup?: number;
            monthly?: number;
            usage_based?: boolean;
          };
          legal_info: string;
          license_type: string;
          case_studies: string[];
          localization: string[];
          tags: string[];
          slug: string;
          created_at: string;
          updated_at: string;
        };
      };
      // ... other tables remain the same
    };
  };
}