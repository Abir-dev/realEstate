import { mockProperties } from '@/lib/data';

export async function generateStaticParams() {
  // Get all property IDs from the mock data
  return mockProperties.map((property) => ({
    id: property.id,
  }));
}