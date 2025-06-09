'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Building, BedDouble, Bath, Move, Heart, Share2 } from 'lucide-react';
import HoverCard3D from './hover-card-3d';
import MagneticButton from './magnetic-button';


interface PropertyCard3DProps {
  property: {
    id: string;
    title: string;
    price: number;
    address: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    image: string;
    type: string;
  };
  isFeatured?: boolean;
}

export default function PropertyCard3D({ property, isFeatured = false }: PropertyCard3DProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  // Handler for MagneticButton that doesn't require event parameter
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <HoverCard3D
      className={`w-full transition-all duration-500 ${
        isFeatured ? 'md:scale-105 shadow-xl' : 'shadow-lg hover:shadow-xl'
      }`}
    >
      <Link href={`/properties/${property.id}`} className="block">
        <div className="relative">
          {/* Property Image */}
          <div className="relative h-48 md:h-56 w-full overflow-hidden rounded-t-xl">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Property type badge */}
            <div className="absolute top-3 left-3 z-10">
              <motion.div 
                className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-semibold rounded-full shadow-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {property.type}
              </motion.div>
            </div>
            
            {/* Action buttons */}
            <div className="absolute top-3 right-3 flex space-x-2 z-10">
              <MagneticButton
                className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center"
                onClick={handleFavoriteToggle}
                strength={40}
              >
                <motion.div
                  whileTap={{ scale: 0.8 }}
                >
                  <Heart 
                    className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
                  />
                </motion.div>
              </MagneticButton>
              
              <MagneticButton
                className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center"
                strength={40}
              >
                <motion.div
                  whileTap={{ scale: 0.8 }}
                >
                  <Share2 className="h-4 w-4 text-gray-700" />
                </motion.div>
              </MagneticButton>
            </div>
            
            {isFeatured && (
              <div className="absolute bottom-3 left-3 z-10">
                <motion.div 
                  className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold rounded-full shadow-md"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Featured
                </motion.div>
              </div>
            )}
          </div>
          
          {/* Property Info */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-b-xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                  {property.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                  {property.address}
                </p>
              </div>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {formatPrice(property.price)}
              </p>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <BedDouble className="h-4 w-4 mr-1" />
                <span className="text-xs">{property.bedrooms} Beds</span>
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Bath className="h-4 w-4 mr-1" />
                <span className="text-xs">{property.bathrooms} Baths</span>
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Move className="h-4 w-4 mr-1" />
                <span className="text-xs">{property.area} sqft</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </HoverCard3D>
  );
}