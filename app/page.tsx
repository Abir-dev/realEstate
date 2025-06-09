'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PropertyCard from '@/components/ui/property-card';
import SearchFiltersComponent from '@/components/ui/search-filters';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { 
  Search, 
  Home, 
  DollarSign, 
  Users, 
  Star,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
  Award
} from 'lucide-react';
import { getFeaturedProperties } from '@/lib/data';
import { Property, SearchFilters } from '@/types';

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});

  useEffect(() => {
    setFeaturedProperties(getFeaturedProperties());
  }, []);

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    // Here you would typically filter properties and update the display
  };

  const stats = [
    { label: 'Properties Sold', value: '500+', icon: Home },
    { label: 'Happy Clients', value: '1,200+', icon: Users },
    { label: 'Years Experience', value: '15+', icon: Award },
    { label: 'Average Rating', value: '4.9', icon: Star },
  ];

  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Advanced search filters to find your perfect property quickly and easily.',
    },
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'Safe and secure property transactions with complete legal compliance.',
    },
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Real-time market data and trends to make informed decisions.',
    },
    {
      icon: Users,
      title: 'Expert Agents',
      description: 'Professional agents with local expertise to guide you through the process.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Home Buyer',
      content: 'RealEstate Pro made finding our dream home effortless. Their team was professional and responsive throughout the entire process.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Property Investor',
      content: 'Excellent service and market knowledge. They helped me find great investment properties with strong rental potential.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'First-time Buyer',
      content: 'As a first-time buyer, I was nervous about the process. The team guided me every step of the way and made it stress-free.',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  #1 Real Estate Platform
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Find Your
                  <span className="block text-yellow-400">Dream Home</span>
                  Today
                </h1>
                <p className="text-xl text-blue-100 max-w-lg">
                  Discover the perfect property with our comprehensive listings, 
                  expert agents, and cutting-edge search technology.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href="/properties">
                    <Search className="mr-2 h-5 w-5" />
                    Browse Properties
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Link href="/contact">
                    <Phone className="mr-2 h-5 w-5" />
                    Talk to Expert
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <Icon className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-blue-100">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative lg:flex justify-center hidden">
              <div className="relative">
                <Image
                  src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
                  alt="Beautiful home"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Property Verified</div>
                      <div className="text-sm text-gray-600">100% Authentic Listings</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Search Your Perfect Property
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Use our advanced search filters to find properties that match your exact requirements
            </p>
          </div>
          <SearchFiltersComponent onFiltersChange={handleFiltersChange} />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Properties
              </h2>
              <p className="text-lg text-gray-600">
                Handpicked properties from our premium collection
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/properties">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                showAgent={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose RealEstate Pro?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive real estate services with cutting-edge technology 
              and unmatched customer support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full mr-3"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who found their perfect home with RealEstate Pro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/properties">
                Start Your Search
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Get Expert Help
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}