
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

export type SearchFilters = {
    type: 'all' | 'rent' | 'sale';
    keyword: string;
    location: string;
    beds: string;
    baths: string;
    minArea: string;
    propId: string;
};

interface SearchFormProps {
    filters: SearchFilters;
    onFilterChange: (newFilters: Partial<SearchFilters>) => void;
}


export function SearchForm({ filters, onFilterChange }: SearchFormProps) {
    const [advanced, setAdvanced] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange({ [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name: keyof SearchFilters) => (value: string) => {
        onFilterChange({ [name]: value });
    };


    return (
        <Card className="shadow-lg">
            <CardContent className="p-4">
                <Tabs defaultValue={filters.type} onValueChange={(value) => handleSelectChange('type')(value as SearchFilters['type'])} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-gray-100 mb-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="rent">For Rent</TabsTrigger>
                        <TabsTrigger value="sale">For Sale</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all"><SearchFields advanced={advanced} setAdvanced={setAdvanced} filters={filters} onInputChange={handleInputChange} onSelectChange={handleSelectChange} /></TabsContent>
                    <TabsContent value="rent"><SearchFields advanced={advanced} setAdvanced={setAdvanced} filters={filters} onInputChange={handleInputChange} onSelectChange={handleSelectChange} /></TabsContent>
                    <TabsContent value="sale"><SearchFields advanced={advanced} setAdvanced={setAdvanced} filters={filters} onInputChange={handleInputChange} onSelectChange={handleSelectChange} /></TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}

interface SearchFieldsProps {
    advanced: boolean;
    setAdvanced: (val: boolean) => void;
    filters: SearchFilters;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectChange: (name: keyof SearchFilters) => (value: string) => void;
}


function SearchFields({ advanced, setAdvanced, filters, onInputChange, onSelectChange }: SearchFieldsProps) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                <div className="lg:col-span-1">
                    <Label htmlFor="keyword" className="font-semibold">Keyword</Label>
                    <Input id="keyword" name="keyword" type="text" placeholder="any" value={filters.keyword} onChange={onInputChange} />
                </div>
                <div>
                     <Label htmlFor="type" className="font-semibold">Category</Label>
                    <Select value={filters.type} onValueChange={onSelectChange('type')}>
                        <SelectTrigger>
                            <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                     <Label htmlFor="location" className="font-semibold">Location</Label>
                    <Select value={filters.location} onValueChange={onSelectChange('location')}>
                        <SelectTrigger>
                            <SelectValue placeholder="All Locations" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">All Locations</SelectItem>
                            <SelectItem value="kilimani">Kilimani</SelectItem>
                            <SelectItem value="karen">Karen</SelectItem>
                            <SelectItem value="lavington">Lavington</SelectItem>
                             <SelectItem value="westlands">Westlands</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                     <Label htmlFor="beds" className="font-semibold">Beds</Label>
                    <Select value={filters.beds} onValueChange={onSelectChange('beds')}>
                        <SelectTrigger>
                            <SelectValue placeholder="All Beds" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Beds</SelectItem>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4+">4+</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="flex gap-2">
                    <Button className="w-full">
                        <Search className="mr-2 h-4 w-4" /> Search
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => setAdvanced(!advanced)}>
                        <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {advanced && (
                 <div className="pt-4 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <Label htmlFor="baths" className="font-semibold">Baths</Label>
                            <Select value={filters.baths} onValueChange={onSelectChange('baths')}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Baths" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Baths</SelectItem>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3+">3+</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="min-area" className="font-semibold">Min Area (sqft)</Label>
                            <Input id="min-area" name="minArea" type="number" placeholder="e.g. 1200" value={filters.minArea} onChange={onInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="propId" className="font-semibold">Property ID</Label>
                            <Input id="propId" name="propId" type="text" placeholder="any" value={filters.propId} onChange={onInputChange} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
