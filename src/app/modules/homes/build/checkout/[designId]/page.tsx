
'use client';

import { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Banknote, CheckCircle, CreditCard, FileUp, Loader2, Smartphone, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const designs = [
  {
    id: 'simba-cottage',
    name: 'African Simba Cottage',
    price: 500000,
    imageUrl: 'https://picsum.photos/seed/simba/600/400',
  },
  {
    id: 'flat-roof-minimal',
    name: 'One-Bedroom Flat Roof – Minimal',
    price: 800000,
    imageUrl: 'https://picsum.photos/seed/flat-roof/600/400',
  },
  {
    id: 'simple-brick',
    name: 'Simple Brick Walls – Live Green',
    price: 1000000,
    imageUrl: 'https://picsum.photos/seed/brick-walls/600/400',
  },
];

type Step = 'summary' | 'kyc' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const params = useParams();
  const { toast } = useToast();
  const designId = params.designId as string;

  const [step, setStep] = useState<Step>('summary');
  const [kycData, setKycData] = useState({ idFile: null, plotFile: null });
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const design = designs.find(d => d.id === designId);

  if (!design) {
    notFound();
  }

  const totalCost = design.price; // Simplified for now
  const depositAmount = totalCost * 0.7;
  const formatCurrency = (amount: number) => `KES ${amount.toLocaleString()}`;

  const handleKycFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'idFile' | 'plotFile') => {
    if (e.target.files) {
      setKycData(prev => ({ ...prev, [field]: e.target.files![0] }));
    }
  };

  const handleMpesaPay = async () => {
    if (!mpesaPhone.match(/^(254)?[7]\d{8}$/)) {
        toast({ title: 'Invalid Phone Number', description: 'Please use format 2547XXXXXXXX.', variant: 'destructive' });
        return;
    }
    setIsProcessing(true);
    toast({ title: 'STK Push Sent', description: 'Please check your phone to complete the payment.' });
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('confirmation');
      toast({ title: "Payment Successful!", description: "Your booking is confirmed.", className: "bg-green-500 text-white" });
    }, 5000);
  };
  
  const handleBankPay = () => {
      setIsProcessing(true);
      toast({ title: 'Upload Received', description: 'Your proof of payment is being verified.' });
      setTimeout(() => {
        setIsProcessing(false);
        setStep('confirmation');
        toast({ title: "Booking Confirmed!", description: "Your project manager will be in touch.", className: "bg-green-500 text-white" });
      }, 3000);
  }

  return (
    <div className="container mx-auto py-10 max-w-4xl">
       <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-primary">Secure Checkout</h1>
         <Button variant="outline" asChild>
            <Link href="/modules/homes/build"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Designs</Link>
         </Button>
       </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            {/* Step Indicator */}
            <div className="flex justify-between mb-8">
                {['Summary', 'KYC', 'Payment'].map((s, i) => {
                    const stepId = s.toLowerCase() as Step;
                    const isCompleted = (step === 'kyc' && i < 1) || (step === 'payment' && i < 2) || step === 'confirmation';
                    const isCurrent = step === stepId;
                    return (
                        <div key={s} className="flex-1 text-center">
                            <div className={`text-sm font-semibold ${isCurrent || isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>{s}</div>
                            <div className={`h-1 mt-1 mx-auto rounded-full ${isCurrent || isCompleted ? 'bg-primary' : 'bg-border'}`} style={{width: '50%'}} />
                        </div>
                    );
                })}
            </div>

            {/* Content Sections */}
            {step === 'summary' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Booking Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Please review your selected design and total cost before proceeding. This amount is payable to a secure escrow account.</p>
                    </CardContent>
                    <CardFooter>
                         <Button onClick={() => setStep('kyc')} size="lg" className="w-full">Proceed to KYC <ShieldCheck className="ml-2 h-4 w-4" /></Button>
                    </CardFooter>
                </Card>
            )}

            {step === 'kyc' && (
                 <Card>
                    <CardHeader>
                        <CardTitle>KYC Verification</CardTitle>
                        <CardDescription>We need to verify your identity and proof of plot ownership.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="id-upload">National ID / Passport Scan</Label>
                            <Input id="id-upload" type="file" onChange={e => handleKycFileChange(e, 'idFile')} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="plot-upload">Plot Title Deed / Lease Agreement</Label>
                            <Input id="plot-upload" type="file" onChange={e => handleKycFileChange(e, 'plotFile')} />
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button onClick={() => setStep('payment')} size="lg" className="w-full" disabled={!kycData.idFile || !kycData.plotFile}>
                            Submit KYC & Proceed to Payment
                         </Button>
                    </CardFooter>
                </Card>
            )}

            {step === 'payment' && (
                 <Card>
                    <CardHeader>
                        <CardTitle>Choose Payment Method</CardTitle>
                        <CardDescription>Select your preferred method to pay the 70% deposit.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6 space-y-2">
                            <Label htmlFor="mpesa" className="flex items-center gap-4 rounded-lg border p-4 cursor-pointer has-[:checked]:border-primary">
                                <RadioGroupItem value="mpesa" id="mpesa" />
                                <Smartphone className="h-6 w-6" />
                                <div>
                                    <h3 className="font-semibold">M-Pesa Express (STK Push)</h3>
                                    <p className="text-xs text-muted-foreground">Preferred and fastest method.</p>
                                </div>
                            </Label>
                             <Label htmlFor="bank" className="flex items-center gap-4 rounded-lg border p-4 cursor-pointer has-[:checked]:border-primary">
                                <RadioGroupItem value="bank" id="bank" />
                                <Banknote className="h-6 w-6" />
                                <div>
                                    <h3 className="font-semibold">Bank Transfer / RTGS</h3>
                                    <p className="text-xs text-muted-foreground">Upload proof of payment for verification.</p>
                                </div>
                            </Label>
                             <Label htmlFor="card" className="flex items-center gap-4 rounded-lg border p-4 cursor-pointer has-[:checked]:border-primary">
                                <RadioGroupItem value="card" id="card" disabled />
                                <CreditCard className="h-6 w-6" />
                                <div>
                                    <h3 className="font-semibold">Credit/Debit Card</h3>
                                    <p className="text-xs text-muted-foreground">Coming soon.</p>
                                </div>
                            </Label>
                        </RadioGroup>

                        {paymentMethod === 'mpesa' && (
                            <div className="space-y-4 pt-4 border-t">
                                <Label htmlFor="mpesa-phone">M-Pesa Phone Number</Label>
                                <Input id="mpesa-phone" value={mpesaPhone} onChange={e => setMpesaPhone(e.target.value)} placeholder="254712345678" />
                                <Button onClick={handleMpesaPay} disabled={isProcessing || !mpesaPhone} className="w-full" size="lg">
                                    {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Pay {formatCurrency(depositAmount)} with M-Pesa
                                </Button>
                            </div>
                        )}
                        {paymentMethod === 'bank' && (
                             <div className="space-y-4 pt-4 border-t">
                                <p className="text-sm">Please transfer <strong>{formatCurrency(depositAmount)}</strong> to:</p>
                                <ul className="text-sm list-disc pl-5 bg-muted p-4 rounded-md">
                                    <li><strong>Bank Name:</strong> DigitalNest Escrow Bank</li>
                                    <li><strong>Account Name:</strong> NestHomes Build-Safe Escrow</li>
                                    <li><strong>Account Number:</strong> 123456789012</li>
                                    <li><strong>Branch:</strong> DN Towers, Nairobi</li>
                                </ul>
                                <Label htmlFor="proof-upload">Upload Proof of Payment</Label>
                                <Input id="proof-upload" type="file" />
                                <Button onClick={handleBankPay} disabled={isProcessing} className="w-full" size="lg">
                                     {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileUp className="mr-2 h-4 w-4" />}
                                    Submit for Verification
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {step === 'confirmation' && (
                 <Card className="text-center">
                    <CardHeader>
                        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                        <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
                        <CardDescription>Your green home journey has begun.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>A confirmation email and SMS with your contract and project timeline have been sent to you. Your assigned project manager will reach out within 24 hours.</p>
                        <div className="bg-muted p-4 rounded-md text-sm">
                           <p><strong>Contract & Receipt No:</strong> DN-BH-84392-2025</p>
                           <p><strong>Project Manager:</strong> Wanjiku Patel</p>
                        </div>
                         <Button asChild className="w-full">
                            <Link href="/admin/dashboard">Go to My Dashboard</Link>
                         </Button>
                    </CardContent>
                </Card>
            )}
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Image src={design.imageUrl} alt={design.name} width={300} height={200} className="rounded-md object-cover w-full" />
              <h3 className="font-bold">{design.name}</h3>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Cost</span>
                  <span className="font-medium">{formatCurrency(totalCost)}</span>
                </div>
                <div className="flex justify-between font-bold text-primary text-lg">
                  <span>70% Deposit Due</span>
                  <span>{formatCurrency(depositAmount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

