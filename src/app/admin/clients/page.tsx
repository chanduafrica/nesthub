
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
import { MoreHorizontal, PlusCircle, Search, Gift } from 'lucide-react';

const mockClients = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '254712345678', business: 'NestMall', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '254787654321', business: 'NestTravel', status: 'Active' },
  { id: '3', name: 'Peter Jones', email: 'peter@example.com', phone: '254711223344', business: 'NestEvents', status: 'Inactive' },
  { id: '4', name: 'Mary Anne', email: 'mary@example.com', phone: '254722334455', business: 'NestHomes', status: 'Active' },
  { id: '5', name: 'Chris Kim', email: 'chris@example.com', phone: '254733445566', business: 'NestEats', status: 'Suspended' },
  { id: '6', name: 'Alice Williams', email: 'alice@example.com', phone: '254701234567', business: 'NestMall', status: 'Active' },
  { id: '7', name: 'Bob Brown', email: 'bob@example.com', phone: '254702345678', business: 'NestTravel', status: 'Active' },
];

export default function AllClientsPage() {
    const [clients, setClients] = useState(mockClients);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedClients = filteredClients.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

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
              <DropdownMenuCheckboxItem>Active</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Inactive</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Suspended</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Client
          </Button>
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
                  <TableCell>{client.business}</TableCell>
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
                        <DropdownMenuItem>View Client 360</DropdownMenuItem>
                         <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-primary">
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
                Showing <strong>{(currentPage - 1) * itemsPerPage + 1}-{(currentPage - 1) * itemsPerPage + paginatedClients.length}</strong> of <strong>{filteredClients.length}</strong> clients
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
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
      </CardFooter>
    </Card>
  );
}
