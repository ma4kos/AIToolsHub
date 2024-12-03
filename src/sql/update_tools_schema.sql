-- Extend the tools table with all required fields
ALTER TABLE tools
ADD COLUMN IF NOT EXISTS developer VARCHAR(255),
ADD COLUMN IF NOT EXISTS primary_function TEXT,
ADD COLUMN IF NOT EXISTS features TEXT[],
ADD COLUMN IF NOT EXISTS platform_compatibility TEXT[],
ADD COLUMN IF NOT EXISTS official_website VARCHAR(512),
ADD COLUMN IF NOT EXISTS release_date DATE,
ADD COLUMN IF NOT EXISTS last_update DATE,
ADD COLUMN IF NOT EXISTS supported_languages TEXT[],
ADD COLUMN IF NOT EXISTS os_requirements TEXT[],
ADD COLUMN IF NOT EXISTS deployment_type TEXT[],
ADD COLUMN IF NOT EXISTS pricing_details JSONB,
ADD COLUMN IF NOT EXISTS integration_capabilities TEXT[],
ADD COLUMN IF NOT EXISTS expertise_level VARCHAR(50),
ADD COLUMN IF NOT EXISTS training_resources TEXT[],
ADD COLUMN IF NOT EXISTS compliance_certifications TEXT[],
ADD COLUMN IF NOT EXISTS advantages TEXT[],
ADD COLUMN IF NOT EXISTS limitations TEXT[],
ADD COLUMN IF NOT EXISTS hardware_requirements TEXT[],
ADD COLUMN IF NOT EXISTS security_features TEXT[],
ADD COLUMN IF NOT EXISTS technical_specs JSONB,
ADD COLUMN IF NOT EXISTS model_customization TEXT[],
ADD COLUMN IF NOT EXISTS api_documentation TEXT,
ADD COLUMN IF NOT EXISTS technology_stack TEXT[],
ADD COLUMN IF NOT EXISTS data_formats TEXT[],
ADD COLUMN IF NOT EXISTS performance_metrics JSONB,
ADD COLUMN IF NOT EXISTS version_info JSONB,
ADD COLUMN IF NOT EXISTS energy_metrics JSONB,
ADD COLUMN IF NOT EXISTS community_size INTEGER,
ADD COLUMN IF NOT EXISTS vendor_info JSONB,
ADD COLUMN IF NOT EXISTS access_control TEXT[],
ADD COLUMN IF NOT EXISTS bias_mitigation TEXT[],
ADD COLUMN IF NOT EXISTS operational_costs JSONB,
ADD COLUMN IF NOT EXISTS legal_info TEXT,
ADD COLUMN IF NOT EXISTS license_type VARCHAR(100),
ADD COLUMN IF NOT EXISTS case_studies TEXT[],
ADD COLUMN IF NOT EXISTS localization TEXT[];

-- Create indexes for improved query performance
CREATE INDEX IF NOT EXISTS idx_tools_expertise_level ON tools(expertise_level);
CREATE INDEX IF NOT EXISTS idx_tools_deployment_type ON tools USING GIN(deployment_type);
CREATE INDEX IF NOT EXISTS idx_tools_platform_compatibility ON tools USING GIN(platform_compatibility);
CREATE INDEX IF NOT EXISTS idx_tools_license_type ON tools(license_type);
CREATE INDEX IF NOT EXISTS idx_tools_release_date ON tools(release_date);

-- Update the database types