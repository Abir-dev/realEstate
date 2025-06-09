'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Phone,
  Mail,
  Heart,
  Share2,
  ArrowLeft,
  Car,
  Home,
  Shield,
  Wifi,
  Zap,
  Trees,
  Dumbbell,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { getProperty } from '@/lib/data';
import { Property } from '@/types';

// generateStaticParams is now imported from server.tsx

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: 'I am interested in this property. Please contact me with more information.'
  });

  useEffect(() => {
    if (params.id) {
      const propertyData = getProperty(params.id as string);
      setProperty(propertyData || null);
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/properties">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (property.status === 'for-rent') {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case 'for-sale':
        return 'bg-green-100 text-green-800';
      case 'for-rent':
        return 'bg-blue-100 text-blue-800';
      case 'sold':
        return 'bg-gray-100 text-gray-800';
      case 'rented':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the inquiry to your backend
    console.log('Inquiry submitted:', inquiryForm);
    alert('Your inquiry has been sent! The agent will contact you soon.');
    setInquiryForm({
      name: '',
      email: '',
      phone: '',
      message: 'I am interested in this property. Please contact me with more information.'
    });
  };

  const featureIcons: { [key: string]: any } = {
    'Pool': Trees,
    'Garage': Car,
    'Garden': Trees,
    'Security System': Shield,
    'Smart Home': Home,
    'Fireplace': Home,
    'Gym': Dumbbell,
    'Concierge': Shield,
    'Rooftop Terrace': Trees,
    'In-unit Laundry': Home,
    'Dishwasher': Home,
    'Water View': Trees,
    'Balcony': Trees,
    'Valet Parking': Car,
    'Patio': Trees,
    'Modern Kitchen': Home,
    'Walk-in Closets': Home,
    'Laundry Room': Home,
    'Recently Renovated': Home,
    'Natural Light': Home,
    'Hardwood Floors': Home,
    'Near Transit': Car,
    'Updated Kitchen': Home,
    'Central AC': Zap,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/properties" className="text-gray-500 hover:text-gray-700">Properties</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{property.title}</span>
          </nav>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-96 lg:h-[500px]">
            {/* Main Image */}
            <div 
              className="lg:col-span-3 relative rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => setShowImageModal(true)}
            >
              <Image
                src={property.images[currentImageIndex]}
                alt={property.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Navigation Buttons */}
              {property.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full h-10 w-10 p-0"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full h-10 w-10 p-0"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="hidden lg:flex flex-col gap-4">
              {property.images.slice(1, 4).map((image, index) => (
                <div
                  key={index}
                  className="relative h-full rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => {
                    setCurrentImageIndex(index + 1);
                    setShowImageModal(true);
                  }}
                >
                  <Image
                    src={image}
                    alt={`${property.title} ${index + 2}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {index === 2 && property.images.length > 4 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        +{property.images.length - 4} more
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(property.status)}>
                          {getStatusText(property.status)}
                        </Badge>
                        {property.featured && (
                          <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                        )}
                      </div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {property.title}
                      </h1>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsSaved(!isSaved)}
                        className={isSaved ? 'text-red-600 border-red-200' : ''}
                      >
                        <Heart className={`h-4 w-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                        {isSaved ? 'Saved' : 'Save'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>

                  <div className="text-3xl font-bold text-blue-600 mb-4">
                    {formatPrice(property.price)}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {property.bedrooms > 0 && (
                      <div className="flex items-center">
                        <Bed className="h-5 w-5 mr-2 text-gray-400" />
                        <span className="font-medium">{property.bedrooms}</span>
                        <span className="text-gray-600 ml-1">bed{property.bedrooms !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 mr-2 text-gray-400" />
                      <span className="font-medium">{property.bathrooms}</span>
                      <span className="text-gray-600 ml-1">bath{property.bathrooms !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-5 w-5 mr-2 text-gray-400" />
                      <span className="font-medium">{property.area.toLocaleString()}</span>
                      <span className="text-gray-600 ml-1">sqft</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                      <span className="font-medium">{property.yearBuilt}</span>
                      <span className="text-gray-600 ml-1">built</span>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {property.description}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Features & Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {property.features.map((feature, index) => {
                      const Icon = featureIcons[feature] || CheckCircle;
                      return (
                        <div key={index} className="flex items-center space-x-2">
                          <Icon className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Property Type */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Property Type</h4>
                      <p className="text-gray-600 capitalize">{property.type}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Year Built</h4>
                      <p className="text-gray-600">{property.yearBuilt}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Square Footage</h4>
                      <p className="text-gray-600">{property.area.toLocaleString()} sqft</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Status</h4>
                      <Badge className={getStatusColor(property.status)}>
                        {getStatusText(property.status)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agent Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={property.agent.avatar} alt={property.agent.name} />
                      <AvatarFallback>{property.agent.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">{property.agent.name}</h4>
                      <p className="text-sm text-gray-600">Real Estate Agent</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{property.agent.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{property.agent.email}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Inquiry Form */}
              <Card id="contact">
                <CardHeader>
                  <CardTitle>Send Inquiry</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        value={inquiryForm.message}
                        onChange={(e) => setInquiryForm({...inquiryForm, message: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70 rounded-full h-10 w-10 p-0 z-10"
            >
              <X className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full h-12 w-12 p-0 z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full h-12 w-12 p-0 z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <div className="relative w-full h-full max-h-[80vh]">
              <Image
                src={property.images[currentImageIndex]}
                alt={`${property.title} ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}