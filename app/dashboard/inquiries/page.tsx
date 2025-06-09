'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import {
  MessageSquare,
  Search,
  ArrowLeft,
  Eye,
  Reply,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { getCurrentUser, mockProperties, mockInquiries } from '@/lib/data';
import { User, Property, Inquiry } from '@/types';

export default function InquiriesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setProperties(mockProperties);
    
    if (currentUser) {
      const userInquiries = mockInquiries.filter(inquiry => 
        inquiry.userId === currentUser.id
      );
      setInquiries(userInquiries);
      setFilteredInquiries(userInquiries);
    }
  }, []);

  useEffect(() => {
    let filtered = inquiries.filter(inquiry => {
      const property = properties.find(p => p.id === inquiry.propertyId);
      const matchesSearch = property?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property?.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           inquiry.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    setFilteredInquiries(filtered);
  }, [inquiries, searchTerm, statusFilter, properties]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please log in to view your inquiries.</p>
          <Button asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status: Inquiry['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'responded':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: Inquiry['status']) => {
    switch (status) {
      case 'pending':
        return Clock;
      case 'responded':
        return CheckCircle;
      case 'closed':
        return XCircle;
      default:
        return Clock;
    }
  };

  const statusStats = {
    total: inquiries.length,
    pending: inquiries.filter(i => i.status === 'pending').length,
    responded: inquiries.filter(i => i.status === 'responded').length,
    closed: inquiries.filter(i => i.status === 'closed').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <MessageSquare className="h-6 w-6 mr-2 text-blue-600" />
                  My Inquiries
                </h1>
                <p className="text-gray-600">
                  {filteredInquiries.length} inquir{filteredInquiries.length !== 1 ? 'ies' : 'y'}
                </p>
              </div>
            </div>
            <Button asChild>
              <Link href="/properties">
                Browse Properties
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{statusStats.total}</div>
                <div className="text-sm text-gray-600">Total Inquiries</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{statusStats.pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{statusStats.responded}</div>
                <div className="text-sm text-gray-600">Responded</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{statusStats.closed}</div>
                <div className="text-sm text-gray-600">Closed</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {inquiries.length > 0 ? (
          <>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search inquiries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="responded">Responded</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Inquiries List */}
            {filteredInquiries.length > 0 ? (
              <div className="space-y-4">
                {filteredInquiries.map((inquiry) => {
                  const property = properties.find(p => p.id === inquiry.propertyId);
                  const StatusIcon = getStatusIcon(inquiry.status);
                  
                  return (
                    <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <StatusIcon className="h-5 w-5 text-gray-400" />
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {property?.title || 'Property Not Found'}
                              </h3>
                              {property && (
                                <div className="flex items-center text-sm text-gray-500">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {property.location.city}, {property.location.state}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge className={getStatusColor(inquiry.status)}>
                              {inquiry.status}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(inquiry.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-gray-700 text-sm mb-2">Your Message:</p>
                          <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                            {inquiry.message}
                          </p>
                        </div>

                        {inquiry.response && (
                          <div className="mb-4">
                            <p className="text-gray-700 text-sm mb-2">Agent Response:</p>
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <p className="text-gray-600 mb-2">{inquiry.response}</p>
                              <p className="text-xs text-gray-500">
                                Responded on {new Date(inquiry.respondedAt!).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {property && (
                              <>
                                <Button variant="outline\" size="sm\" asChild>
                                  <Link href={`/properties/${property.id}`}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Property
                                  </Link>
                                </Button>
                                {property.agent && (
                                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Phone className="h-3 w-3" />
                                    <span>{property.agent.phone}</span>
                                    <Mail className="h-3 w-3 ml-2" />
                                    <span>{property.agent.email}</span>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedInquiry(inquiry)}
                              >
                                <Reply className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Inquiry Details</DialogTitle>
                                <DialogDescription>
                                  View full inquiry conversation and details
                                </DialogDescription>
                              </DialogHeader>
                              
                              {selectedInquiry && (
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <Badge className={getStatusColor(selectedInquiry.status)}>
                                      {selectedInquiry.status}
                                    </Badge>
                                    <span className="text-sm text-gray-500">
                                      {new Date(selectedInquiry.createdAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-medium mb-2">Property</h4>
                                    <p className="text-gray-600">{property?.title}</p>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-medium mb-2">Your Message</h4>
                                    <p className="text-gray-600 bg-gray-50 p-3 rounded">
                                      {selectedInquiry.message}
                                    </p>
                                  </div>
                                  
                                  {selectedInquiry.response && (
                                    <div>
                                      <h4 className="font-medium mb-2">Agent Response</h4>
                                      <div className="bg-blue-50 p-3 rounded">
                                        <p className="text-gray-600 mb-2">{selectedInquiry.response}</p>
                                        <p className="text-xs text-gray-500">
                                          {new Date(selectedInquiry.respondedAt!).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No inquiries match your search
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search terms or filter settings.
                  </p>
                  <Button variant="outline" onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          /* Empty State */
          <Card className="text-center py-16">
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <MessageSquare className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No inquiries yet
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    You haven't made any property inquiries yet. Start exploring our listings and reach out to agents about properties you're interested in.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild>
                      <Link href="/properties">
                        <Search className="h-4 w-4 mr-2" />
                        Browse Properties
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/dashboard">
                        Back to Dashboard
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}