
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const plans = [
    {
        name: "Basic",
        price: "Free",
        description: "For new vendors just getting started.",
        features: [
            "Up to 25 product listings",
            "10% standard commission",
            "Basic order management",
            "Standard support"
        ],
        cta: "Current Plan",
        isCurrent: true,
    },
    {
        name: "Pro",
        price: "KES 1,000",
        period: "/ year",
        description: "For growing businesses that need more tools.",
        features: [
            "Up to 200 product listings",
            "7.5% standard commission",
            "Advanced analytics & reports",
            "Promotion & discount tools",
            "Priority support"
        ],
        cta: "Upgrade to Pro",
        isPopular: true,
        isCurrent: false,
    },
    {
        name: "Enterprise",
        price: "KES 1,000",
        period: "/ month",
        description: "For established businesses that require scale.",
        features: [
            "Unlimited product listings",
            "5% standard commission",
            "Dedicated Account Manager",
            "AI-powered insights & forecasting",
            "Premium placement opportunities"
        ],
        cta: "Contact Sales",
        isCurrent: false,
    }
];

export default function VendorSubscriptionsPage() {
    return (
        <div className="flex-1 space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Subscriptions & Upgrades</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    Choose the right plan for your business to unlock powerful features and enjoy lower commission rates.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {plans.map((plan) => (
                    <Card key={plan.name} className={`flex flex-col h-full ${plan.isPopular ? 'border-primary shadow-lg' : ''}`}>
                         {plan.isPopular && (
                            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1">
                                <Star className="h-3 w-3" /> Most Popular
                            </Badge>
                         )}
                        <CardHeader className="items-center text-center">
                            <CardTitle className="text-2xl">{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                            <div className="pt-4">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <ul className="space-y-3">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button 
                                className="w-full" 
                                size="lg"
                                variant={plan.isCurrent ? 'outline' : 'default'}
                                disabled={plan.isCurrent}
                            >
                                {plan.isCurrent && plan.name === 'Enterprise' ? <><Crown className="mr-2 h-4 w-4" /> {plan.cta}</> : 
                                 plan.isCurrent ? <>{plan.cta}</> : 
                                 <><Zap className="mr-2 h-4 w-4" /> {plan.cta}</>}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

             <Card>
                <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>You have not made any subscription payments yet.</CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground py-12">
                    <p>Your billing history will appear here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
