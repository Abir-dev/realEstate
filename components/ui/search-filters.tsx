'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  Search, 
  MapPin, 
  Home, 
  DollarSign, 
  Bed, 
  Bath, 
  Square,
  SlidersHorizontal,
  ChevronDown,
  X
} from 'lucide-react';
import { SearchFilters } from '@/types';

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void;
  showAdvanced?: boolean;
}

export default function SearchFiltersComponent({ onFiltersChange, showAdvanced = false }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(showAdvanced);

  const updateFilter = (key: keyof SearchFilters, value: string | number | undefined) => {
    const newFilters = {
      ...filters,
      [key]: value === 'all' ? undefined : value
    };
    
    // Remove undefined values
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key as keyof SearchFilters] === undefined) {
        delete newFilters[key as keyof SearchFilters];
      }
    });
    
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFiltersChange({});
  };

  const activeFiltersCount = Object.keys(filters).length;

  return (
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardContent className="p-6">
        {/* Basic Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-2">
            <Label htmlFor="location" className="text-sm font-medium text-gray-700 mb-2 block">
              Location
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="location"
                placeholder="City, State, or ZIP"
                value={filters.location || ''}
                onChange={(e) => updateFilter('location', e.target.value || undefined)}
                className="pl-11 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="type" className="text-sm font-medium text-gray-700 mb-2 block">
              Property Type
            </Label>
            <Select value={filters.type || 'all'} onValueChange={(value) => updateFilter('type', value)}>
              <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                <Home className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status" className="text-sm font-medium text-gray-700 mb-2 block">
              Status
            </Label>
            <Select value={filters.status || 'all'} onValueChange={(value) => updateFilter('status', value)}>
              <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="for-sale">For Sale</SelectItem>
                <SelectItem value="for-rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
          <div className="flex items-center justify-between">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2 hover:bg-gray-50">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Advanced Filters</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            
            <div className="flex items-center space-x-2">
              {activeFiltersCount > 0 && (
                <>
                  <Badge variant="secondary\" className="bg-blue-100 text-blue-800">
                    {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-500 hover:text-gray-700">
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                </>
              )}
            </div>
          </div>

          <CollapsibleContent className="space-y-4 mt-4">
            {/* Price Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minPrice" className="text-sm font-medium text-gray-700 mb-2 block">
                  Min Price
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="minPrice"
                    type="number"
                    placeholder="Min Price"
                    value={filters.minPrice || ''}
                    onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="maxPrice" className="text-sm font-medium text-gray-700 mb-2 block">
                  Max Price
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="maxPrice"
                    type="number"
                    placeholder="Max Price"
                    value={filters.maxPrice || ''}
                    onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Bedrooms and Bathrooms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bedrooms" className="text-sm font-medium text-gray-700 mb-2 block">
                  Bedrooms
                </Label>
                <Select value={filters.bedrooms?.toString() || 'all'} onValueChange={(value) => updateFilter('bedrooms', value === 'all' ? undefined : Number(value))}>
                  <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                    <Bed className="h-4 w-4 mr-2 text-gray-400" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Bedrooms</SelectItem>
                    <SelectItem value="0">Studio</SelectItem>
                    <SelectItem value="1">1+ Bedroom</SelectItem>
                    <SelectItem value="2">2+ Bedrooms</SelectItem>
                    <SelectItem value="3">3+ Bedrooms</SelectItem>
                    <SelectItem value="4">4+ Bedrooms</SelectItem>
                    <SelectItem value="5">5+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bathrooms" className="text-sm font-medium text-gray-700 mb-2 block">
                  Bathrooms
                </Label>
                <Select value={filters.bathrooms?.toString() || 'all'} onValueChange={(value) => updateFilter('bathrooms', value === 'all' ? undefined : Number(value))}>
                  <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                    <Bath className="h-4 w-4 mr-2 text-gray-400" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Bathrooms</SelectItem>
                    <SelectItem value="1">1+ Bathroom</SelectItem>
                    <SelectItem value="2">2+ Bathrooms</SelectItem>
                    <SelectItem value="3">3+ Bathrooms</SelectItem>
                    <SelectItem value="4">4+ Bathrooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Area Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minArea" className="text-sm font-medium text-gray-700 mb-2 block">
                  Min Area (sq ft)
                </Label>
                <div className="relative">
                  <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="minArea"
                    type="number"
                    placeholder="Min Area"
                    value={filters.minArea || ''}
                    onChange={(e) => updateFilter('minArea', e.target.value ? Number(e.target.value) : undefined)}
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="maxArea" className="text-sm font-medium text-gray-700 mb-2 block">
                  Max Area (sq ft)
                </Label>
                <div className="relative">
                  <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="maxArea"
                    type="number"
                    placeholder="Max Area"
                    value={filters.maxArea || ''}
                    onChange={(e) => updateFilter('maxArea', e.target.value ? Number(e.target.value) : undefined)}
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Search Button */}
        <div className="flex justify-center mt-6">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200">
            <Search className="h-5 w-5 mr-2" />
            Search Properties
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}