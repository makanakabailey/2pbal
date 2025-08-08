import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Database, Users, Eye, Lock, UserCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="pt-16 min-h-screen bg-gray-light">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-teal-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            How we collect, use, and protect your information to deliver exceptional service
          </p>
          <p className="text-lg mt-4 opacity-90">
            Last updated: January 26, 2025
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-6 w-6 mr-3 text-teal-primary" />
                Our Commitment to Your Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-medium leading-relaxed">
                At 2PBAL ("we," "us," or "our"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p className="text-gray-medium leading-relaxed">
                By using our services, you consent to the collection and use of information in accordance with this policy. We utilize customer data to provide the best possible service, optimize our offerings, and deliver personalized business solutions.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-6 w-6 mr-3 text-blue-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-dark">Personal Information</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-medium ml-4">
                  <li>Name, email address, phone number, and business contact information</li>
                  <li>Company details including size, industry, and business goals</li>
                  <li>Project requirements, budget preferences, and timeline information</li>
                  <li>Payment information and billing details</li>
                  <li>Communication preferences and marketing consent</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-dark">Business Information</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-medium ml-4">
                  <li>Current business challenges and operational data</li>
                  <li>Technology infrastructure and digital maturity assessments</li>
                  <li>Performance metrics and ROI requirements</li>
                  <li>Industry benchmarks and competitive analysis data</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-dark">Usage Data</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-medium ml-4">
                  <li>Website navigation patterns and feature usage</li>
                  <li>Device information, IP addresses, and browser details</li>
                  <li>Service interaction logs and performance analytics</li>
                  <li>Customer support communications and feedback</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-6 w-6 mr-3 text-teal-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-medium leading-relaxed">
                We utilize customer data to the best of our ability to provide exceptional service and value:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-dark mb-2">Service Delivery</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-medium ml-4">
                    <li>Customize solutions to your specific business needs</li>
                    <li>Provide accurate quotes and recommendations</li>
                    <li>Deliver project milestones and support</li>
                    <li>Process payments and manage accounts</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-dark mb-2">Business Optimization</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-medium ml-4">
                    <li>Analyze ROI and performance improvements</li>
                    <li>Benchmark against industry standards</li>
                    <li>Identify cost-saving opportunities</li>
                    <li>Optimize service packages and pricing</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-dark mb-2">Communication</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-medium ml-4">
                    <li>Send service updates and project notifications</li>
                    <li>Provide technical support and assistance</li>
                    <li>Share relevant industry insights and best practices</li>
                    <li>Deliver marketing communications (with consent)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-dark mb-2">Continuous Improvement</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-medium ml-4">
                    <li>Enhance our service offerings and methodologies</li>
                    <li>Develop new features and capabilities</li>
                    <li>Improve website functionality and user experience</li>
                    <li>Conduct market research and analysis</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-6 w-6 mr-3 text-purple-600" />
                Information Sharing and Disclosure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-medium leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-gray-medium ml-4">
                <li><strong>Service Providers:</strong> Trusted partners who assist in delivering our services (payment processors, hosting providers, analytics tools)</li>
                <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process</li>
                <li><strong>Business Protection:</strong> To protect our rights, property, or safety, or that of our users</li>
                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales (with user notification)</li>
                <li><strong>Consent:</strong> With your explicit permission for specific purposes</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-6 w-6 mr-3 text-red-600" />
                Data Security and Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-medium leading-relaxed">
                We implement comprehensive security measures to protect your information:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-dark mb-2">Technical Safeguards</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-medium ml-4">
                    <li>SSL encryption for data transmission</li>
                    <li>Secure database storage and backup systems</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Access controls and authentication protocols</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-dark mb-2">Operational Security</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-medium ml-4">
                    <li>Employee training on data protection protocols</li>
                    <li>Limited access on a need-to-know basis</li>
                    <li>Regular monitoring and incident response procedures</li>
                    <li>Compliance with industry security standards</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="h-6 w-6 mr-3 text-green-600" />
                Your Privacy Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-medium leading-relaxed">
                You have the following rights regarding your personal information:
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-gray-medium ml-4">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                <li><strong>Objection:</strong> Object to certain types of processing, including marketing communications</li>
                <li><strong>Restriction:</strong> Request limitation of how we process your information</li>
              </ul>
              
              <p className="text-gray-medium leading-relaxed">
                To exercise these rights, please contact us at <a href="mailto:infodesk@2pbal.online" className="text-teal-primary hover:underline font-medium">infodesk@2pbal.online</a>.
              </p>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-medium leading-relaxed">
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, and improve our services. You can control cookie preferences through your browser settings.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Types of Cookies We Use:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-blue-700 ml-4">
                  <li>Essential cookies for website functionality</li>
                  <li>Analytics cookies to understand usage patterns</li>
                  <li>Preference cookies to remember your settings</li>
                  <li>Marketing cookies for personalized content (with consent)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Contact Us About Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-medium leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <p><strong>Email:</strong> <a href="mailto:infodesk@2pbal.online" className="text-teal-primary hover:underline">infodesk@2pbal.online</a></p>
                  <p><strong>Phone:</strong> <a href="tel:+16822844934" className="text-teal-primary hover:underline">+1 (682) 284-4934</a></p>
                  <p><strong>Subject Line:</strong> Privacy Policy Inquiry</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-500">
                We will respond to privacy-related inquiries within 30 days of receipt.
              </p>
            </CardContent>
          </Card>

          {/* Policy Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Policy Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-medium leading-relaxed">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes through email or prominent website notices.
              </p>
              
              <p className="text-gray-medium leading-relaxed">
                Your continued use of our services after policy updates constitutes acceptance of the revised terms.
              </p>
              
              <div className="bg-teal-50 p-4 rounded-lg">
                <p className="text-teal-800 font-medium">
                  This Privacy Policy is effective as of January 26, 2025, and governs our collection and use of information from that date forward.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}