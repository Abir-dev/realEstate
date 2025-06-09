'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ProtectedRoute from '@/components/auth/protected-route';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import {
  Home,
  Users,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Eye,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  BarChart3,
  PieChart,
  Activity,
  Shield,
  Settings,
  Bell
} from 'lucide-react';
import { getProperties, mockUsers, mockInquiries, getCurrentUser } from '@/lib/data';
import { Property, User, Inquiry } from '@/types';

function AdminDashboardContent() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'properties' | 'users' | 'inquiries'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    
    setProperties(getProperties());
    setUsers(mockUsers);
    setInquiries(mockInquiries);
  }, []);

  // Calculate stats
  const totalProperties = properties.length;
  const activeListings = properties.filter(p => p.status === 'for-sale' || p.status === 'for-rent').length;
  const soldRented = properties.filter(p => p.status === 'sold' || p.status === 'rented').length;
  const totalUsers = users.filter(u => u.role === 'client').length;
  const pendingInquiries = inquiries.filter(i => i.status === 'pending').length;
  const totalRevenue = properties.filter(p => p.status === 'sold').reduce((sum, p) => sum + p.price, 0);

  const dashboardStats = [
    {
      title: 'Total Properties',
      value: totalProperties,
      icon: Home,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      change: '+12%',
      changeType: 'positive' as const,
      description: 'Properties in system'
    },
    {
      title: 'Active Listings',
      value: activeListings,
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50',
      change: '+8%',
      changeType: 'positive' as const,
      description: 'Currently available'
    },
    {
      title: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      change: '+24%',
      changeType: 'positive' as const,
      description: 'Registered clients'
    },
    {
      title: 'Pending Inquiries',
      value: pendingInquiries,
      icon: MessageSquare,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      change: '-3%',
      changeType: 'negative' as const,
      description: 'Awaiting response'
    },
    {
      title: 'Revenue',
      value: `$${(totalRevenue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      change: '+18%',
      changeType: 'positive' as const,
      description: 'Total sales value'
    },
    {
      title: 'Monthly Views',
      value: '15.2K',
      icon: Eye,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      change: '+32%',
      changeType: 'positive' as const,
      description: 'Property page views'
    }
  ];

  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case 'for-sale':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'for-rent':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sold':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rented':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInquiryStatusColor = (status: Inquiry['status']) => {
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

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInquiries = inquiries.filter(inquiry => {
    const property = properties.find(p => p.id === inquiry.propertyId);
    const user = users.find(u => u.id === inquiry.userId);
    const matchesSearch = property?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      {/* Page Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">Comprehensive system management and analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="shadow-sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" className="shadow-sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Reports
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-xl shadow-sm border">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'properties', label: 'Properties', icon: Home },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'inquiries', label: 'Inquiries', icon: MessageSquare }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            {stat.title}
                          </p>
                          <p className="text-3xl font-bold text-gray-900 mb-1">
                            {stat.value}
                          </p>
                          <p className="text-xs text-gray-500 mb-2">
                            {stat.description}
                          </p>
                          <div className={`flex items-center text-sm font-medium ${
                            stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            <span>{stat.change} from last month</span>
                          </div>
                        </div>
                        <div className={`${stat.bg} p-4 rounded-xl shadow-sm`}>
                          <Icon className={`h-8 w-8 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-blue-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inquiries.slice(0, 5).map((inquiry) => {
                      const property = properties.find(p => p.id === inquiry.propertyId);
                      const user = users.find(u => u.id === inquiry.userId);
                      return (
                        <div key={inquiry.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors">
                          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                            <AvatarImage src={user?.avatar} alt={user?.name} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                              {user?.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                              {user?.name} inquired about {property?.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(inquiry.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className={getInquiryStatusColor(inquiry.status)}>
                            {inquiry.status}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Top Properties */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-600" />
                    Top Properties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {properties.filter(p => p.featured).slice(0, 5).map((property) => (
                      <div key={property.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors">
                        <div className="w-14 h-14 bg-gray-200 rounded-xl overflow-hidden shadow-sm">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {property.title}
                          </p>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {property.location.city}, {property.location.state}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-blue-600">
                            ${property.price.toLocaleString()}
                          </p>
                          <Badge className={getStatusColor(property.status)}>
                            {property.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Properties Tab */}
        {selectedTab === 'properties' && (
          <div className="space-y-6">
            {/* Filters */}
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search properties..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px] border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="for-sale">For Sale</SelectItem>
                      <SelectItem value="for-rent">For Rent</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                      <SelectItem value="rented">Rented</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Property
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Properties Table */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="font-semibold text-gray-700">Property</TableHead>
                    <TableHead className="font-semibold text-gray-700">Location</TableHead>
                    <TableHead className="font-semibold text-gray-700">Price</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700">Agent</TableHead>
                    <TableHead className="font-semibold text-gray-700">Created</TableHead>
                    <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.map((property) => (
                    <TableRow key={property.id} className="border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-14 h-14 bg-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{property.title}</p>
                            <p className="text-sm text-gray-500">
                              {property.bedrooms} bed, {property.bathrooms} bath
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="text-gray-900 font-medium">{property.location.city}</p>
                          <p className="text-gray-500">{property.location.state}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold text-gray-900">${property.price.toLocaleString()}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(property.status)}>
                          {property.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8 border border-gray-200">
                            <AvatarImage src={property.agent.avatar} alt={property.agent.name} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                              {property.agent.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{property.agent.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-500">
                          {new Date(property.createdAt).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-red-200 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}

        {/* Users Tab */}
        {selectedTab === 'users' && (
          <div className="space-y-6">
            {/* Filters */}
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="font-semibold text-gray-700">User</TableHead>
                    <TableHead className="font-semibold text-gray-700">Role</TableHead>
                    <TableHead className="font-semibold text-gray-700">Contact</TableHead>
                    <TableHead className="font-semibold text-gray-700">Properties</TableHead>
                    <TableHead className="font-semibold text-gray-700">Inquiries</TableHead>
                    <TableHead className="font-semibold text-gray-700">Joined</TableHead>
                    <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12 border-2 border-gray-200 shadow-sm">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize font-medium">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          {user.phone && (
                            <div className="flex items-center space-x-1">
                              <Phone className="h-3 w-3 text-gray-400" />
                              <span>{user.phone}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{user.savedProperties.length} saved</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{user.inquiries.length} inquiries</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="hover:bg-gray-50">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}

        {/* Inquiries Tab */}
        {selectedTab === 'inquiries' && (
          <div className="space-y-6">
            {/* Filters */}
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search inquiries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px] border-gray-200 focus:border-blue-500 focus:ring-blue-500">
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
              </CardContent>
            </Card>

            {/* Inquiries Table */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="font-semibold text-gray-700">User</TableHead>
                    <TableHead className="font-semibold text-gray-700">Property</TableHead>
                    <TableHead className="font-semibold text-gray-700">Message</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700">Date</TableHead>
                    <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInquiries.map((inquiry) => {
                    const property = properties.find(p => p.id === inquiry.propertyId);
                    const user = users.find(u => u.id === inquiry.userId);
                    return (
                      <TableRow key={inquiry.id} className="border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10 border-2 border-gray-200 shadow-sm">
                              <AvatarImage src={user?.avatar} alt={user?.name} />
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                {user?.name?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{user?.name}</p>
                              <p className="text-sm text-gray-500">{user?.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{property?.title}</p>
                            <p className="text-sm text-gray-500">
                              {property?.location.city}, {property?.location.state}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm line-clamp-2 max-w-xs">
                            {inquiry.message}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge className={getInquiryStatusColor(inquiry.status)}>
                            {inquiry.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-500">
                            {new Date(inquiry.createdAt).toLocaleDateString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200">
                              Reply
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-gray-50">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute requireAuth={true} requireAdmin={true}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}