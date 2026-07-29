import { NextRequest, NextResponse } from 'next/server';
import { getGalleryImages, saveGalleryImages } from '@backend/lib/storage';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const featuredOnly = searchParams.get('featured') === 'true';

  let images = getGalleryImages();
  if (featuredOnly) {
    images = images.filter((img) => img.isFeatured);
  }

  return NextResponse.json({ success: true, images });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, isFeatured, title, category } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Image ID is required' }, { status: 400 });
    }

    const images = getGalleryImages();
    const index = images.findIndex((img) => img.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: 'Image not found' }, { status: 404 });
    }

    if (typeof isFeatured === 'boolean') {
      images[index].isFeatured = isFeatured;
    }
    if (title !== undefined) {
      images[index].title = title;
    }
    if (category !== undefined) {
      images[index].category = category;
    }

    saveGalleryImages(images);
    return NextResponse.json({ success: true, image: images[index] });
  } catch (error) {
    console.error('API Gallery PATCH error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update image' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Image ID is required' }, { status: 400 });
    }

    let images = getGalleryImages();
    images = images.filter((img) => img.id !== id);
    saveGalleryImages(images);

    return NextResponse.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    console.error('API Gallery DELETE error:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete image' }, { status: 500 });
  }
}
