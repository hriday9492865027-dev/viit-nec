import { NextRequest, NextResponse } from 'next/server';
import { getInstagramPosts, saveInstagramPosts } from '@backend/lib/storage';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const featuredOnly = searchParams.get('featured') === 'true';

  let posts = getInstagramPosts();
  if (featuredOnly) {
    posts = posts.filter((p) => p.isFeatured);
  }

  return NextResponse.json({ success: true, posts });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, isFeatured } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Post ID is required' }, { status: 400 });
    }

    const posts = getInstagramPosts();
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
    }

    posts[index].isFeatured = isFeatured;
    saveInstagramPosts(posts);

    return NextResponse.json({ success: true, post: posts[index] });
  } catch (error) {
    console.error('API Instagram PATCH error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update post' }, { status: 500 });
  }
}
