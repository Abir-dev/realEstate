'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProtectedRoute from '@/components/auth/protected-route';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import {
  Home,
  Heart,
  MessageSquare,
  TrendingUp,
  Calendar,
  MapPin,
  DollarSign,
  Eye,
  Phone,
  Mail,
  Settings,
  Bell,
  User,
  ArrowRight,
  Plus,
  BarChart3
} from 'lucide-react';
import { getCurrentUser, mockProperties, mockInquiries } from '@/lib/data';
import { User as UserType, Property, Inquiry } from '@/types';

function DashboardContent() {
  const [user, setUser] = useState<UserType | null>(null);
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [recentViews, setRecentViews] = useState<Property[]>([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    
    if (currentUser) {
      // Get saved properties
      const saved = mockProperties.filter(property => 
        currentUser.savedProperties.includes(property.id)
      );
      setSavedProperties(saved);
      
      // Get user's inquiries
      const userInquiries = mockInquiries.filter(inquiry => 
        inquiry.userId === currentUser.id
      );
      setRecentInquiries(userInquiries);
      
      // Mock recent views (in a real app, this would come from tracking)
      setRecentViews(mockProperties.slice(0, 3));
    }
  }, []);

  const dashboardStats = [
    {
      title: 'Saved Properties',
      value: savedProperties.length,
      icon: Heart,
      color: 'text-red-600',
      bg: 'bg-red-50',
      href: '/dashboard/saved',
      description: 'Properties you\'ve saved'
    },
    {
      title: 'Active Inquiries',
      value: recentInquiries.filter(i => i.status === 'pending').length,
      icon: MessageSquare,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      href: '/dashboard/inquiries',
      description: 'Pending responses'
    },
    {
      title: 'Property Views',
      value: recentViews.length,
      icon: Eye,
      color: 'text-green-600',
      bg: 'bg-green-50',
      href: '/dashboard/activity',
      description: 'Recently viewed'
    },
    {
      title: 'Profile Complete',
      value: '85%',
      icon: User,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      href: '/dashboard/settings',
      description: 'Complete your profile'
    }
  ];

  const formatPrice = (price: number, status: Property['status']) => {
    if (status === 'for-rent') {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Page Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {user?.name?.split(' ')[0]}!
                </h1>
                <p className="text-gray-600 mt-1">Manage your properties and inquiries</p>
                <Badge variant="outline" className="mt-2 capitalize">
                  {user?.role} Account
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="shadow-sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              {(user?.role === 'agent' || user?.role === 'admin') && (
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                  <Link href="/add-property">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Property
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline" size="sm" className="shadow-sm">
                <Link href="/dashboard/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm">
                <Link href={stat.href}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">
                          {stat.value}
                        </p>
                        <p className="text-xs text-gray-500">
                          {stat.description}
                        </p>
                      </div>
                      <div className={`${stat.bg} p-4 rounded-xl shadow-sm`}>
                        <Icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Saved Properties */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-600" />
                Saved Properties
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="hover:bg-red-50">
                <Link href="/dashboard/saved" className="flex items-center text-red-600">
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {savedProperties.length > 0 ? (
                <div className="space-y-4">
                  {savedProperties.slice(0, 3).map((property) => (
                    <div key={property.id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/properties/${property.id}`}
                          className="font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-1 block"
                        >
                          {property.title}
                        </Link>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {property.location.city}, {property.location.state}
                        </div>
                        <div className="font-semibold text-blue-600 mt-1">
                          {formatPrice(property.price, property.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No saved properties yet</p>
                  <Button asChild variant="outline">
                    <Link href="/properties">Browse Properties</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Inquiries */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                Recent Inquiries
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="hover:bg-blue-50">
                <Link href="/dashboard/inquiries" className="flex items-center text-blue-600">
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {recentInquiries.length > 0 ? (
                <div className="space-y-4">
                  {recentInquiries.slice(0, 3).map((inquiry) => {
                    const property = mockProperties.find(p => p.id === inquiry.propertyId);
                    return (
                      <div key={inquiry.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getInquiryStatusColor(inquiry.status)}>
                            {inquiry.status}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(inquiry.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {property && (
                          <Link
                            href={`/properties/${property.id}`}
                            className="font-medium text-gray-900 hover:text-blue-600 transition-colors block mb-2"
                          >
                            {property.title}
                          </Link>
                        )}
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {inquiry.message}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No inquiries yet</p>
                  <Button asChild variant="outline">
                    <Link href="/properties">Start Browsing</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-center space-y-3 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                <Link href="/properties">
                  <Home className="h-8 w-8 text-blue-600" />
                  <span className="font-medium">Browse Properties</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-center space-y-3 hover:bg-red-50 hover:border-red-200 transition-colors">
                <Link href="/dashboard/saved">
                  <Heart className="h-8 w-8 text-red-600" />
                  <span className="font-medium">Saved Properties</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-center space-y-3 hover:bg-green-50 hover:border-green-200 transition-colors">
                <Link href="/dashboard/inquiries">
                  <MessageSquare className="h-8 w-8 text-green-600" />
                  <span className="font-medium">My Inquiries</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-center space-y-3 hover:bg-purple-50 hover:border-purple-200 transition-colors">
                <Link href="/dashboard/settings">
                  <Settings className="h-8 w-8 text-purple-600" />
                  <span className="font-medium">Account Settings</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute requireAuth={true}>
      <DashboardContent />
    </ProtectedRoute>
  );
}