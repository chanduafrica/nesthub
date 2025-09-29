
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UploadCloud, CheckCircle, AlertTriangle, Clock, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type KycStatus = 'Approved' | 'In Progress' | 'Rejected' | 'Not Submitted';

export default function KycPage() {
  const [status, setStatus] = useState<KycStatus>('Not Submitted');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    toast({
      title: "Submitting KYC...",
      description: "Please wait while we process your details.",
    });

    setTimeout(() => {
        setIsLoading(false);
        setStatus('In Progress');
        toast({
            title: "Submission Successful!",
            description: "Your KYC details have been submitted and are now under review.",
            className: "bg-green-500 text-white",
        });
    }, 2000);
  };

  const statusInfo = {
    'Not Submitted': {
      variant: 'secondary' as const,
      icon: <AlertTriangle className="h-4 w-4" />,
      message: 'Your KYC information has not been submitted yet.',
    },
    'In Progress': {
      variant: 'outline' as const,
      icon: <Clock className="h-4 w-4" />,
      message: 'Your KYC details are currently under review. This may take up to 48 hours.',
    },
    Approved: {
      variant: 'default' as const,
      icon: <CheckCircle className="h-4 w-4" />,
      message: 'Your business is verified! You have full access to the vendor portal.',
    },
    Rejected: {
      variant: 'destructive' as const,
      icon: <AlertTriangle className="h-4 w-4" />,
      message: 'Your KYC submission was rejected. Please review the comments and resubmit.',
    },
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>KYB/KYC Verification Status</CardTitle>
          <CardDescription>
            Your current verification status. Keep your details up-to-date.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert
            className={
              status === 'Approved' ? 'border-green-300 bg-green-50 text-green-900' :
              status === 'Rejected' ? 'border-red-300 bg-red-50 text-red-900' :
              status === 'In Progress' ? 'border-orange-300 bg-orange-50 text-orange-900' : ''
            }
          >
            <div className="flex items-center gap-3">
              {statusInfo[status].icon}
              <div className="flex-1">
                 <AlertTitle className="font-semibold flex items-center gap-2">
                    Current Status: <Badge variant={statusInfo[status].variant}>{status}</Badge>
                 </AlertTitle>
                <AlertDescription>{statusInfo[status].message}</AlertDescription>
              </div>
            </div>
          </Alert>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Registered Business Name</Label>
                <Input id="businessName" defaultValue="SGNEST SUPER VENDOR" disabled={status === 'Approved'} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select defaultValue="company" disabled={status === 'Approved'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Sole Proprietor</SelectItem>
                      <SelectItem value="company">Limited Company</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regNumber">Business Registration Number</Label>
                  <Input id="regNumber" placeholder="e.g. PVT-ABC123D" disabled={status === 'Approved'} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Contact Person Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="contactName">Full Name</Label>
                <Input id="contactName" placeholder="e.g. Wanjiku Kamau" disabled={status === 'Approved'}/>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="idNumber">National ID/Passport Number</Label>
                    <Input id="idNumber" placeholder="e.g. 12345678" disabled={status === 'Approved'}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="contactPhone">Phone Number</Label>
                    <Input id="contactPhone" type="tel" defaultValue="0754735164" disabled={status === 'Approved'} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Document Upload</CardTitle>
            <CardDescription>
              Please upload clear copies of your business documents. PDFs or images are accepted.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="certOfInc">Certificate of Incorporation</Label>
                <div className="flex items-center gap-2">
                    <Input id="certOfInc" type="file" disabled={status === 'Approved'}/>
                    <Button variant="outline" size="icon" type="button"><UploadCloud className="h-4 w-4"/></Button>
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="kraPin">KRA PIN Certificate</Label>
                <div className="flex items-center gap-2">
                    <Input id="kraPin" type="file" disabled={status === 'Approved'}/>
                    <Button variant="outline" size="icon" type="button"><UploadCloud className="h-4 w-4"/></Button>
                </div>
            </div>
          </CardContent>
           <CardFooter className="border-t pt-6">
                <Button size="lg" className="w-full sm:w-auto ml-auto" type="submit" disabled={isLoading || status === 'Approved' || status === 'In Progress'}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {status === 'In Progress' ? 'Verification in Progress' : status === 'Approved' ? 'KYC Approved' : 'Submit for Verification'}
                </Button>
            </CardFooter>
        </Card>
      </form>
    </div>
  );
}
