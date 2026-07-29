import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getGalleryImages, saveGalleryImages } from '@backend/lib/storage';
import { GalleryImage } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const urlInput = formData.get('url') as string | null;
    const title = (formData.get('title') as string) || 'Untitled Event';
    const category = (formData.get('category') as string) || 'General';
    const isFeatured = formData.get('isFeatured') === 'true';

    let imageUrl = '';

    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const fileExt = path.extname(file.name) || '.jpg';
      const fileName = `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${fileExt}`;
      const filePath = path.join(uploadsDir, fileName);

      fs.writeFileSync(filePath, buffer);
      imageUrl = `/uploads/${fileName}`;
    } else if (urlInput) {
      imageUrl = urlInput;
    } else {
      return NextResponse.json(
        { success: false, message: 'Please provide either an image file or a valid URL.' },
        { status: 400 }
      );
    }

    const newImage: GalleryImage = {
      id: `img-${Date.now()}`,
      title,
      category,
      url: imageUrl,
      isFeatured,
      uploadedAt: new Date().toISOString().split('T')[0],
    };

    const images = getGalleryImages();
    images.unshift(newImage);
    saveGalleryImages(images);

    return NextResponse.json({ success: true, image: newImage });
  } catch (error) {
    console.error('Upload API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process upload.' },
      { status: 500 }
    );
  }
}
