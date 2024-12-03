import React from 'react';
import { useParams } from 'react-router-dom';
import { useToolItem } from '../../hooks/useContent';
import { RelatedContent } from '../../components/tools/RelatedContent';
import { 
  Star, Users, Globe, Cpu, Gauge, Shield, Calendar, Clock, 
  Code, Database, Server, Zap, DollarSign, Book, Award
} from 'lucide-react';

export function ToolDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: tool, isLoading } = useToolItem(slug || '');

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 pt-24">Loading...</div>;
  }

  if (!tool) {
    return <div className="container mx-auto px-4 py-8 pt-24">Tool not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex items-start gap-6 mb-8">
          <div className="w-24 h-24 rounded-lg overflow-hidden">
            <img
              src={tool.logo}
              alt={tool.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
                <p className="text-gray-600">{tool.description}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                tool.pricing === 'Free' ? 'bg-green-100 text-green-700' :
                tool.pricing === 'Paid' ? 'bg-blue-100 text-blue-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {tool.pricing}
              </span>
            </div>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-medium">{tool.rating}</span>
                <span className="text-gray-500">
                  (<Users className="w-4 h-4 inline" /> {tool.reviews})
                </span>
              </div>
              {tool.official_website && (
                <a
                  href={tool.official_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tool.developer && (
              <div>
                <h3 className="font-medium mb-2">Developer</h3>
                <p>{tool.developer}</p>
              </div>
            )}
            <div>
              <h3 className="font-medium mb-2">Category</h3>
              <p>{tool.category}</p>
            </div>
            {tool.release_date && (
              <div>
                <h3 className="font-medium mb-2">Release Date</h3>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(tool.release_date).toLocaleDateString()}</span>
                </div>
              </div>
            )}
            {tool.last_update && (
              <div>
                <h3 className="font-medium mb-2">Last Update</h3>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(tool.last_update).toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Technical Details */}
        {(tool.platform_compatibility || tool.technology_stack || tool.data_formats || tool.deployment_type) && (
          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Technical Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tool.platform_compatibility && (
                <div>
                  <h3 className="font-medium mb-2">Platform Compatibility</h3>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{tool.platform_compatibility.join(', ')}</span>
                  </div>
                </div>
              )}
              {tool.technology_stack && (
                <div>
                  <h3 className="font-medium mb-2">Technology Stack</h3>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    <span>{tool.technology_stack.join(', ')}</span>
                  </div>
                </div>
              )}
              {tool.data_formats && (
                <div>
                  <h3 className="font-medium mb-2">Data Formats</h3>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    <span>{tool.data_formats.join(', ')}</span>
                  </div>
                </div>
              )}
              {tool.deployment_type && (
                <div>
                  <h3 className="font-medium mb-2">Deployment Type</h3>
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    <span>{tool.deployment_type.join(', ')}</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Features and Capabilities */}
        {(tool.features || tool.integration_capabilities) && (
          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Features and Capabilities</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tool.features && (
                <div>
                  <h3 className="font-medium mb-2">Key Features</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {tool.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              {tool.integration_capabilities && (
                <div>
                  <h3 className="font-medium mb-2">Integration Capabilities</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {tool.integration_capabilities.map((capability, index) => (
                      <li key={index}>{capability}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Additional Information */}
        {(tool.training_resources || tool.compliance_certifications || tool.performance_metrics || tool.community_size) && (
          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tool.training_resources && (
                <div>
                  <h3 className="font-medium mb-2">Training Resources</h3>
                  <div className="flex items-center gap-2">
                    <Book className="w-4 h-4" />
                    <span>{tool.training_resources.join(', ')}</span>
                  </div>
                </div>
              )}
              {tool.compliance_certifications && (
                <div>
                  <h3 className="font-medium mb-2">Certifications</h3>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>{tool.compliance_certifications.join(', ')}</span>
                  </div>
                </div>
              )}
              {tool.performance_metrics && (
                <div>
                  <h3 className="font-medium mb-2">Performance</h3>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>
                      {tool.performance_metrics.accuracy && `Accuracy: ${tool.performance_metrics.accuracy}%`}
                      {tool.performance_metrics.latency && `, Latency: ${tool.performance_metrics.latency}ms`}
                    </span>
                  </div>
                </div>
              )}
              {tool.community_size && (
                <div>
                  <h3 className="font-medium mb-2">Community</h3>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{tool.community_size.toLocaleString()} users</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Related Content Section */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Related Content</h2>
          <RelatedContent toolId={tool.id} tags={tool.tags} />
        </section>
      </div>
    </div>
  );
}