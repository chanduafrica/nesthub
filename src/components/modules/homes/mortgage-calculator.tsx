
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Banknote } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MortgageCalculatorProps {
    propertyPrice: number;
}

export function MortgageCalculator({ propertyPrice }: MortgageCalculatorProps) {
  const [price, setPrice] = useState(propertyPrice);
  const [depositPercent, setDepositPercent] = useState(10);
  const [interestRate, setInterestRate] = useState(14.5);
  const [tenure, setTenure] = useState(20);

  useEffect(() => {
    setPrice(propertyPrice);
  }, [propertyPrice]);

  const depositAmount = useMemo(() => (price * depositPercent) / 100, [price, depositPercent]);
  const loanAmount = useMemo(() => price - depositAmount, [price, depositAmount]);

  const { monthlyPayment, totalInterest, totalPayment } = useMemo(() => {
    if (loanAmount <= 0 || interestRate <= 0 || tenure <= 0) {
      return { monthlyPayment: 0, totalInterest: 0, totalPayment: 0 };
    }
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = tenure * 12;
    
    const numerator = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;

    if (denominator === 0) {
        return { monthlyPayment: 0, totalInterest: 0, totalPayment: 0 };
    }

    const monthlyPayment = numerator / denominator;
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    return { monthlyPayment, totalInterest, totalPayment };
  }, [loanAmount, interestRate, tenure]);

  if (propertyPrice === 0) {
    return null; // Don't show calculator for rental properties
  }
  
  const formatCurrency = (amount: number) => {
    return `Ksh ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Banknote className="h-5 w-5" />
            Mortgage Calculator
        </CardTitle>
        <CardDescription>Estimate your monthly mortgage payment.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="price">Property Price (Ksh)</Label>
          <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="deposit">Deposit</Label>
            <span className="text-sm font-medium">{depositPercent}%</span>
          </div>
          <Slider id="deposit" min={0} max={50} step={1} value={[depositPercent]} onValueChange={(val) => setDepositPercent(val[0])} />
          <p className="text-sm text-muted-foreground text-right">{formatCurrency(depositAmount)}</p>
        </div>
         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="interest">Interest Rate (%)</Label>
                <Input id="interest" type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="tenure">Tenure (Years)</Label>
                 <Select value={String(tenure)} onValueChange={(val) => setTenure(Number(val))}>
                    <SelectTrigger id="tenure">
                        <SelectValue placeholder="Select tenure" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 bg-muted/50 p-4 rounded-b-lg">
         <div className="w-full">
            <p className="text-sm text-muted-foreground">Loan Amount</p>
            <p className="text-lg font-bold">{formatCurrency(loanAmount)}</p>
        </div>
        <div className="w-full">
            <p className="text-sm text-muted-foreground">Monthly Repayment</p>
            <p className="text-2xl font-bold text-primary">{formatCurrency(monthlyPayment)}</p>
        </div>
        <div className="w-full text-sm text-muted-foreground">
            <div className="flex justify-between">
                <span>Total Interest Payable</span>
                <span>{formatCurrency(totalInterest)}</span>
            </div>
             <div className="flex justify-between">
                <span>Total Amount Payable</span>
                <span>{formatCurrency(totalPayment)}</span>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
