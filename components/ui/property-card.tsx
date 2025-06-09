'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  Phone,
  Mail,
  Eye
} from 'lucide-react';
import { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
  onSave?: (propertyId: string) => void;
  isSaved?: boolean;
  showAgent?: boolean;
  variant?: 'default' | 'list';
}

const PropertyCard = ({ 
  property, 
  onSave, 
  isSaved = false, 
  showAgent = false,
  variant = 'default' 
}: PropertyCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const formatPrice = (price: number) => {
    if (property.status === 'for-rent') {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

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

  const getStatusText = (status: Property['status']) => {
    switch (status) {
      case 'for-sale':
        return 'For Sale';
      case 'for-rent':
        return 'For Rent';
      case 'sold':
        return 'Sold';
      case 'rented':
        return 'Rented';
      default:
        return status;
    }
  };

  if (variant === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-md">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative md:w-80 h-64 md:h-auto overflow-hidden">
            <Link href={`/properties/${property.id}`}>
              <div className="relative h-full group cursor-pointer">
                <Image
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onLoad={() => setIsImageLoading(false)}
                />
                {isImageLoading && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className={getStatusColor(property.status)}>
                    {getStatusText(property.status)}
                  </Badge>
                </div>

                {/* Featured Badge */}
                {property.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      Featured
                    </Badge>
                  </div>
                )}

                {/* Image Counter */}
                {property.images.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    1/{property.images.length}
                  </div>
                )}
              </div>
            </Link>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <Link href={`/properties/${property.id}`}>
                    <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1 mb-2">
                      {property.title}
                    </h3>
                  </Link>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="text-sm line-clamp-1">
                      {property.location.address}, {property.location.city}, {property.location.state}
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-2 ml-4">
                  {onSave && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        onSave(property.id);
                      }}
                      className={`border-gray-200 ${isSaved ? 'text-red-600 bg-red-50' : 'text-gray-600'}`}
                    >
                      <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="border-gray-200 text-gray-600">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="text-2xl font-bold text-blue-600 mb-3">
                {formatPrice(property.price)}
              </div>

              {/* Property Details */}
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                {property.bedrooms > 0 && (
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-4 w-4 mr-1" />
                  <span>{property.area.toLocaleString()} sqft</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                {property.description}
              </p>
            </div>

            {/* Agent Info */}
            {showAgent && (
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={property.agent.avatar} alt={property.agent.name} />
                    <AvatarFallback>{property.agent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{property.agent.name}</div>
                    <div className="text-xs text-gray-500">Real Estate Agent</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Phone className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Mail className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md group">
      <div className="relative h-64 overflow-hidden">
        <Link href={`/properties/${property.id}`}>
          <div className="relative h-full cursor-pointer">
            <Image
              src={property.images[currentImageIndex]}
              alt={property.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onLoad={() => setIsImageLoading(false)}
            />
            {isImageLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <Badge className={getStatusColor(property.status)}>
                {getStatusText(property.status)}
              </Badge>
            </div>

            {/* Featured Badge */}
            {property.featured && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  Featured
                </Badge>
              </div>
            )}

            {/* Image Counter */}
            {property.images.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                1/{property.images.length}
              </div>
            )}

            {/* View Property Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                <Eye className="h-4 w-4 mr-2" />
                View Property
              </Button>
            </div>
          </div>
        </Link>
      </div>

      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <Link href={`/properties/${property.id}`}>
              <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1 mb-2">
                {property.title}
              </h3>
            </Link>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm line-clamp-1">
                {property.location.city}, {property.location.state}
              </span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-1 ml-2">
            {onSave && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  onSave(property.id);
                }}
                className={`h-8 w-8 p-0 border-gray-200 ${isSaved ? 'text-red-600 bg-red-50' : 'text-gray-600'}`}
              >
                <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              </Button>
            )}
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-200 text-gray-600">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-xl font-bold text-blue-600 mb-3">
          {formatPrice(property.price)}
        </div>

        {/* Property Details */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          {property.bedrooms > 0 && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.area.toLocaleString()}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {property.description}
        </p>

        {/* Agent Info */}
        {showAgent && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={property.agent.avatar} alt={property.agent.name} />
                <AvatarFallback>{property.agent.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium text-gray-900">{property.agent.name}</div>
                <div className="text-xs text-gray-500">Agent</div>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                <Phone className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                <Mail className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyCard;