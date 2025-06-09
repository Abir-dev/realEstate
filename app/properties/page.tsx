'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PropertyCard from '@/components/ui/property-card';
import SearchFiltersComponent from '@/components/ui/search-filters';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Grid, List, SlidersHorizontal, MapPin } from 'lucide-react';
import { getProperties } from '@/lib/data';
import { Property, SearchFilters } from '@/types';

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [savedProperties, setSavedProperties] = useState<string[]>([]);

  useEffect(() => {
    const allProperties = getProperties();
    setProperties(allProperties);
    setFilteredProperties(allProperties);
  }, []);

  useEffect(() => {
    // Filter and sort properties based on current filters and sort option
    let filtered = properties.filter(property => {
      if (filters.location && !property.location.city.toLowerCase().includes(filters.location.toLowerCase()) && 
          !property.location.state.toLowerCase().includes(filters.location.toLowerCase()) &&
          !property.location.address.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      if (filters.type && property.type !== filters.type) return false;
      if (filters.status && property.status !== filters.status) return false;
      if (filters.minPrice && property.price < filters.minPrice) return false;
      if (filters.maxPrice && property.price > filters.maxPrice) return false;
      if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false;
      if (filters.bathrooms && property.bathrooms < filters.bathrooms) return false;
      if (filters.minArea && property.area < filters.minArea) return false;
      if (filters.maxArea && property.area > filters.maxArea) return false;
      return true;
    });

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
  }, [properties, filters, sortBy]);

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const handleSaveProperty = (propertyId: string) => {
    setSavedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'area-large', label: 'Area: Largest First' },
    { value: 'area-small', label: 'Area: Smallest First' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Explore Properties
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover your perfect home from our extensive collection of premium properties
            </p>
          </div>
        </div>
      </section>

      {/* Search Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchFiltersComponent onFiltersChange={handleFiltersChange} showAdvanced />
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredProperties.length} Properties Found
              </h2>
              {Object.keys(filters).some(key => filters[key as keyof SearchFilters]) && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <SlidersHorizontal className="h-3 w-3 mr-1" />
                  Filtered
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
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
          </div>

          {/* Results Grid/List */}
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
                  onSave={handleSaveProperty}
                  isSaved={savedProperties.includes(property.id)}
                  showAgent={true}
                />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <MapPin className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Properties Found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      We couldn't find any properties matching your search criteria.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setFilters({});
                        setFilteredProperties(properties);
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Load More (Placeholder) */}
          {filteredProperties.length > 0 && filteredProperties.length >= 6 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Properties
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}