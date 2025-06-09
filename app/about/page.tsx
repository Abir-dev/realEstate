'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import {
  Users,
  Award,
  Star,
  MapPin,
  Phone,
  Mail,
  Building,
  TrendingUp,
  Shield,
  Heart,
  CheckCircle,
  ArrowRight,
  Target,
  Eye,
  Handshake
} from 'lucide-react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story');

  const stats = [
    { label: 'Properties Sold', value: '2,500+', icon: Building },
    { label: 'Happy Clients', value: '5,000+', icon: Users },
    { label: 'Years Experience', value: '15+', icon: Award },
    { label: 'Team Members', value: '50+', icon: Users },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We conduct business with the highest ethical standards and transparency in every transaction.',
    },
    {
      icon: Heart,
      title: 'Client-Focused',
      description: 'Your needs and satisfaction are our top priority. We go above and beyond to exceed expectations.',
    },
    {
      icon: TrendingUp,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from service quality to market expertise.',
    },
    {
      icon: Handshake,
      title: 'Trust',
      description: 'Building lasting relationships based on trust, reliability, and consistent results.',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      experience: '15+ years',
      specialization: 'Luxury Properties',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      bio: 'Sarah founded RealEstate Pro with a vision to revolutionize the real estate experience through technology and exceptional service.',
    },
    {
      name: 'Michael Chen',
      role: 'Head of Sales',
      experience: '12+ years',
      specialization: 'Commercial Real Estate',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      bio: 'Michael leads our sales team with expertise in commercial properties and investment opportunities.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Senior Agent',
      experience: '8+ years',
      specialization: 'Residential Properties',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
      bio: 'Emily specializes in helping families find their perfect home with personalized service and market knowledge.',
    },
    {
      name: 'David Thompson',
      role: 'Market Analyst',
      experience: '10+ years',
      specialization: 'Market Research',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
      bio: 'David provides crucial market insights and data analysis to help clients make informed decisions.',
    },
  ];

  const milestones = [
    {
      year: '2009',
      title: 'Company Founded',
      description: 'RealEstate Pro was established with a mission to transform the real estate industry.',
    },
    {
      year: '2012',
      title: 'First 1,000 Sales',
      description: 'Reached our first major milestone of 1,000 successful property transactions.',
    },
    {
      year: '2015',
      title: 'Digital Innovation',
      description: 'Launched our cutting-edge digital platform for enhanced client experience.',
    },
    {
      year: '2018',
      title: 'Market Expansion',
      description: 'Expanded operations to serve multiple metropolitan areas across the country.',
    },
    {
      year: '2021',
      title: 'Industry Recognition',
      description: 'Received "Real Estate Company of the Year" award for outstanding service.',
    },
    {
      year: '2024',
      title: 'Continued Growth',
      description: 'Celebrating 15 years of excellence with over 5,000 satisfied clients.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  About RealEstate Pro
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Your Trusted
                  <span className="block text-yellow-400">Real Estate</span>
                  Partner
                </h1>
                <p className="text-xl text-blue-100 max-w-lg">
                  For over 15 years, we've been helping people find their dream homes 
                  and make smart real estate investments with expert guidance and innovative solutions.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href="/properties">
                    <Building className="mr-2 h-5 w-5" />
                    View Properties
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Link href="/contact">
                    <Phone className="mr-2 h-5 w-5" />
                    Contact Us
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
                  src="https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg"
                  alt="Real estate team"
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
                      <div className="font-semibold text-gray-900">15+ Years</div>
                      <div className="text-sm text-gray-600">Trusted Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: 'story', label: 'Our Story', icon: Target },
              { id: 'mission', label: 'Mission & Vision', icon: Eye },
              { id: 'values', label: 'Our Values', icon: Heart },
              { id: 'team', label: 'Meet the Team', icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Our Story */}
          {activeTab === 'story' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Founded in 2009, RealEstate Pro began as a small family business with a big dream: 
                  to revolutionize the real estate experience through exceptional service and innovative technology.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-900">From Humble Beginnings</h3>
                  <p className="text-gray-600 leading-relaxed">
                    What started as a small office with just three agents has grown into one of the region's 
                    most trusted real estate companies. Our founder, Sarah Johnson, recognized that the 
                    traditional real estate model needed a fresh approach focused on transparency, 
                    technology, and genuine client care.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Today, we're proud to have helped over 5,000 families find their perfect homes and 
                    assisted countless investors in building their real estate portfolios. Our success 
                    is measured not just in transactions, but in the lasting relationships we've built 
                    with our clients and communities.
                  </p>
                </div>
                <div className="relative">
                  <Image
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                    alt="Company history"
                    width={500}
                    height={400}
                    className="rounded-xl shadow-lg"
                  />
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-gray-900 text-center">Our Journey</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {milestones.map((milestone, index) => (
                    <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <div className="bg-blue-100 text-blue-600 text-lg font-bold py-2 px-4 rounded-lg inline-block mb-4">
                            {milestone.year}
                          </div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-2">
                            {milestone.title}
                          </h4>
                          <p className="text-gray-600">
                            {milestone.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mission & Vision */}
          {activeTab === 'mission' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Mission & Vision</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Our mission and vision guide everything we do, from how we serve our clients 
                  to how we contribute to our communities.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Target className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                      <p className="text-gray-700 leading-relaxed">
                        To provide exceptional real estate services that exceed client expectations 
                        through innovative technology, market expertise, and unwavering commitment 
                        to integrity. We strive to make every real estate transaction smooth, 
                        transparent, and successful.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-purple-100">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Eye className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                      <p className="text-gray-700 leading-relaxed">
                        To be the most trusted and innovative real estate company, setting new 
                        standards for client service and market leadership. We envision a future 
                        where finding the perfect property is effortless, enjoyable, and 
                        empowering for everyone.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">What Drives Us</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Client Success</h4>
                      <p className="text-gray-600 text-sm">
                        Every client's success is our success. We measure our achievements by the satisfaction and success of those we serve.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="h-6 w-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Innovation</h4>
                      <p className="text-gray-600 text-sm">
                        We continuously embrace new technologies and methods to improve the real estate experience.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="h-6 w-6 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Community</h4>
                      <p className="text-gray-600 text-sm">
                        We're committed to giving back and strengthening the communities where we live and work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Our Values */}
          {activeTab === 'values' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  These values are the foundation of our company culture and guide every decision we make.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-4">
                          <div className="bg-blue-100 p-3 rounded-xl flex-shrink-0">
                            <Icon className="h-8 w-8 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                              {value.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {value.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Living Our Values</h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Our values aren't just words on a wall – they're principles we live by every day. 
                  From our first interaction with a client to closing day and beyond, these values 
                  shape how we do business.
                </p>
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href="/contact">
                    Experience Our Values
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* Meet the Team */}
          {activeTab === 'team' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Our experienced team of real estate professionals is dedicated to helping you 
                  achieve your property goals with expertise, integrity, and personalized service.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="relative mb-6">
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={120}
                            height={120}
                            className="rounded-full mx-auto border-4 border-gray-100 group-hover:border-blue-200 transition-colors"
                          />
                          <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full">
                            <Star className="h-4 w-4" />
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {member.name}
                        </h3>
                        <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                        <div className="space-y-1 mb-4">
                          <Badge variant="outline" className="text-xs">
                            {member.experience}
                          </Badge>
                          <p className="text-sm text-gray-600">{member.specialization}</p>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {member.bio}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Team</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  We're always looking for talented, passionate real estate professionals 
                  to join our growing team. If you share our values and commitment to excellence, 
                  we'd love to hear from you.
                </p>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">
                    <Users className="mr-2 h-5 w-5" />
                    Career Opportunities
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Work with Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're buying, selling, or investing, our team is here to guide you 
            through every step of your real estate journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/properties">
                <Building className="mr-2 h-5 w-5" />
                Browse Properties
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/contact">
                <Phone className="mr-2 h-5 w-5" />
                Contact Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}