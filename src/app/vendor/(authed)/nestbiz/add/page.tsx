
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2, UploadCloud, PlusCircle, Trash2, Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { handleAddBusinessListing } from '../actions';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { Textarea } from '@/components/ui/textarea';

const industryCategories = ["Finance & Insurance", "Real Estate", "Travel & Tourism", "Health & Wellness", "Education", "Hospitality", "Retail & FMCG", "Automotive", "ICT & Tech", "Professional Services", "Creative & Media"];
const onlineServices = ["Online Booking", "Home Delivery", "Consultancy", "Store Pickup", "24/7 Support"];
const paymentMethods = ["Cash", "Card", "M-Pesa", "Bank Transfer", "IjarahPay"];

export default function AddBusinessPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [services, setServices] = useState([{ name: '', description: '', priceRange: '' }]);
    const [offers, setOffers] = useState([{ title: '', description: '', startDate: undefined, endDate: undefined, type: 'Discount' }]);

    const handleServiceChange = (index: number, field: keyof typeof services[0], value: string) => {
        const newServices = [...services];
        newServices[index][field] = value;
        setServices(newServices);
    };
    const addServiceRow = () => setServices([...services, { name: '', description: '', priceRange: '' }]);
    const removeServiceRow = (index: number) => setServices(services.filter((_, i) => i !== index));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        const formData = new FormData(e.currentTarget);
        const data = {
            businessName: formData.get('businessName') as string,
            registrationType: formData.get('registrationType') as string,
            industryCategory: formData.get('industryCategory') as string,
            tagline: formData.get('tagline') as string,
            description,
            contact: {
                address: formData.get('address') as string,
                county: formData.get('county') as string,
                phone: formData.get('phone') as string,
                email: formData.get('email') as string,
                website: formData.get('website') as string,
                socials: {
                    facebook: formData.get('facebook') as string,
                    instagram: formData.get('instagram') as string,
                    linkedin: formData.get('linkedin') as string,
                    youtube: formData.get('youtube') as string,
                    x: formData.get('x') as string,
                }
            },
            services: services,
            // operatingDetails, offers...
        };

        try {
            await handleAddBusinessListing(data);
            toast({
                title: 'Business Listed!',
                description: `${data.businessName} has been submitted for review.`,
            });
            router.push('/vendor/nestbiz');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Could not add the business listing. Please try again.',
                variant: 'destructive',
            });
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild><Link href="/vendor/nestbiz"><ArrowLeft className="h-4 w-4" /></Link></Button>
                        <h1 className="text-2xl font-bold">Add Business Listing</h1>
                    </div>
                     <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Submit for Review
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Business Information</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <Input name="businessName" placeholder="Business Name" required />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Select name="registrationType"><SelectTrigger><SelectValue placeholder="Registration Type"/></SelectTrigger><SelectContent><SelectItem value="Sole Proprietor">Sole Proprietor</SelectItem><SelectItem value="Limited">Limited Company</SelectItem><SelectItem value="Partnership">Partnership</SelectItem></SelectContent></Select>
                                    <Select name="industryCategory"><SelectTrigger><SelectValue placeholder="Industry Category"/></SelectTrigger><SelectContent>{industryCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
                                </div>
                                <Input name="tagline" placeholder="Tagline / Slogan" />
                                <RichTextEditor description={description} onChange={setDescription} />
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Contact & Location</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <Input name="address" placeholder="Physical Address (Building, Street, Town)" />
                                <Select name="county"><SelectTrigger><SelectValue placeholder="Select County"/></SelectTrigger><SelectContent><SelectItem value="Nairobi">Nairobi</SelectItem><SelectItem value="Mombasa">Mombasa</SelectItem><SelectItem value="Kisumu">Kisumu</SelectItem></SelectContent></Select>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input name="phone" type="tel" placeholder="Primary Phone Number" required/>
                                    <Input name="email" type="email" placeholder="Email Address" required/>
                                </div>
                                <Input name="website" placeholder="Website URL (e.g., https://mybusiness.com)" />
                                 <div className="space-y-2">
                                    <Label>Social Media (Optional)</Label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <div className="flex items-center gap-2"><Facebook className="h-5 w-5"/><Input name="facebook" placeholder="Facebook URL"/></div>
                                        <div className="flex items-center gap-2"><Instagram className="h-5 w-5"/><Input name="instagram" placeholder="Instagram URL"/></div>
                                        <div className="flex items-center gap-2"><Linkedin className="h-5 w-5"/><Input name="linkedin" placeholder="LinkedIn URL"/></div>
                                        <div className="flex items-center gap-2"><Twitter className="h-5 w-5"/><Input name="x" placeholder="X (Twitter) URL"/></div>
                                    </div>
                                 </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Services</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                {services.map((s, i) => (
                                    <div key={i} className="flex items-start gap-2 p-2 border rounded-md">
                                        <div className="flex-1 space-y-2">
                                            <Input placeholder="Service Name" value={s.name} onChange={e => handleServiceChange(i, 'name', e.target.value)} />
                                            <Textarea placeholder="Service Description" value={s.description} onChange={e => handleServiceChange(i, 'description', e.target.value)} />
                                            <Input placeholder="Price Range (e.g., KES 2,000 - 5,000)" value={s.priceRange} onChange={e => handleServiceChange(i, 'priceRange', e.target.value)} />
                                        </div>
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeServiceRow(i)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addServiceRow}><PlusCircle className="mr-2 h-4 w-4" /> Add Service</Button>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Media</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div><Label>Logo</Label><div className="border-2 border-dashed p-4 text-center mt-1"><UploadCloud className="mx-auto h-6 w-6 text-muted-foreground"/><Input type="file" name="logo" className="text-xs"/></div></div>
                                <div><Label>Cover Banner</Label><div className="border-2 border-dashed p-4 text-center mt-1"><UploadCloud className="mx-auto h-6 w-6 text-muted-foreground"/><Input type="file" name="coverBanner" className="text-xs"/></div></div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Operating Details</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                               <div><Label>Online Services</Label><div className="space-y-1 mt-2">{onlineServices.map(s => <div key={s} className="flex items-center gap-2"><Checkbox id={`os-${s}`} name="onlineServices" value={s} /><Label htmlFor={`os-${s}`}>{s}</Label></div>)}</div></div>
                               <div><Label>Payment Methods</Label><div className="space-y-1 mt-2">{paymentMethods.map(p => <div key={p} className="flex items-center gap-2"><Checkbox id={`pm-${p}`} name="paymentMethods" value={p} /><Label htmlFor={`pm-${p}`}>{p}</Label></div>)}</div></div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
