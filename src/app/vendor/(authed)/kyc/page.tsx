
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
import { UploadCloud, CheckCircle, AlertTriangle, Clock, Loader2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type KycStatus = 'Approved' | 'In Progress' | 'Rejected' | 'Not Submitted';

type KycData = {
    businessName: string;
    businessType: string;
    regNumber: string;
    address: string;
    location: string;
    portal: string;
    contactName: string;
    idNumber: string;
    contactPhone: string;
    certOfInc?: File | null;
    kraPin?: File | null;
}

function KycContent() {
  const [status, setStatus] = useState<KycStatus>('Not Submitted');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<KycData>({
    businessName: "NestHub Super Vendor",
    businessType: "company",
    regNumber: "",
    address: "",
    location: "",
    portal: "Nest Hub",
    contactName: "",
    idNumber: "",
    contactPhone: "0754735164",
    certOfInc: null,
    kraPin: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  }
  
  const handleSelectChange = (name: keyof KycData, value: string) => {
    setFormData(prev => ({...prev, [name]: value}));
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, files } = e.target;
      if (files && files.length > 0) {
          setFormData(prev => ({...prev, [name]: files[0]}));
      }
  }

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
        setIsEditing(false); // Lock the form and show summary
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
    <div className="space-y-6 flex-1">
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
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Business Information</CardTitle>
              {status !== 'Not Submitted' && !isEditing && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-3 w-3 mr-2" /> Edit
                  </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="businessName">Registered Business Name</Label>
                    <Input id="businessName" name="businessName" value={formData.businessName} onChange={handleInputChange} disabled={!isEditing} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select name="businessType" value={formData.businessType} onValueChange={(val) => handleSelectChange('businessType', val)} disabled={!isEditing}>
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
              </div>
              <div className="space-y-2">
                  <Label htmlFor="regNumber">Business Registration Number</Label>
                  <Input id="regNumber" name="regNumber" value={formData.regNumber} onChange={handleInputChange} placeholder="e.g. PVT-ABC123D" disabled={!isEditing} />
              </div>
               <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="e.g. 123 Nest Towers, Nairobi" disabled={!isEditing} />
              </div>
               <div className="space-y-2">
                  <Label htmlFor="location">Location / Town</Label>
                  <Input id="location" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. Westlands" disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portal">Registered Portal</Label>
                <Input id="portal" name="portal" value={formData.portal} disabled />
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
                <Input id="contactName" name="contactName" value={formData.contactName} onChange={handleInputChange} placeholder="e.g. Wanjiku Kamau" disabled={!isEditing}/>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="idNumber">National ID/Passport Number</Label>
                    <Input id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleInputChange} placeholder="e.g. 12345678" disabled={!isEditing}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="contactPhone">Phone Number</Label>
                    <Input id="contactPhone" name="contactPhone" type="tel" value={formData.contactPhone} onChange={handleInputChange} disabled={!isEditing} />
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
                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <Input id="certOfInc" name="certOfInc" type="file" onChange={handleFileChange} />
                        <Button variant="outline" size="icon" type="button"><UploadCloud className="h-4 w-4"/></Button>
                    </div>
                ) : (
                    <Input value={formData.certOfInc?.name || 'Not Uploaded'} disabled />
                )}
            </div>
             <div className="space-y-2">
                <Label htmlFor="kraPin">KRA PIN Certificate</Label>
                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <Input id="kraPin" name="kraPin" type="file" onChange={handleFileChange} />
                        <Button variant="outline" size="icon" type="button"><UploadCloud className="h-4 w-4"/></Button>
                    </div>
                ) : (
                     <Input value={formData.kraPin?.name || 'Not Uploaded'} disabled />
                )}
            </div>
          </CardContent>
          {isEditing && (
           <CardFooter className="border-t pt-6">
                <Button size="lg" className="w-full sm:w-auto ml-auto" type="submit" disabled={isLoading || status === 'Approved'}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {status === 'In Progress' ? 'Resubmit for Verification' : status === 'Approved' ? 'KYC Approved' : 'Submit for Verification'}
                </Button>
            </CardFooter>
            )}
        </Card>
      </form>
    </div>
  );
}

export default function KycPage() {
    return (
        <KycContent />
    )
}
