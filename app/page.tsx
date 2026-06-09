import Navbar from "./components/molecules/navbar";
import Hero from "./components/section/hero";
import Activity from "./components/section/activity";
import News from "./components/section/news";
import EventsSection from "./components/section/events";
import Map from "./components/section/map";
import InstagramEmbedSection from "./components/section/instagramEmbed";
import prisma from "./libs/prisma";

export const dynamic = 'force-dynamic'; // <--- Tambahkan baris ini

async function fetchOgImage(url: string): Promise<string | null> {
  if (!url || !url.startsWith("http")) return null;

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
    // Fail silently to prevent breaking the build/render
    return null;
  }
}

export default async function Home() {
  const newsData = await prisma.news.findMany({
    orderBy: {
      date: 'desc',
    },
    take: 10,
  });

  // Fetch og:image for all news items in parallel with a timeout safety check
  const serializedNewsData = await Promise.all(
    newsData.map(async (item: any) => {
      const ogImage = await fetchOgImage(item.path);
      return {
        ...item,
        date: item.date.toISOString(),
        createdAt: item.createdAt.toISOString(),
        image: ogImage,
      };
    })
  );

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Activity />
      <News />
      <EventsSection newsData={serializedNewsData} />
      <InstagramEmbedSection />
      {/* <Map /> */}
    </main>
  );
}
