
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

export function VendorKybTermsPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
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
        <Button variant="link" className="p-0 h-auto">Terms and Conditions</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>NestHub Vendor KYB Terms and Conditions</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[450px] pr-6" onScroll={handleScroll}>
            <div className="prose max-w-none">
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

            <p>Welcome to NestHub. These Vendor Know Your Business ("KYB") Terms and Conditions ("Terms") govern your access to and use of the NestHub platform as a vendor. By clicking "I Agree" and proceeding with your registration, you agree to be bound by these Terms.</p>

            <h4>1. Vendor Obligations</h4>
            <p>You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for all activities that occur under your account.</p>

            <h4>2. Data Privacy and Security</h4>
            <p>NestHub is committed to protecting your data. Our data practices are governed by our Privacy Policy. You agree to the collection, use, and sharing of your information as described in our Privacy Policy.</p>

            <h4>3. Compliance with Laws</h4>
            <p>You represent and warrant that you will comply with all applicable laws, rules, and regulations, including but not limited to, those related to anti-money laundering (AML) and counter-terrorist financing (CTF).</p>
            
            <h4>4. Prohibited Activities</h4>
            <p>You agree not to engage in any of the following prohibited activities: (a) providing false, inaccurate, or misleading information; (b) engaging in any fraudulent, deceptive, or illegal conduct; (c) infringing upon NestHub's or any third party's copyright, patent, trademark, trade secret or other intellectual property rights.</p>

            <h4>5. Termination</h4>
            <p>NestHub may, in its sole discretion, suspend or terminate your account and access to the platform, for any reason, including but not limited to, a breach of these Terms.</p>
            
            <h4>6. Limitation of Liability</h4>
            <p>In no event shall NestHub, its affiliates, or their respective officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the service; (ii) any conduct or content of any third party on the service; (iii) any content obtained from the service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>

            <h4>7. Governing Law</h4>
            <p>These Terms shall be governed and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions.</p>
            
            <p>By using the NestHub platform, you acknowledge that you have read, understood, and agree to be bound by these KYB Terms and Conditions.</p>
            </div>
        </ScrollArea>
        <div className="mt-4 flex items-center space-x-2">
            <Checkbox 
                id="terms" 
                disabled={!isScrolledToEnd}
                checked={isAgreed}
                onCheckedChange={() => setIsAgreed(!isAgreed)}
            />
            <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I have read and agree to the terms and conditions.
            </Label>
        </div>
        <Button onClick={handleAgreeAndContinue} disabled={!isAgreed} className="mt-4 w-full">
            Agree and Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
}
