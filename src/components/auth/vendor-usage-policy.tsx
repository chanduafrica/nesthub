
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

export function VendorUsagePolicyPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 2) { // Added a small buffer
      setIsScrolledToEnd(true);
    }
  };
  
  const handleAgreeAndContinue = () => {
    if (isAgreed) {
        setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-auto">Usage Policy</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>NestHub Vendor Usage Policy</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[450px] pr-6" onScroll={handleScroll}>
            <div className="prose max-w-none">
                <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

                <p>This Usage Policy outlines the standards of conduct for vendors on the NestHub platform. Your compliance with this policy ensures a safe, trustworthy, and reliable marketplace for all users.</p>

                <h4>1. Account Security and Responsibility</h4>
                <p>You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You must notify NestHub immediately of any unauthorized use of your account.</p>

                <h4>2. Lawful and Ethical Conduct</h4>
                <p>You agree to use the NestHub platform for lawful purposes only and to conduct your business in an ethical manner. You must comply with all applicable laws and regulations in the jurisdictions where you operate and sell goods or services.</p>

                <h4>3. Prohibited Content and Products</h4>
                <p>You are strictly prohibited from listing, advertising, or selling any products or services that are illegal, counterfeit, stolen, or that infringe upon the intellectual property rights of others. This includes, but is not limited to, illegal drugs, weapons, hazardous materials, and adult content.</p>
                
                <h4>4. Fair Business Practices</h4>
                <p>You must provide accurate and complete descriptions of your products and services. Deceptive pricing, misleading advertising, and unfair competition are strictly forbidden. All customer interactions should be professional and respectful.</p>

                <h4>5. Data Privacy</h4>
                <p>You must handle all customer data with the utmost care and in accordance with NestHub's Privacy Policy and applicable data protection laws. Misuse of customer personal information is a serious violation of this policy.</p>
                
                <h4>6. Policy Enforcement</h4>
                <p>Violations of this Usage Policy may result in a range of actions, including but not limited to, content removal, temporary suspension of your account, or permanent termination of your vendor privileges, at NestHub's sole discretion.</p>
                
                <h4>7. Reporting Violations</h4>
                <p>If you become aware of any violation of this Usage Policy by another vendor, you are encouraged to report it to NestHub support for investigation.</p>

                <p>By logging into your vendor account, you acknowledge that you have read, understood, and agree to be bound by this Usage Policy.</p>
            </div>
        </ScrollArea>
        <div className="mt-4 flex items-center space-x-2">
            <Checkbox 
                id="usage-policy-agreement" 
                disabled={!isScrolledToEnd}
                checked={isAgreed}
                onCheckedChange={() => setIsAgreed(!isAgreed)}
            />
            <Label htmlFor="usage-policy-agreement" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I have read and agree to the Usage Policy.
            </Label>
        </div>
        <Button onClick={handleAgreeAndContinue} disabled={!isAgreed} className="mt-4 w-full">
            Agree and Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
}
