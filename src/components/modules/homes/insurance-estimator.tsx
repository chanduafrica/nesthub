
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface InsuranceEstimatorProps {
    propertyValue: number;
}

export function InsuranceEstimator({ propertyValue }: InsuranceEstimatorProps) {
  const [value, setValue] = useState(propertyValue);
  const [coverType, setCoverType] = useState('comprehensive');
  const [addOns, setAddOns] = useState({ flood: false, theft: false });

  useEffect(() => {
    setValue(propertyValue);
  }, [propertyValue]);

  const estimatedPremium = useMemo(() => {
    if (value <= 0) return 0;

    let baseRate = 0;
    if (coverType === 'basic') {
      baseRate = 0.1 / 100; // 0.1%
    } else { // comprehensive
      baseRate = 0.25 / 100; // 0.25%
    }

    let premium = value * baseRate;

    if (addOns.flood) {
      premium += value * 0.05 / 100; // Add 0.05% for flood
    }
    if (addOns.theft) {
      premium += value * 0.1 / 100; // Add 0.1% for theft
    }

    return premium;
  }, [value, coverType, addOns]);

  if (propertyValue === 0) {
    return null; // Don't show estimator for rental properties
  }
  
  const formatCurrency = (amount: number) => {
    return `Ksh ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Insurance Estimator
        </CardTitle>
        <CardDescription>Estimate your annual property insurance premium.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="property-value">Property Value (Ksh)</Label>
          <Input id="property-value" type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cover-type">Cover Type</Label>
          <Select value={coverType} onValueChange={setCoverType}>
            <SelectTrigger id="cover-type">
              <SelectValue placeholder="Select cover type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic (Fire & Perils)</SelectItem>
              <SelectItem value="comprehensive">Comprehensive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
            <Label>Optional Add-ons</Label>
            <div className="flex flex-col gap-2">
                 <div className="flex items-center space-x-2">
                    <Checkbox id="theft" checked={addOns.theft} onCheckedChange={(checked) => setAddOns(prev => ({...prev, theft: !!checked}))} />
                    <label htmlFor="theft" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                       Theft & Burglary
                    </label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="flood" checked={addOns.flood} onCheckedChange={(checked) => setAddOns(prev => ({...prev, flood: !!checked}))} />
                    <label htmlFor="flood" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                       Flood & Water Damage
                    </label>
                </div>
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 bg-muted/50 p-4 rounded-b-lg">
        <p className="text-sm text-muted-foreground">Estimated Annual Premium</p>
        <p className="text-2xl font-bold text-primary">{formatCurrency(estimatedPremium)}</p>
      </CardFooter>
    </Card>
  );
}
