import { ReactNode } from 'react';
import { mockProperties } from '@/lib/data';

// This function generates static params at build time
export async function generateStaticParams() {
  // Get all property IDs from the mock data
  return mockProperties.map((property) => ({
    id: property.id,
  }));
}

export default function PropertyLayout({ children }: { children: ReactNode }) {
  return children;
}