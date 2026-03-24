import { Metadata } from 'next';
import { ListingPageClient } from './ListingPageClient';

interface ListingPageProps {
  params: {
    id: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  try {
    // In a real app, you'd fetch the listing data server-side
    // For now, we'll use a static approach
    return {
      title: `Listing ${params.id} — Used Hardware Marketplace`,
      description: 'View details for this used hardware listing on our marketplace.',
    };
  } catch {
    return {
      title: 'Listing — Used Hardware Marketplace',
      description: 'View details for this used hardware listing on our marketplace.',
    };
  }
}

// Server component
export default function ListingPage({ params }: ListingPageProps) {
  return <ListingPageClient id={params.id} />;
}
