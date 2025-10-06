
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2, UploadCloud, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { handleAddMamaAfricaListing } from '../actions';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

const allergens = ["Dairy", "Nuts", "Gluten", "Vegan"];

export default function AddMamaAfricaPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [recipeStory, setRecipeStory] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
    const [prepSteps, setPrepSteps] = useState([{ description: '' }]);

    const handleIngredientChange = (index: number, field: keyof typeof ingredients[0], value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };
    const addIngredientRow = () => setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
    const removeIngredientRow = (index: number) => setIngredients(ingredients.filter((_, i) => i !== index));

    const handleStepChange = (index: number, value: string) => {
        const newSteps = [...prepSteps];
        newSteps[index].description = value;
        setPrepSteps(newSteps);
    };
    const addStepRow = () => setPrepSteps([...prepSteps, { description: '' }]);
    const removeStepRow = (index: number) => setPrepSteps(prepSteps.filter((_, i) => i !== index));


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            category: formData.get('category') as string,
            cuisine: formData.get('cuisine') as string,
            dishType: formData.get('dishType') as any,
            recipeStory: recipeStory,
            cookingTime: Number(formData.get('cookingTime')),
            difficulty: formData.get('difficulty') as any,
            servings: Number(formData.get('servings')),
            ingredients,
            preparationSteps: prepSteps,
            isForSale: formData.get('isForSale') === 'on',
            pricing: {
                price: Number(formData.get('price')),
                portionSize: formData.get('portionSize') as string,
            },
            delivery: {
                deliveryTime: formData.get('deliveryTime') as string,
            },
            allergens: allergens.filter(allergen => formData.has(allergen)),
        };

        try {
            await handleAddMamaAfricaListing(data);
            toast({
                title: 'Listing Submitted!',
                description: `${data.name} has been submitted for review.`,
            });
            router.push('/vendor/mamaafrica');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Could not add the listing. Please try again.',
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
                            <Link href="/vendor/mamaafrica"><ArrowLeft className="h-4 w-4" /></Link>
                        </Button>
                        <h1 className="text-2xl font-bold">Add New Recipe/Meal</h1>
                    </div>
                     <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit for Review
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Details */}
                        <Card>
                            <CardHeader><CardTitle>Basic Details</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <Input name="name" placeholder="Recipe / Dish Name" required />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Select name="category"><SelectTrigger><SelectValue placeholder="Category"/></SelectTrigger><SelectContent><SelectItem value="Lunch">Lunch</SelectItem><SelectItem value="Breakfast">Breakfast</SelectItem><SelectItem value="Dinner">Dinner</SelectItem><SelectItem value="Snack">Snack</SelectItem></SelectContent></Select>
                                    <Select name="cuisine"><SelectTrigger><SelectValue placeholder="Cuisine"/></SelectTrigger><SelectContent><SelectItem value="Kenyan">Kenyan</SelectItem><SelectItem value="Nigerian">Nigerian</SelectItem><SelectItem value="Ethiopian">Ethiopian</SelectItem><SelectItem value="Pan-African">Pan-African</SelectItem></SelectContent></Select>
                                    <Select name="dishType"><SelectTrigger><SelectValue placeholder="Dish Type"/></SelectTrigger><SelectContent><SelectItem value="Ready Meal">Ready Meal</SelectItem><SelectItem value="DIY Recipe">DIY Recipe</SelectItem><SelectItem value="Ingredient Pack">Ingredient Pack</SelectItem></SelectContent></Select>
                                </div>
                                <RichTextEditor description={recipeStory} onChange={setRecipeStory} />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Input name="cookingTime" type="number" placeholder="Cooking Time (mins)" />
                                    <Select name="difficulty"><SelectTrigger><SelectValue placeholder="Difficulty"/></SelectTrigger><SelectContent><SelectItem value="Easy">Easy</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="Hard">Hard</SelectItem></SelectContent></Select>
                                    <Input name="servings" type="number" placeholder="Servings" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Ingredients */}
                        <Card>
                             <CardHeader><CardTitle>Ingredients</CardTitle></CardHeader>
                             <CardContent className="space-y-4">
                                {ingredients.map((ing, i) => (
                                    <div key={i} className="flex items-end gap-2 p-2 border rounded-md">
                                        <div className="flex-1 grid grid-cols-3 gap-2">
                                            <Input placeholder="Name" value={ing.name} onChange={e => handleIngredientChange(i, 'name', e.target.value)} />
                                            <Input placeholder="Qty" value={ing.quantity} onChange={e => handleIngredientChange(i, 'quantity', e.target.value)} />
                                            <Input placeholder="Unit (g, ml, tsp)" value={ing.unit} onChange={e => handleIngredientChange(i, 'unit', e.target.value)} />
                                        </div>
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeIngredientRow(i)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addIngredientRow}><PlusCircle className="mr-2 h-4 w-4" /> Add Ingredient</Button>
                             </CardContent>
                        </Card>

                        {/* Preparation Steps */}
                         <Card>
                             <CardHeader><CardTitle>Preparation Steps</CardTitle></CardHeader>
                             <CardContent className="space-y-4">
                                {prepSteps.map((step, i) => (
                                    <div key={i} className="flex items-start gap-2 p-2 border rounded-md">
                                        <span className="font-bold pt-2">{i+1}.</span>
                                        <Textarea placeholder="Describe this step..." value={step.description} onChange={e => handleStepChange(i, e.target.value)} className="flex-1" />
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeStepRow(i)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addStepRow}><PlusCircle className="mr-2 h-4 w-4" /> Add Step</Button>
                             </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        {/* Media */}
                        <Card>
                             <CardHeader><CardTitle>Media</CardTitle></CardHeader>
                            <CardContent>
                                <div className="border-2 border-dashed p-6 text-center">
                                    <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground mb-2"/>
                                    <Label htmlFor="images" className="text-primary font-semibold cursor-pointer">Click to upload main image</Label>
                                    <Input id="images" name="images" type="file" className="hidden"/>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pricing */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Product & Pricing</CardTitle>
                                <div className="flex items-center space-x-2 pt-2">
                                    <Checkbox id="isForSale" name="isForSale" />
                                    <Label htmlFor="isForSale">This item is for sale</Label>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Input name="price" type="number" placeholder="Price (KES)" />
                                <Input name="portionSize" placeholder="Portion Size (e.g., 1 Plate)" />
                                <Input name="deliveryTime" placeholder="Delivery Time (e.g., 30-60 mins)" />
                            </CardContent>
                        </Card>
                        
                        {/* Nutrition & Allergens */}
                        <Card>
                            <CardHeader><CardTitle>Nutrition & Allergens</CardTitle></CardHeader>
                            <CardContent>
                                 <div className="flex flex-wrap gap-4">
                                    {allergens.map(allergen => (
                                        <div key={allergen} className="flex items-center gap-2">
                                            <Checkbox id={allergen} name={allergen}/>
                                            <Label htmlFor={allergen}>{allergen}</Label>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
