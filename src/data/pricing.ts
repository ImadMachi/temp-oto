// Type Imports
import type { PricingPlanType } from '@/types/pricingTypes'

export const pricingPlans: PricingPlanType[] = [
  {
    title: 'Basic',
    monthlyPrice: 0,
    currentPlan: true,
    popularPlan: false,
    subtitle: 'A simple start for everyone',
    yearlyPlan: {
      monthly: 0,
      annually: 0
    },
    planBenefits: [
      'Connect Your Shipping Contract (Only 1 Carrier)',
      'Ship with Discounted Rates (Local & International)',
      'Shipping Price Calculator',
      'Box Configuration & Print Settings',
      'Integration with Sales Channels (Only 1 Channel)',
      'Add Your Warehouses (Unlimited)',
      'Only 1 User',
      'Available Support Across All Channels',
      'COD Transfer (Twice a Month)',
      '1 SAR Fee (Your Own Rates)'
    ]
  },
  {
    monthlyPrice: 49,
    title: 'Standard',
    popularPlan: true,
    currentPlan: false,
    subtitle: 'For small to medium businesses',
    yearlyPlan: {
      monthly: 40,
      annually: 480
    },
    planBenefits: [
      'Connect Your Shipping Contracts (Up to 3 Carriers)',
      'Ship with Extra Discounted Rates (local & international)',
      'SMS Module (Limited)',
      'OTO FLEX (Drivers App)',
      'Integration with Sales Channels (Up to 3 Channels)',
      '10 Users (Brand Manager User, Warehouse User, and Drivers)',
      'Brands Configuration and Integration (Up to 3 Brands)',
      'Available Support Across All Channels',
      'COD Transfer (Twice a Month)',
      '1 SAR Fee (Your Own Rates)'
    ]
  },
  {
    monthlyPrice: 149,
    popularPlan: false,
    currentPlan: false,
    title: 'Enterprise',
    subtitle: 'Solution for big organizations',
    yearlyPlan: {
      monthly: 129,
      annually: 960
    },
    planBenefits: [
      'Connect Your Shipping Contracts (Unlimited)',
      'Ship with Best Rates (local & international)',
      'Email & WhatsApp Module (Limited)',
      'SLA Management',
      'Integration with Sales Channels (Unlimited)',
      'Unlimited Users',
      'Brands Configuration and Integration (Unlimited)',
      'Supervising Account Manager',
      'COD Transfer (Once a Week)',
      '0.9 Sar Fee (Your Own Rates)',
      'Basic Shipping Automation',
      'Basic API Access',
      'Basic Warehouse Management System'
    ]
  }
]
