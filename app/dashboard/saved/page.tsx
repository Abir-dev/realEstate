'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PropertyCard from '@/components/ui/property-card';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import {
  Heart,
  Search,
  Grid,
  List,
  ArrowLeft,
  Trash2,
  Share2
} from 'lucide-react';
import { getCurrentUser, mockProperties } from '@/lib/data';
import { User, Property } from '@/types';

export default function SavedPropertiesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    
    if (currentUser) {
      const saved = mockProperties.filter(property => 
        currentUser.savedProperties.includes(property.id)
      );
      setSavedProperties(saved);
      setFilteredProperties(saved);
    }
  }, []);

  useEffect(() => {
    let filtered = savedProperties.filter(property =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.state.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'area-large':
          return b.area - a.area;
        case 'area-small':
          return a.area - b.area;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    setFilteredProperties(filtered);
  }, [savedProperties, searchTerm, sortBy]);

  const handleRemoveProperty = (propertyId: string) => {
    setSavedProperties(prev => prev.filter(p => p.id !== propertyId));
    setFilteredProperties(prev => prev.filter(p => p.id !== propertyId));
  };

  const handleClearAll = () => {
    setSavedProperties([]);
    setFilteredProperties([]);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please log in to view your saved properties.</p>
          <Button asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const sortOptions = [
    { value: 'newest', label: 'Recently Saved' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'area-large', label: 'Area: Largest First' },
    { value: 'area-small', label: 'Area: Smallest First' },
  ];

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
                  <Heart className="h-6 w-6 mr-2 text-red-600" />
                  Saved Properties
                </h1>
                <p className="text-gray-600">
                  {filteredProperties.length} saved propert{filteredProperties.length !== 1 ? 'ies' : 'y'}
                </p>
              </div>
            </div>
            {savedProperties.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={handleClearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share List
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {savedProperties.length > 0 ? (
          <>
            {/* Filters and Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search saved properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Properties Grid/List */}
            {filteredProperties.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-6'
              }>
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onSave={handleRemoveProperty}
                    isSaved={true}
                    showAgent={true}
                    variant={viewMode}
                  />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No properties match your search
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search terms or clear the search to see all saved properties.
                  </p>
                  <Button variant="outline" onClick={() => setSearchTerm('')}>
                    Clear Search
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
                <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No saved properties yet
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Start exploring our property listings and save your favorites to keep track of properties you're interested in.
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