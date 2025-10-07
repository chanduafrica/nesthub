
'use client';

import { useState, useMemo } from 'react';
import { Transaction, TransactionStatus, Client } from '@/lib/mock-data';
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
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Search, FileDown, CheckCircle, Truck, Package, XCircle } from 'lucide-react';
import { handleUpdateOrderStatus } from '@/app/vendor/(authed)/orders/actions';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface OrdersListProps {
    initialOrders: Transaction[];
    clients: Client[];
}

export function OrdersList({ initialOrders, clients }: OrdersListProps) {
    const [orders, setOrders] = useState<Transaction[]>(initialOrders);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<TransactionStatus | 'all'>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const { toast } = useToast();

    const clientMap = useMemo(() => new Map(clients.map(c => [c.id, c.name])), [clients]);

    const handleStatusChange = async (orderId: string, newStatus: TransactionStatus) => {
        try {
            await handleUpdateOrderStatus(orderId, newStatus);
            setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
            toast({
                title: 'Order Status Updated',
                description: `Order #${orderId.split('_')[1]} has been marked as ${newStatus}.`,
            });
        } catch (error) {
             toast({
                title: 'Error',
                description: 'Could not update order status.',
                variant: 'destructive',
            });
        }
    };

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const clientName = clientMap.get(order.clientId) || '';
            const searchMatch = clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                order.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                order.id.toLowerCase().includes(searchTerm.toLowerCase());
            const statusMatch = statusFilter === 'all' || order.status === statusFilter;
            return searchMatch && statusMatch;
        });
    }, [orders, searchTerm, statusFilter, clientMap]);

    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    const getStatusBadgeVariant = (status: TransactionStatus) => {
        switch (status) {
            case 'Completed': return 'default';
            case 'Pending': return 'secondary';
            case 'Refunded': return 'outline';
            case 'Failed': return 'destructive';
            default: return 'secondary';
        }
    };

    return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>My Orders</CardTitle>
            <CardDescription>View and manage all incoming and completed orders.</CardDescription>
        </div>
        <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search by order ID, customer, or product..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
           <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                    <SelectItem value="Refunded">Refunded</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.length > 0 ? paginatedOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id.split('_')[1]}</TableCell>
                  <TableCell>{clientMap.get(order.clientId) || 'Unknown Client'}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{order.description.replace('Purchase of ', '')}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>KES {order.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Pending')}><Package className="mr-2 h-4 w-4"/>Pending</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Completed')}><CheckCircle className="mr-2 h-4 w-4"/>Completed</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Failed')}><XCircle className="mr-2 h-4 w-4"/>Failed</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                    <TableCell colSpan={7} className="text-center h-24">
                        No orders found.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
       <CardFooter className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
                Showing <strong>{paginatedOrders.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{(currentPage - 1) * itemsPerPage + paginatedOrders.length}</strong> of <strong>{filteredOrders.length}</strong> orders
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
