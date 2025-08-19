import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Search,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  FileText,
  Download,
  ExternalLink,
  Star,
  Target,
  Users,
  Zap
} from 'lucide-react'

interface FormData {
  primaryUrl: string
  companyName: string
  industry: string
  competitorUrls: string[]
  campaignType: string
  targetAudience: string
}

interface AnalysisResults {
  overallScore: number
  grade: string
  scores: {
    conversion: number
    userExperience: number
    contentQuality: number
    technical: number
  }
  topRecommendations: string[]
  competitorComparison: { name: string; score: number }[]
}

const LandingPageAuditor: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'landing' | 'form' | 'analysis' | 'results'>('landing')
  const [formData, setFormData] = useState<FormData>({
    primaryUrl: '',
    companyName: '',
    industry: '',
    competitorUrls: ['', '', ''],
    campaignType: '',
    targetAudience: ''
  })
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null)

  // Simulate analysis progress
  useEffect(() => {
    if (currentStep === 'analysis') {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setCurrentStep('results');
            setAnalysisResults(generateMockResults());
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  const generateMockResults = (): AnalysisResults => ({
    overallScore: 78,
    grade: 'B+',
    scores: {
      conversion: 85,
      userExperience: 72,
      contentQuality: 80,
      technical: 75
    },
    topRecommendations: [
      'Add more prominent call-to-action buttons above the fold',
      'Improve mobile responsiveness for better user experience',
      'Include customer testimonials for social proof',
      'Optimize page load speed (currently 4.2s)',
      'Strengthen value proposition clarity in headlines'
    ],
    competitorComparison: [
      { name: 'Competitor 1', score: 72 },
      { name: 'Competitor 2', score: 81 },
      { name: 'Your Page', score: 78 }
    ]
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCompetitorChange = (index: number, value: string) => {
    const newUrls = [...formData.competitorUrls]
    newUrls[index] = value
    setFormData(prev => ({
      ...prev,
      competitorUrls: newUrls
    }))
  }

  const startAnalysis = () => {
    setCurrentStep('analysis');
    setAnalysisProgress(0);
  };

  const renderLandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/10 backdrop-blur rounded-2xl">
              <Target className="w-8 h-8 text-blue-300" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Landing Page Auditor
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Analyze your landing pages with AI-powered insights. Get actionable recommendations 
            and competitive analysis in under 60 seconds.
          </p>
          <Button
            onClick={() => setCurrentStep('form')}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            <Search className="w-6 h-6" />
            Start Your Free Analysis
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300">
            <div className="p-3 bg-blue-500/20 rounded-xl w-fit mb-4">
              <TrendingUp className="w-8 h-8 text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Conversion Optimization</h3>
            <p className="text-blue-100">
              Analyze headlines, CTAs, forms, and social proof elements to maximize conversions.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300">
            <div className="p-3 bg-purple-500/20 rounded-xl w-fit mb-4">
              <Users className="w-8 h-8 text-purple-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Competitive Analysis</h3>
            <p className="text-blue-100">
              Compare against up to 3 competitors and discover market opportunities.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300">
            <div className="p-3 bg-indigo-500/20 rounded-xl w-fit mb-4">
              <Zap className="w-8 h-8 text-indigo-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4">AI-Powered Insights</h3>
            <p className="text-blue-100">
              Get detailed recommendations powered by GPT-4 and industry best practices.
            </p>
          </div>
        </div>

        {/* Demo Preview */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">See It In Action</h2>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold">Overall Score: A-</span>
                <span className="text-3xl font-bold">89/100</span>
              </div>
              <div className="text-left">
                <p className="mb-2">✅ Strong value proposition</p>
                <p className="mb-2">⚠️ Improve mobile responsiveness</p>
                <p>🚀 Add social proof elements</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Analyze Your Landing Page</h1>
          <p className="text-xl text-gray-600">Enter your details below to get started</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div>
            {/* Required Fields */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Required Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Landing Page URL *
                  </label>
                  <Input
                    type="url"
                    value={formData.primaryUrl}
                    onChange={(e) => handleInputChange('primaryUrl', e.target.value)}
                    placeholder="https://example.com/landing-page"
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company/Campaign Name *
                  </label>
                  <Input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Industry/Vertical *
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select your industry</option>
                    <option value="saas">SaaS/Technology</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Financial Services</option>
                    <option value="education">Education</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Competitor URLs */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Competitive Analysis (Optional)
              </h2>
              
              <p className="text-gray-600 mb-4">Add up to 3 competitor landing pages for comparison</p>
              
              {formData.competitorUrls.map((url, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Competitor {index + 1} URL
                  </label>
                  <Input
                    type="url"
                    value={url}
                    onChange={(e) => handleCompetitorChange(index, e.target.value)}
                    placeholder="https://competitor.com/landing-page"
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            {/* Additional Context */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                Additional Context (Optional)
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Campaign Type/Goal
                  </label>
                  <select
                    value={formData.campaignType}
                    onChange={(e) => handleInputChange('campaignType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select campaign type</option>
                    <option value="lead-generation">Lead Generation</option>
                    <option value="product-sales">Product Sales</option>
                    <option value="app-download">App Download</option>
                    <option value="webinar-signup">Webinar Signup</option>
                    <option value="consultation">Consultation Booking</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Target Audience
                  </label>
                  <Input
                    type="text"
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    placeholder="Small business owners, age 30-50"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                onClick={startAnalysis}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3 mx-auto"
              >
                <Search className="w-6 h-6" />
                Start Analysis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalysis = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center text-white">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
            <div 
              className="absolute inset-0 border-4 border-blue-400 rounded-full transform -rotate-90 transition-transform duration-300"
              style={{
                background: `conic-gradient(from -90deg, #60A5FA ${analysisProgress * 3.6}deg, transparent 0)`
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{analysisProgress}%</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-6">Analyzing Your Landing Page</h1>
        <p className="text-xl text-blue-100 mb-8">
          Our AI is examining your page for conversion optimization, user experience, 
          content quality, and technical performance...
        </p>
        
        <div className="space-y-4 text-left max-w-md mx-auto">
          <div className={`flex items-center gap-3 p-3 rounded-lg ${analysisProgress > 20 ? 'bg-green-500/20 text-green-200' : 'bg-white/10'}`}>
            <CheckCircle className={`w-5 h-5 ${analysisProgress > 20 ? 'text-green-400' : 'text-gray-400'}`} />
            Scraping page content
          </div>
          <div className={`flex items-center gap-3 p-3 rounded-lg ${analysisProgress > 40 ? 'bg-green-500/20 text-green-200' : 'bg-white/10'}`}>
            <CheckCircle className={`w-5 h-5 ${analysisProgress > 40 ? 'text-green-400' : 'text-gray-400'}`} />
            Analyzing conversion elements
          </div>
          <div className={`flex items-center gap-3 p-3 rounded-lg ${analysisProgress > 60 ? 'bg-green-500/20 text-green-200' : 'bg-white/10'}`}>
            <CheckCircle className={`w-5 h-5 ${analysisProgress > 60 ? 'text-green-400' : 'text-gray-400'}`} />
            Processing competitor data
          </div>
          <div className={`flex items-center gap-3 p-3 rounded-lg ${analysisProgress > 80 ? 'bg-green-500/20 text-green-200' : 'bg-white/10'}`}>
            <CheckCircle className={`w-5 h-5 ${analysisProgress > 80 ? 'text-green-400' : 'text-gray-400'}`} />
            Generating recommendations
          </div>
        </div>
      </div>
    </div>
  );

  const renderResults = () => {
    if (!analysisResults) return null
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Landing Page Audit Results</h1>
          <p className="text-xl text-gray-600">{formData.companyName} - Analysis Complete</p>
        </div>

        {/* Summary Dashboard */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-2">{analysisResults.overallScore}</div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{analysisResults.grade}</div>
              <div className="text-gray-600">Overall Score</div>
            </div>
            
            {Object.entries(analysisResults.scores).map(([category, score]) => (
              <div key={category} className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-2">{score}/100</div>
                <div className="text-gray-600 capitalize">{category.replace(/([A-Z])/g, ' $1')}</div>
              </div>
            ))}
          </div>

          {/* Top Recommendations */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Top 5 Priority Recommendations
            </h2>
            <div className="space-y-3">
              {analysisResults.topRecommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-800">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Competitive Comparison Chart */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Competitive Comparison</h2>
            <div className="space-y-4">
              {analysisResults.competitorComparison.map((competitor, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-32 text-gray-700 font-medium">{competitor.name}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                    <div 
                      className={`h-8 rounded-full flex items-center justify-end pr-3 text-white font-bold ${
                        competitor.name === 'Your Page' ? 'bg-blue-500' : 'bg-gray-400'
                      }`}
                      style={{ width: `${competitor.score}%` }}
                    >
                      {competitor.score}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              <Download className="w-5 h-5" />
              Download Full Report
            </Button>
            <Button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              <FileText className="w-5 h-5" />
              View Detailed Analysis
            </Button>
            <Button
              onClick={() => {setCurrentStep('form'); setAnalysisProgress(0); setAnalysisResults(null);}}
              className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              <Search className="w-5 h-5" />
              Analyze Another Page
            </Button>
          </div>
        </div>

        {/* Detailed Sections Preview */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Conversion Optimization
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Clear value proposition present</span>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-700">CTA placement needs improvement</span>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="text-gray-700">Missing social proof elements</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              User Experience
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Good visual hierarchy</span>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-700">Mobile optimization needed</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Fast loading times</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  }

  return (
    <div className="font-sans">
      {currentStep === 'landing' && renderLandingPage()}
      {currentStep === 'form' && renderForm()}
      {currentStep === 'analysis' && renderAnalysis()}
      {currentStep === 'results' && renderResults()}
    </div>
  );
};

export default LandingPageAuditor;