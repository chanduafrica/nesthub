'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

export function SearchForm() {
    const [advanced, setAdvanced] = useState(false);

    return (
        <Card className="shadow-lg">
            <CardContent className="p-4">
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-gray-100 mb-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="rent">For Rent</TabsTrigger>
                        <TabsTrigger value="sale">For Sale</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all"><SearchFields advanced={advanced} setAdvanced={setAdvanced} /></TabsContent>
                    <TabsContent value="rent"><SearchFields advanced={advanced} setAdvanced={setAdvanced} /></TabsContent>
                    <TabsContent value="sale"><SearchFields advanced={advanced} setAdvanced={setAdvanced} /></TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}

function SearchFields({ advanced, setAdvanced }: { advanced: boolean, setAdvanced: (val: boolean) => void }) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                <div className="lg:col-span-1">
                    <Label htmlFor="keyword" className="font-semibold">Keyword</Label>
                    <Input id="keyword" type="text" placeholder="any" />
                </div>
                <div>
                     <Label htmlFor="type" className="font-semibold">Type</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                     <Label htmlFor="location" className="font-semibold">Location</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="All Locations" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">All Locations</SelectItem>
                            <SelectItem value="kilimani">Kilimani</SelectItem>
                            <SelectItem value="karen">Karen</SelectItem>
                            <SelectItem value="lavington">Lavington</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                     <Label htmlFor="beds" className="font-semibold">Beds</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="All Beds" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="any">All Beds</SelectItem>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4+">4+</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="flex gap-2">
                    <Button style={{ backgroundColor: 'hsl(var(--nesthomes-accent))' }} className="hover:bg-primary/90 w-full">
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
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Baths" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="any">All Baths</SelectItem>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3+">3+</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div>
                            <Label htmlFor="agent" className="font-semibold">Agent</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Agents" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="any">All Agents</SelectItem>
                                    <SelectItem value="jane-doe">Jane Doe</SelectItem>
                                    <SelectItem value="john-smith">John Smith</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="min-area" className="font-semibold">Min Area</Label>
                            <Input id="min-area" type="text" placeholder="e.g. 1200 sq ft" />
                        </div>
                        <div>
                            <Label htmlFor="prop-id" className="font-semibold">Property ID</Label>
                            <Input id="prop-id" type="text" placeholder="any" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
