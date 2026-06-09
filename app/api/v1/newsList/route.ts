import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

function isSafeUrl(urlStr: string): boolean {
  try {
    const parsed = new URL(urlStr);
    
    // Only allow http and https protocols
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }

    const hostname = parsed.hostname.toLowerCase();

    // Block common private ranges and loopbacks
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "[::1]" ||
      hostname === "0.0.0.0" ||
      hostname.startsWith("169.254.") || // Link-local / AWS metadata
      hostname.startsWith("10.") ||      // Private class A
      hostname.startsWith("192.168.") || // Private class C
      hostname.startsWith("172.16.") ||  // Private class B start
      hostname.startsWith("172.17.") ||
      hostname.startsWith("172.18.") ||
      hostname.startsWith("172.19.") ||
      hostname.startsWith("172.20.") ||
      hostname.startsWith("172.21.") ||
      hostname.startsWith("172.22.") ||
      hostname.startsWith("172.23.") ||
      hostname.startsWith("172.24.") ||
      hostname.startsWith("172.25.") ||
      hostname.startsWith("172.26.") ||
      hostname.startsWith("172.27.") ||
      hostname.startsWith("172.28.") ||
      hostname.startsWith("172.29.") ||
      hostname.startsWith("172.30.") ||
      hostname.startsWith("172.31.")
    ) {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
}

async function fetchOgImage(url: string): Promise<string | null> {
  if (!url || !url.startsWith("http")) return null;
  if (!isSafeUrl(url)) return null;

  // If it is already an image url, return it directly
  if (/\.(jpeg|jpg|gif|png|webp)($|\?)/i.test(url)) {
    return url;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500); // 1.5s timeout max

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });

    clearTimeout(timeoutId);

    if (!res.ok) return null;

    const html = await res.text();

    // Look for <meta property="og:image" content="..." />
    const match1 = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
    if (match1 && match1[1]) return match1[1];

    const match2 = html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
    if (match2 && match2[1]) return match2[1];

    // Fallback to twitter:image
    const match3 = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i);
    if (match3 && match3[1]) return match3[1];

    return null;
  } catch (e) {
    // Fail silently to prevent API breakage
    return null;
  }
}

export async function GET() {
    try {
        const listNews = await prisma.news.findMany({
            orderBy: {
                date: 'desc',
            },
            select: {
                id: true,
                title: true,
                description: true,
                date: true,
                note: true,
                path: true,
            }
        });

        if (listNews.length == 0) {
            return NextResponse.json({
                error: false,
                message: "Data news not found",
                data: []
            }, { status: 200 })
        }

        // Fetch og:images in parallel for all retrieved news
        const listNewsWithImages = await Promise.all(
            listNews.map(async (item) => {
                const ogImage = await fetchOgImage(item.path);
                return {
                    ...item,
                    image: ogImage,
                };
            })
        );

        return NextResponse.json({
            error: false,
            message: "Success get list news",
            data: listNewsWithImages
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            error: true,
            message: "Internal server error",
            errMessage: error.message
        }, { status: 500 });
    }
}