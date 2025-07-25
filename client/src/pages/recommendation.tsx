import RecommendationWizard from '@/components/ui/recommendation-wizard';

export default function RecommendationPage() {
  const handleComplete = (recommendations: any) => {
    console.log('Recommendations generated:', recommendations);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-dark mb-4">
            Find Your Perfect Digital Solution
          </h1>
          <p className="text-xl text-gray-medium max-w-3xl mx-auto">
            Answer a few quick questions about your business, and we'll recommend the perfect 
            package and services tailored to your specific needs and budget.
          </p>
        </div>

        <RecommendationWizard onComplete={handleComplete} />
      </div>
    </div>
  );
}