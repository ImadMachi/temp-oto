export type PricingPlanType = {
  title: string
  subtitle: string
  currentPlan: boolean
  popularPlan: boolean
  monthlyPrice: number
  planBenefits: string[]
  yearlyPlan: {
    monthly: number
    annually: number
  }
}
