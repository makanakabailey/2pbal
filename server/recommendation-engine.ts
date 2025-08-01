import { ProfileUpdate, PackageRecommendation } from "@shared/schema";

interface PackageDefinition {
  id: string;
  name: string;
  price: number;
  targetBudget: { min: number; max: number };
  targetCompanySize: string[];
  targetIndustries: string[];
  targetTimeline: string[];
  features: string[];
  suitabilityScore: (profile: ProfileUpdate) => number;
}

const PACKAGES: PackageDefinition[] = [
  {
    id: "basic",
    name: "Basic Digital Foundation",
    price: 29,
    targetBudget: { min: 0, max: 5000 },
    targetCompanySize: ["1-10", "startup", "freelancer"],
    targetIndustries: ["retail", "service", "consulting", "creative"],
    targetTimeline: ["1-3 months", "3-6 months"],
    features: ["Website Design", "Basic SEO", "Social Media Setup"],
    suitabilityScore: (profile: ProfileUpdate) => {
      let score = 0;
      
      // Budget factor (30% weight)
      const budgetMatch = getBudgetScore(profile.preferredBudget, 0, 5000);
      score += budgetMatch * 0.3;
      
      // Company size factor (25% weight)
      const sizeMatch = getCompanySizeScore(profile.companySize, ["1-10", "startup", "freelancer"]);
      score += sizeMatch * 0.25;
      
      // Timeline factor (20% weight)
      const timelineMatch = getTimelineScore(profile.projectTimeline, ["1-3 months", "3-6 months"]);
      score += timelineMatch * 0.2;
      
      // Industry factor (15% weight)
      const industryMatch = getIndustryScore(profile.industry, ["retail", "service", "consulting", "creative"]);
      score += industryMatch * 0.15;
      
      // Goals alignment (10% weight)
      const goalsMatch = getGoalsScore(profile.businessGoals, ["online presence", "website", "basic marketing"]);
      score += goalsMatch * 0.1;
      
      return Math.min(score * 100, 100);
    }
  },
  {
    id: "professional",
    name: "Professional Growth Suite",
    price: 99,
    targetBudget: { min: 5000, max: 25000 },
    targetCompanySize: ["11-50", "small business"],
    targetIndustries: ["technology", "healthcare", "finance", "education", "manufacturing"],
    targetTimeline: ["3-6 months", "6-12 months"],
    features: ["Advanced Website", "E-commerce", "CRM Integration", "Analytics"],
    suitabilityScore: (profile: ProfileUpdate) => {
      let score = 0;
      
      const budgetMatch = getBudgetScore(profile.preferredBudget, 5000, 25000);
      score += budgetMatch * 0.3;
      
      const sizeMatch = getCompanySizeScore(profile.companySize, ["11-50", "small business"]);
      score += sizeMatch * 0.25;
      
      const timelineMatch = getTimelineScore(profile.projectTimeline, ["3-6 months", "6-12 months"]);
      score += timelineMatch * 0.2;
      
      const industryMatch = getIndustryScore(profile.industry, ["technology", "healthcare", "finance", "education", "manufacturing"]);
      score += industryMatch * 0.15;
      
      const goalsMatch = getGoalsScore(profile.businessGoals, ["growth", "automation", "efficiency", "sales"]);
      score += goalsMatch * 0.1;
      
      return Math.min(score * 100, 100);
    }
  },
  {
    id: "enterprise",
    name: "Enterprise Transformation",
    price: 299,
    targetBudget: { min: 25000, max: 100000 },
    targetCompanySize: ["51-200", "201-500", "500+", "enterprise"],
    targetIndustries: ["technology", "finance", "healthcare", "manufacturing", "government"],
    targetTimeline: ["6-12 months", "12+ months"],
    features: ["Custom Development", "AI Integration", "Advanced Analytics", "Multi-platform Solutions"],
    suitabilityScore: (profile: ProfileUpdate) => {
      let score = 0;
      
      const budgetMatch = getBudgetScore(profile.preferredBudget, 25000, 100000);
      score += budgetMatch * 0.3;
      
      const sizeMatch = getCompanySizeScore(profile.companySize, ["51-200", "201-500", "500+", "enterprise"]);
      score += sizeMatch * 0.25;
      
      const timelineMatch = getTimelineScore(profile.projectTimeline, ["6-12 months", "12+ months"]);
      score += timelineMatch * 0.2;
      
      const industryMatch = getIndustryScore(profile.industry, ["technology", "finance", "healthcare", "manufacturing", "government"]);
      score += industryMatch * 0.15;
      
      const goalsMatch = getGoalsScore(profile.businessGoals, ["transformation", "scale", "enterprise", "automation", "integration"]);
      score += goalsMatch * 0.1;
      
      return Math.min(score * 100, 100);
    }
  }
];

function getBudgetScore(userBudgets: string | undefined, minTarget: number, maxTarget: number): number {
  if (!userBudgets) return 0.5; // neutral score if no budget specified
  
  const budgetRanges: { [key: string]: { min: number; max: number } } = {
    "less than $5,000": { min: 0, max: 5000 },
    "$5,000 - $15,000": { min: 5000, max: 15000 },
    "$15,000 - $50,000": { min: 15000, max: 50000 },
    "$50,000 - $100,000": { min: 50000, max: 100000 },
    "more than $100,000": { min: 100000, max: 500000 }
  };
  
  const userRange = budgetRanges[userBudgets];
  if (!userRange) return 0.5;
  
  // Calculate overlap between user budget and target budget
  const overlapMin = Math.max(userRange.min, minTarget);
  const overlapMax = Math.min(userRange.max, maxTarget);
  
  if (overlapMin <= overlapMax) {
    const overlapSize = overlapMax - overlapMin;
    const targetSize = maxTarget - minTarget;
    return overlapSize / targetSize;
  }
  
  return 0;
}

function getCompanySizeScore(userSize: string | undefined, targetSizes: string[]): number {
  if (!userSize) return 0.5;
  
  const sizeMap: { [key: string]: string[] } = {
    "1-10": ["1-10", "startup", "freelancer", "small business"],
    "11-50": ["11-50", "small business"],
    "51-200": ["51-200", "medium business"],
    "201-500": ["201-500", "large business"],
    "500+": ["500+", "enterprise"]
  };
  
  const userCategories = sizeMap[userSize] || [userSize.toLowerCase()];
  const targetCategories = targetSizes.map(s => s.toLowerCase());
  
  const intersection = userCategories.filter(cat => 
    targetCategories.some(target => cat.includes(target) || target.includes(cat))
  );
  
  return intersection.length > 0 ? 1 : 0;
}

function getTimelineScore(userTimeline: string | undefined, targetTimelines: string[]): number {
  if (!userTimeline) return 0.5;
  
  const timelineMap: { [key: string]: number } = {
    "ASAP": 1,
    "1-3 months": 3,
    "3-6 months": 6,
    "6-12 months": 12,
    "12+ months": 18
  };
  
  const userTimeValue = timelineMap[userTimeline] || 6;
  
  return targetTimelines.some(target => {
    const targetValue = timelineMap[target] || 6;
    return Math.abs(userTimeValue - targetValue) <= 3;
  }) ? 1 : 0;
}

function getIndustryScore(userIndustry: string | undefined, targetIndustries: string[]): number {
  if (!userIndustry) return 0.5;
  
  const userIndustryLower = userIndustry.toLowerCase();
  const targetIndustriesLower = targetIndustries.map(i => i.toLowerCase());
  
  return targetIndustriesLower.some(target => 
    userIndustryLower.includes(target) || target.includes(userIndustryLower)
  ) ? 1 : 0;
}

function getGoalsScore(userGoals: string | undefined, targetKeywords: string[]): number {
  if (!userGoals) return 0.5;
  
  const userGoalsLower = userGoals.toLowerCase();
  const matchingKeywords = targetKeywords.filter(keyword => 
    userGoalsLower.includes(keyword.toLowerCase())
  );
  
  return matchingKeywords.length / targetKeywords.length;
}

export function generatePackageRecommendation(profile: ProfileUpdate): PackageRecommendation {
  const scores = PACKAGES.map(pkg => ({
    package: pkg,
    score: pkg.suitabilityScore(profile)
  }));
  
  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);
  
  const bestMatch = scores[0];
  const factors = [
    {
      factor: "Budget Alignment",
      weight: 30,
      value: profile.preferredBudget || "Not specified",
      impact: getBudgetScore(profile.preferredBudget, bestMatch.package.targetBudget.min, bestMatch.package.targetBudget.max) * 30
    },
    {
      factor: "Company Size",
      weight: 25,
      value: profile.companySize || "Not specified",
      impact: getCompanySizeScore(profile.companySize, bestMatch.package.targetCompanySize) * 25
    },
    {
      factor: "Project Timeline",
      weight: 20,
      value: profile.projectTimeline || "Not specified",
      impact: getTimelineScore(profile.projectTimeline, bestMatch.package.targetTimeline) * 20
    },
    {
      factor: "Industry Match",
      weight: 15,
      value: profile.industry || "Not specified",
      impact: getIndustryScore(profile.industry, bestMatch.package.targetIndustries) * 15
    },
    {
      factor: "Business Goals",
      weight: 10,
      value: profile.businessGoals || "Not specified",
      impact: getGoalsScore(profile.businessGoals, ["growth", "automation", "efficiency"]) * 10
    }
  ];
  
  const reason = generatePersonalizedReason(profile, bestMatch.package, factors);
  
  return {
    packageType: bestMatch.package.id,
    score: Math.round(bestMatch.score),
    reason,
    factors
  };
}

function generatePersonalizedReason(profile: ProfileUpdate, selectedPackage: PackageDefinition, factors: any[]): string {
  const highImpactFactors = factors.filter(f => f.impact > 15).map(f => f.factor);
  const userName = profile.firstName || "there";
  const companyName = profile.company || "your business";
  
  let reason = `Hi ${userName}! Based on your profile, the ${selectedPackage.name} is perfect for ${companyName}. `;
  
  if (highImpactFactors.includes("Budget Alignment")) {
    reason += `Your budget preferences align well with this package's value proposition. `;
  }
  
  if (highImpactFactors.includes("Company Size")) {
    reason += `This solution is specifically designed for ${profile.companySize || "your"} size organizations. `;
  }
  
  if (highImpactFactors.includes("Project Timeline")) {
    reason += `The implementation timeline matches your ${profile.projectTimeline || "preferred"} timeframe. `;
  }
  
  if (profile.businessGoals) {
    reason += `The package features directly support your goals: ${profile.businessGoals}. `;
  }
  
  reason += `This recommendation considers all your requirements equally to ensure the best fit for your digital transformation journey.`;
  
  return reason;
}

export function getPackageById(packageId: string) {
  return PACKAGES.find(pkg => pkg.id === packageId);
}