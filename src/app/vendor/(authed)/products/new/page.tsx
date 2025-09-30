

'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2, UploadCloud, Trash2, X, PlusCircle, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { handleAddProduct } from '@/app/vendor/(authed)/products/actions';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const categories = {
  "Electronics": ["Smartphones", "Laptops", "Wearables", "Audio", "Accessories"],
  "Fashion": ["Women's Clothing", "Men's Clothing", "Footwear"],
  "Home & Living": ["Furniture", "Appliances", "Decor"],
  "Groceries": ["Fresh Produce", "Pantry Staples"],
  "Auto Parts": ["Engine Parts", "Braking System"]
};

export default function AddProductPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    
    const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
    const [mainImageFile, setMainImageFile] = useState<File | null>(null);
    const mainFileInputRef = useRef<HTMLInputElement>(null);

    const [galleryImagePreviews, setGalleryImagePreviews] = useState<string[]>([]);
    const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);
    const galleryFileInputRef = useRef<HTMLInputElement>(null);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [specifications, setSpecifications] = useState([{ key: '', value: '' }]);
    const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);
    const [variations, setVariations] = useState([{ type: 'Size', name: '', price: '' }]);

    const handleMainImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setMainImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setMainImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const removeMainImage = () => {
        setMainImageFile(null);
        setMainImagePreview(null);
        if(mainFileInputRef.current) {
            mainFileInputRef.current.value = '';
        }
    }
    
    const handleGalleryImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setGalleryImageFiles(prev => [...prev, ...newFiles]);

            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setGalleryImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };
    
    const removeGalleryImage = (index: number) => {
        setGalleryImageFiles(prev => prev.filter((_, i) => i !== index));
        setGalleryImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleCategoryChange = (category: string, checked: boolean) => {
      setSelectedCategories(prev => 
        checked ? [...prev, category] : prev.filter(c => c !== category)
      );
    }

    const handleSpecChange = (index: number, field: 'key' | 'value', value: string) => {
        const newSpecs = [...specifications];
        newSpecs[index][field] = value;
        setSpecifications(newSpecs);
    };

    const addSpecRow = () => setSpecifications([...specifications, { key: '', value: '' }]);
    const removeSpecRow = (index: number) => setSpecifications(specifications.filter((_, i) => i !== index));
    
    const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
        const newFaqs = [...faqs];
        newFaqs[index][field] = value;
        setFaqs(newFaqs);
    };

    const addFaqRow = () => setFaqs([...faqs, { question: '', answer: '' }]);
    const removeFaqRow = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));

    const handleVariationChange = (index: number, field: 'type' | 'name' | 'price', value: string) => {
        const newVariations = [...variations];
        newVariations[index][field] = value;
        setVariations(newVariations);
    };
    const addVariationRow = () => setVariations([...variations, { type: 'Size', name: '', price: '' }]);
    const removeVariationRow = (index: number) => setVariations(variations.filter((_, i) => i !== index));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        
        // For this prototype, we'll use a placeholder path for the image.
        const mainImageUrl = mainImageFile ? `/mall/${mainImageFile.name}` : '/mall/placeholder.jpg';

        const productData = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            price: Number(formData.get('price')),
            discountPrice: Number(formData.get('discountPrice')) || undefined,
            taxable: formData.get('taxable') === 'on',
            sku: formData.get('sku') as string,
            stock: Number(formData.get('stock')),
            category: selectedCategories,
            image: mainImageUrl,
            galleryImages: [], // Placeholder for now
            videoUrl: formData.get('videoUrl') as string,
            specifications,
            faqs,
            seo: {
                title: formData.get('seoTitle') as string,
                description: formData.get('seoDescription') as string,
                slug: formData.get('slug') as string,
            },
            visibility: formData.get('visibility') as 'Published' | 'Draft',
            productType: formData.get('productType') as 'Physical' | 'Digital',
            vendor: 'SGNEST SUPER VENDOR', // Hardcoded for prototype
            rating: 0,
        };

        try {
            await handleAddProduct(productData);
            toast({
                title: 'Product Added!',
                description: `${productData.title} has been added to your store.`,
            });
            router.push('/vendor/products');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Could not add the product. Please try again.',
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
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/vendor/products">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-bold">Add New Product</h1>
                    </div>
                     <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Product
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Product Name</Label>
                                    <Input id="title" name="title" placeholder="e.g., Hand-woven Kiondo Bag" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" name="description" placeholder="Describe your product in detail..." rows={6}/>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                             <CardHeader>
                                <CardTitle>Images & Video</CardTitle>
                                <CardDescription>Upload a main image, gallery images, and an optional video URL.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <Label className="mb-2 block font-semibold">Main Image</Label>
                                    <Input type="file" className="hidden" ref={mainFileInputRef} onChange={handleMainImageChange} accept="image/*"/>
                                    {!mainImagePreview ? (
                                        <div onClick={() => mainFileInputRef.current?.click()} className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50">
                                            <UploadCloud className="h-10 w-10 text-muted-foreground mb-4"/>
                                            <p className="font-semibold mb-2">Click to upload main image</p>
                                        </div>
                                    ) : (
                                        <div className="relative w-full max-w-sm mx-auto">
                                            <Image src={mainImagePreview} alt="Product preview" width={400} height={400} className="rounded-lg object-cover aspect-square"/>
                                            <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={removeMainImage}><X className="h-4 w-4"/></Button>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <Label className="mb-2 block font-semibold">Gallery Images</Label>
                                    <Input type="file" className="hidden" ref={galleryFileInputRef} onChange={handleGalleryImagesChange} accept="image/*" multiple/>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                        {galleryImagePreviews.map((src, index) => (
                                            <div key={index} className="relative">
                                                <Image src={src} alt={`Gallery preview ${index + 1}`} width={100} height={100} className="rounded-lg object-cover aspect-square" />
                                                <Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6" onClick={() => removeGalleryImage(index)}><X className="h-3 w-3" /></Button>
                                            </div>
                                        ))}
                                        <div onClick={() => galleryFileInputRef.current?.click()} className="border-2 border-dashed rounded-lg flex items-center justify-center aspect-square cursor-pointer hover:bg-muted/50">
                                            <PlusCircle className="h-8 w-8 text-muted-foreground" />
                                        </div>
                                    </div>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="videoUrl">Video URL (optional)</Label>
                                    <Input id="videoUrl" name="videoUrl" placeholder="e.g., https://youtube.com/watch?v=..." />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Variations</CardTitle><CardDescription>Add product options like size or color.</CardDescription></CardHeader>
                            <CardContent className="space-y-4">
                                {variations.map((v, i) => (
                                    <div key={i} className="flex items-end gap-2 p-2 border rounded-md">
                                        <div className="flex-1 grid grid-cols-3 gap-2">
                                            <Input placeholder="Type (e.g. Size)" value={v.type} onChange={e => handleVariationChange(i, 'type', e.target.value)} />
                                            <Input placeholder="Name (e.g. Large)" value={v.name} onChange={e => handleVariationChange(i, 'name', e.target.value)} />
                                            <Input type="number" placeholder="Price modifier (+/-)" value={v.price} onChange={e => handleVariationChange(i, 'price', e.target.value)} />
                                        </div>
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeVariationRow(i)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addVariationRow}>Add Variation</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Specifications</CardTitle><CardDescription>Add key-value details for your product.</CardDescription></CardHeader>
                            <CardContent className="space-y-4">
                                {specifications.map((spec, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Input placeholder="Key (e.g., Color)" value={spec.key} onChange={(e) => handleSpecChange(index, 'key', e.target.value)} />
                                        <Input placeholder="Value (e.g., Red)" value={spec.value} onChange={(e) => handleSpecChange(index, 'value', e.target.value)} />
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeSpecRow(index)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addSpecRow}>Add Specification</Button>
                            </CardContent>
                        </Card>

                         <Card>
                            <CardHeader><CardTitle>Frequently Asked Questions</CardTitle><CardDescription>Add questions and answers.</CardDescription></CardHeader>
                            <CardContent className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="grid gap-2 border p-4 rounded-lg relative">
                                        <Label>Question</Label>
                                        <Input placeholder="e.g., Is it machine washable?" value={faq.question} onChange={(e) => handleFaqChange(index, 'question', e.target.value)} />
                                        <Label>Answer</Label>
                                        <Textarea placeholder="e.g., Yes, on a gentle cycle." value={faq.answer} onChange={(e) => handleFaqChange(index, 'answer', e.target.value)} />
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeFaqRow(index)} className="absolute top-2 right-2"><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addFaqRow}>Add FAQ</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>SEO Settings</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="seoTitle">Meta Title</Label>
                                    <Input id="seoTitle" name="seoTitle" placeholder="A catchy title for search engines" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">URL Slug</Label>
                                    <Input id="slug" name="slug" placeholder="custom-product-slug" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="seoDescription">Meta Description</Label>
                                    <Textarea id="seoDescription" name="seoDescription" placeholder="A brief summary for search results." />
                                </div>
                            </CardContent>
                        </Card>

                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <Card className="sticky top-20">
                            <CardHeader><CardTitle>Publish</CardTitle></CardHeader>
                            <CardContent>
                                <RadioGroup name="visibility" defaultValue="Published">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Published" id="r1" />
                                        <Label htmlFor="r1">Publish</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Draft" id="r2" />
                                        <Label htmlFor="r2">Save as Draft</Label>
                                    </div>
                                </RadioGroup>
                            </CardContent>
                             <CardFooter>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Product
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                             <CardHeader><CardTitle>Product Type</CardTitle></CardHeader>
                             <CardContent>
                                <RadioGroup name="productType" defaultValue="Physical">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Physical" id="t1" />
                                        <Label htmlFor="t1">Physical Product</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Digital" id="t2" />
                                        <Label htmlFor="t2">Digital Product / Service</Label>
                                    </div>
                                </RadioGroup>
                            </CardContent>
                        </Card>

                         <Card>
                            <CardHeader><CardTitle>Pricing</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                               <div className="space-y-2">
                                    <Label htmlFor="price">Regular Price (KES)</Label>
                                    <Input id="price" name="price" type="number" placeholder="e.g., 2500" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="discountPrice">Discount Price (KES)</Label>
                                    <Input id="discountPrice" name="discountPrice" type="number" placeholder="e.g., 2200 (optional)" />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="taxable" name="taxable" />
                                    <label htmlFor="taxable" className="text-sm font-medium">This product is taxable</label>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Inventory</CardTitle></CardHeader>
                             <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="sku">SKU</Label>
                                    <Input id="sku" name="sku" placeholder="e.g., KIONDO-BG-01" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="stock">Stock Quantity</Label>
                                    <Input id="stock" name="stock" type="number" placeholder="e.g., 100" />
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader><CardTitle>Categories</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2 rounded-md border p-4 max-h-60 overflow-y-auto">
                                    {Object.entries(categories).map(([parent, children]) => (
                                        <div key={parent}>
                                            <div className="flex items-center space-x-2">
                                            <Checkbox id={parent} checked={selectedCategories.includes(parent)} onCheckedChange={(checked) => handleCategoryChange(parent, !!checked)}/>
                                            <label htmlFor={parent} className="font-semibold text-sm">{parent}</label>
                                            </div>
                                            <div className="pl-6 mt-2 space-y-2">
                                            {children.map(child => (
                                                <div key={child} className="flex items-center space-x-2">
                                                    <Checkbox id={child} checked={selectedCategories.includes(child)} onCheckedChange={(checked) => handleCategoryChange(child, !!checked)}/>
                                                    <label htmlFor={child} className="text-sm text-muted-foreground">{child}</label>
                                                </div>
                                            ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Linked Products</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="upsells">Upsells</Label>
                                    <div className="flex items-center gap-2">
                                        <Input id="upsells" placeholder="Search for a product..." />
                                        <Button type="button" variant="outline" size="icon"><LinkIcon className="h-4 w-4"/></Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cross-sells">Cross-sells</Label>
                                     <div className="flex items-center gap-2">
                                        <Input id="cross-sells" placeholder="Search for a product..." />
                                        <Button type="button" variant="outline" size="icon"><LinkIcon className="h-4 w-4"/></Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
