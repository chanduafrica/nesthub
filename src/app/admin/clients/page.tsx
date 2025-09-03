
'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Search, Gift, UserCheck, UserX } from 'lucide-react';
import Link from 'next/link';

const mockClients = [
  { id: '1', name: 'Wanjiku Kamau', email: 'wanjiku.kamau@gmail.com', phone: '254712345678', business: 125500, status: 'Active' },
  { id: '2', name: 'Musa Okello', email: 'musa.okello@yahoo.com', phone: '254787654321', business: 89000, status: 'Active' },
  { id: '3', name: 'Abebe Bikila', email: 'abebe.b@outlook.com', phone: '254711223344', business: 45000, status: 'Inactive' },
  { id: '4', name: 'Fatima Al-Hassan', email: 'fatima.hassan@protonmail.com', phone: '254722334455', business: 250000, status: 'Active' },
  { id: '5', name: 'Chinedu Okoro', email: 'chinedu.o@icloud.com', phone: '254733445566', business: 15200, status: 'Suspended' },
  { id: '6', name: 'Amina Yusuf', email: 'amina.yusuf@zoho.com', phone: '254701234567', business: 76500, status: 'Active' },
  { id: '7', name: 'Kofi Annan', email: 'kofi.annan@aol.com', phone: '254702345678', business: 180000, status: 'Active' },
  { id: '8', name: 'Zainab Ibrahim', email: 'zainab.ibrahim@mail.com', phone: '254744556677', business: 32000, status: 'Inactive' },
  { id: '9', name: 'Juma Omondi', email: 'juma.omondi@yandex.com', phone: '254755667788', business: 99000, status: 'Active' },
  { id: '10', name: 'Ngozi Okonjo-Iweala', email: 'ngozi.oi@live.com', phone: '254766778899', business: 550000, status: 'Active' },
];

type ClientStatus = 'Active' | 'Inactive' | 'Suspended';

export default function AllClientsPage() {
    const [clients, setClients] = useState(mockClients);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilters, setStatusFilters] = useState<Record<ClientStatus, boolean>>({
        Active: true,
        Inactive: true,
        Suspended: true,
    });
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleStatusFilterChange = (status: ClientStatus, checked: boolean) => {
        setStatusFilters(prev => ({ ...prev, [status]: checked }));
    };

    const filteredClients = clients.filter(client => {
        const searchMatch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            client.email.toLowerCase().includes(searchTerm.toLowerCase());
        const statusMatch = statusFilters[client.status as ClientStatus];
        return searchMatch && statusMatch;
    });

    const paginatedClients = filteredClients.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

    const formatCurrency = (amount: number) => {
        return `KES ${amount.toLocaleString('en-US')}`;
    }

    const handleAction = (action: string, clientId: string) => {
        console.log(`Performing '${action}' for client ID: ${clientId}`);
        // In a real app, you'd update state or call an API here.
        if (action === 'Activate') {
            setClients(clients.map(c => c.id === clientId ? {...c, status: 'Active'} : c));
        } else if (action === 'Deactivate') {
            setClients(clients.map(c => c.id === clientId ? {...c, status: 'Inactive'} : c));
        }
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Clients</CardTitle>
        <CardDescription>
          A consolidated list of all clients across all DigitalNest portals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search by name or email..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filters</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={statusFilters.Active}
                onCheckedChange={(checked) => handleStatusFilterChange('Active', !!checked)}
              >
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilters.Inactive}
                onCheckedChange={(checked) => handleStatusFilterChange('Inactive', !!checked)}
              >
                Inactive
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilters.Suspended}
                onCheckedChange={(checked) => handleStatusFilterChange('Suspended', !!checked)}
              >
                Suspended
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">Phone</TableHead>
                <TableHead>Consolidated Business</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedClients.map(client => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{client.email}</TableCell>
                   <TableCell className="hidden lg:table-cell">{client.phone}</TableCell>
                  <TableCell>{formatCurrency(client.business)}</TableCell>
                  <TableCell>
                    <Badge variant={
                        client.status === 'Active' ? 'default' : 
                        client.status === 'Inactive' ? 'secondary' : 'destructive'
                    }>
                        {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild><Link href="#">View Client 360</Link></DropdownMenuItem>
                         <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleAction('Activate', client.id)}>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Activate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleAction('Deactivate', client.id)}>
                            <UserX className="mr-2 h-4 w-4" />
                            Deactivate
                        </DropdownMenuItem>
                         <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-primary" onClick={() => handleAction('Offer Prize', client.id)}>
                            <Gift className="mr-2 h-4 w-4" />
                            Offer Prize
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
       <CardFooter className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
                Showing <strong>{paginatedClients.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{(currentPage - 1) * itemsPerPage + paginatedClients.length}</strong> of <strong>{filteredClients.length}</strong> clients
            </div>
            <div className="flex items-center gap-2">
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || totalPages === 0}
                >
                    Next
                </Button>
            </div>
      </CardFooter>
    </Card>
  );
}
