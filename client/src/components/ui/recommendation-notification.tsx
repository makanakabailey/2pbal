import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, ArrowRight } from "lucide-react";

interface RecommendationNotificationProps {
  recommendation: {
    packageType: string;
    score: number;
    reason: string;
  };
  onViewPackage: () => void;
  onDismiss: () => void;
}

export function RecommendationNotification({
  recommendation,
  onViewPackage,
  onDismiss
}: RecommendationNotificationProps) {
  const getPackageName = (packageType: string) => {
    switch (packageType) {
      case 'basic':
        return 'Basic Digital Foundation';
      case 'professional':
        return 'Professional Growth Suite';
      case 'enterprise':
        return 'Enterprise Transformation';
      default:
        return packageType;
    }
  };

  return (
    <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                Perfect Match Found!
              </h3>
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200">
                {recommendation.score}% Match
              </Badge>
            </div>
            <p className="text-green-800 dark:text-green-200 mb-4">
              {recommendation.reason}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={onViewPackage} className="bg-green-600 hover:bg-green-700 text-white">
                View {getPackageName(recommendation.packageType)}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={onDismiss} className="border-green-300 text-green-700 hover:bg-green-100">
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}