
'use client';

import { useState, Fragment } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Barcode, Bot, Loader2, Minus, Plus, Send, Sparkles, X, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { searchDuka, DukaSearchOutput } from '@/ai/flows/duka-search-flow';
import type { DukaProduct } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

type CartItem = DukaSearchOutput[0] & { product: DukaProduct };

export function SearchDuka({ allProducts }: { allProducts: DukaProduct[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);
    const { toast } = useToast();
    
    const productMap = new Map(allProducts.map(p => [p.id, p]));

    const handleSearchSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setCart([]);
        try {
            const result = await searchDuka(query);
            if (result.length === 0) {
                toast({ title: 'No suggestions found', description: 'Try rephrasing your request.', variant: 'destructive' });
            } else {
                 const newCart: CartItem[] = result
                    .map(item => {
                        const product = productMap.get(item.productId);
                        return product ? { ...item, product } : null;
                    })
                    .filter((item): item is CartItem => item !== null);
                setCart(newCart);
            }
        } catch (error) {
            console.error("AI Search Error:", error);
            toast({ title: 'AI Error', description: 'The shopping assistant is unavailable right now.', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    const updateQuantity = (productId: string, change: number) => {
        setCart(currentCart =>
            currentCart.map(item =>
                item.productId === productId
                    ? { ...item, quantity: Math.max(0, item.quantity + change) }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    const totalCost = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <>
             <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-5 right-5 h-14 w-auto px-4 rounded-full shadow-lg bg-gradient-to-r from-primary to-secondary text-white"
                size="lg"
            >
                <Sparkles className="mr-2 h-5 w-5" />
                AI Shopper
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle className="text-2xl flex items-center gap-2">
                           <Bot className="text-primary"/> SearchDuka AI
                        </DialogTitle>
                        <DialogDescription>
                            Describe your shopping needs, and I'll create a cart for you. e.g., "Weekly groceries for a family of 4 on a KES 5000 budget."
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
                        {/* Left Side: Chat and Input */}
                        <div className="flex flex-col h-full">
                            <form onSubmit={handleSearchSubmit} className="flex gap-2">
                                <Input
                                    placeholder="What are you shopping for today?"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    disabled={isLoading}
                                    className="h-11"
                                />
                                <Button type="submit" size="icon" className="h-11 w-11" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                                </Button>
                            </form>
                            
                            {isLoading && (
                                <div className="flex flex-col items-center justify-center flex-grow text-center">
                                    <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                                    <p className="font-semibold">DukaDash is building your cart...</p>
                                    <p className="text-sm text-muted-foreground">Please wait a moment.</p>
                                </div>
                            )}

                             {!isLoading && cart.length === 0 && (
                                <div className="flex flex-col items-center justify-center flex-grow text-center bg-muted/50 rounded-lg mt-4">
                                    <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                                    <p className="font-semibold">Your AI-generated cart will appear here</p>
                                </div>
                            )}
                        </div>

                        {/* Right Side: Cart */}
                        <div className="flex flex-col h-full overflow-hidden">
                             <Card className="flex-grow flex flex-col">
                                <CardHeader>
                                    <CardTitle>Suggested Shopping Cart</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow overflow-y-auto pr-3">
                                   {cart.length > 0 ? (
                                        <div className="space-y-3">
                                            {cart.map(item => (
                                                <div key={item.productId} className="flex items-center gap-4 border-b pb-3">
                                                    <Image src={item.product.images[0]} alt={item.product.name} width={60} height={60} className="rounded-md object-cover" />
                                                    <div className="flex-grow">
                                                        <p className="font-semibold text-sm">{item.product.name}</p>
                                                        <p className="text-xs text-muted-foreground">KES {item.product.price.toLocaleString()}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.productId, -1)}><Minus className="h-4 w-4" /></Button>
                                                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                                                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.productId, 1)}><Plus className="h-4 w-4" /></Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                         <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                                            Your cart is empty.
                                        </div>
                                    )}
                                </CardContent>
                             </Card>
                        </div>
                    </div>
                    
                    <DialogFooter className="mt-auto pt-4 border-t">
                        <div className="flex justify-between items-center w-full">
                            <div>
                                <span className="text-muted-foreground">Total:</span>
                                <span className="text-2xl font-bold ml-2">KES {totalCost.toLocaleString()}</span>
                            </div>
                            <Button size="lg" disabled={cart.length === 0}>Proceed to Checkout</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
