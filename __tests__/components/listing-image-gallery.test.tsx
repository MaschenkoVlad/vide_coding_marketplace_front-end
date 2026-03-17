import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ListingImageGallery } from '@/entities/listing/components/ListingImageGallery';

describe('ListingImageGallery', () => {
  const mockImages = [
    'https://picsum.photos/seed/test1/800/600.jpg',
    'https://picsum.photos/seed/test2/800/600.jpg',
    'https://picsum.photos/seed/test3/800/600.jpg',
  ];

  it('should show placeholder when no images provided', () => {
    render(<ListingImageGallery images={[]} title="Test Listing" />);

    expect(screen.getByText('No photos available')).toBeInTheDocument();
    expect(screen.getByText('📷')).toBeInTheDocument();
  });

  it('should show single image when only one provided', () => {
    render(<ListingImageGallery images={[mockImages[0]]} title="Test Listing" />);

    const image = screen.getByRole('img', { name: 'Test Listing - Image 1' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
    expect(image.getAttribute('src')).toContain('picsum.photos%2Fseed%2Ftest1');

    // Should not show navigation or thumbnails for single image
    expect(screen.queryByLabelText('Previous image')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next image')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Go to image 2')).not.toBeInTheDocument();
  });

  it('should show first image by default for multiple images', () => {
    render(<ListingImageGallery images={mockImages} title="Test Listing" />);

    const mainImage = screen.getByRole('img', { name: 'Test Listing - Image 1' });
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src');
    expect(mainImage.getAttribute('src')).toContain('picsum.photos%2Fseed%2Ftest1');

    // Should show image counter
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('should show navigation buttons for multiple images', () => {
    render(<ListingImageGallery images={mockImages} title="Test Listing" />);

    expect(screen.getByLabelText('Previous image')).toBeInTheDocument();
    expect(screen.getByLabelText('Next image')).toBeInTheDocument();
  });

  it('should show thumbnails for multiple images', () => {
    render(<ListingImageGallery images={mockImages} title="Test Listing" />);

    expect(screen.getByLabelText('Go to image 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to image 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to image 3')).toBeInTheDocument();
  });

  it('should highlight current thumbnail', () => {
    render(<ListingImageGallery images={mockImages} title="Test Listing" />);

    const firstThumbnail = screen.getByLabelText('Go to image 1');
    expect(firstThumbnail).toHaveClass('border-primary');
  });

  it('should navigate to next image when next button clicked', () => {
    render(<ListingImageGallery images={mockImages} title="Test Listing" />);

    const nextButton = screen.getByLabelText('Next image');
    fireEvent.click(nextButton);

    const updatedImage = screen.getByRole('img', { name: 'Test Listing - Image 2' });
    expect(updatedImage).toBeInTheDocument();
    expect(updatedImage).toHaveAttribute('src');
    expect(updatedImage.getAttribute('src')).toContain('picsum.photos%2Fseed%2Ftest2');
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
  });

  it('should navigate to previous image when previous button clicked', () => {
    render(<ListingImageGallery images={mockImages} title="Test Listing" />);

    // First go to second image
    const nextButton = screen.getByLabelText('Next image');
    fireEvent.click(nextButton);

    // Then go back to first
    const prevButton = screen.getByLabelText('Previous image');
    fireEvent.click(prevButton);

    const updatedImage = screen.getByRole('img', { name: 'Test Listing - Image 1' });
    expect(updatedImage).toBeInTheDocument();
    expect(updatedImage.getAttribute('src')).toContain('picsum.photos%2Fseed%2Ftest1');
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('should wrap around to last image when going previous from first', () => {
    render(<ListingImageGallery images={mockImages} title="Test Listing" />);

    const prevButton = screen.getByLabelText('Previous image');
    fireEvent.click(prevButton);

    const updatedImage = screen.getByRole('img', { name: 'Test Listing - Image 3' });
    expect(updatedImage).toBeInTheDocument();
    expect(updatedImage.getAttribute('src')).toContain('picsum.photos%2Fseed%2Ftest3');
    expect(screen.getByText('3 / 3')).toBeInTheDocument();
  });

  it('should wrap around to first image when going next from last', () => {
    render(<ListingImageGallery images={mockImages} title="Test Listing" />);

    // Navigate to last image
    const nextButton = screen.getByLabelText('Next image');
    fireEvent.click(nextButton); // to image 2
    fireEvent.click(nextButton); // to image 3

    // Go next from last image
    fireEvent.click(nextButton);

    const updatedImage = screen.getByRole('img', { name: 'Test Listing - Image 1' });
    expect(updatedImage).toBeInTheDocument();
    expect(updatedImage.getAttribute('src')).toContain('picsum.photos%2Fseed%2Ftest1');
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('should switch to clicked thumbnail', () => {
    render(<ListingImageGallery images={mockImages} title="Test Listing" />);

    const thirdThumbnail = screen.getByLabelText('Go to image 3');
    fireEvent.click(thirdThumbnail);

    const updatedImage = screen.getByRole('img', { name: 'Test Listing - Image 3' });
    expect(updatedImage).toBeInTheDocument();
    expect(updatedImage.getAttribute('src')).toContain('picsum.photos%2Fseed%2Ftest3');
    expect(screen.getByText('3 / 3')).toBeInTheDocument();
  });

  it('should update highlighted thumbnail when image changes', () => {
    render(<ListingImageGallery images={mockImages} title="Test Listing" />);

    // Initially first thumbnail is highlighted
    expect(screen.getByLabelText('Go to image 1')).toHaveClass('border-primary');

    // Click next button
    const nextButton = screen.getByLabelText('Next image');
    fireEvent.click(nextButton);

    // Now second thumbnail should be highlighted
    expect(screen.getByLabelText('Go to image 2')).toHaveClass('border-primary');
    expect(screen.getByLabelText('Go to image 1')).not.toHaveClass('border-primary');
  });
});
