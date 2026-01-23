'use client'; 

import { InstagramEmbed } from 'react-social-media-embed';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function InstagramEmbedSection() {
    const [urls, setUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Default state dipisah agar bisa diakses di dalam useEffect
    const defaultState = [
        "https://www.instagram.com/p/DFNqNmyzOf_/",
        "https://www.instagram.com/p/DFKVG6STt-S/",
        "https://www.instagram.com/p/DE90WqPztS_/"
    ];

    useEffect(() => {
        const fetchInstagramData = async () => {
            try {
                const res = await fetch('/api/v1/embedActivity');
                const result = await res.json();

                // Ambil data dari API, atau array kosong jika tidak ada
                const apiData = (result.data && Array.isArray(result.data)) ? result.data : [];

                // LOGIC BARU: Merge Data
                // Kita map berdasarkan defaultState (supaya pasti ada 3 item)
                const combinedUrls = defaultState.map((defaultUrl, index) => {
                    const incomingUrl = apiData[index];
                    
                    // Cek apakah data dari API valid (ada isinya dan string tidak kosong)
                    // Kita anggap URL valid minimal panjangnya 10 karakter
                    if (incomingUrl && typeof incomingUrl === 'string' && incomingUrl.length > 10) {
                        return incomingUrl;
                    }
                    
                    // Jika data API kosong/null/undefined di index ini, pakai Default
                    return defaultUrl;
                });

                setUrls(combinedUrls);

            } catch (error) {
                console.error("Gagal mengambil data, menggunakan fallback:", error);
                setUrls(defaultState);
            } finally {
                setLoading(false);
            }
        };

        fetchInstagramData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (
            <section className="py-16 bg-gray-50 flex justify-center items-center min-h-[400px]">
                <p className="text-gray-500 animate-pulse">Memuat Feed Instagram...</p>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Ikuti Kami di Instagram
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Dapatkan update kegiatan terbaru dari Citramas Foundation
                    </p>
                    <Link
                        href="https://instagram.com/citramasfoundation"
                        target="_blank"
                        className="inline-block px-6 py-2 border-2 border-pink-500 text-pink-600 font-semibold rounded-full hover:bg-pink-500 hover:text-white transition-colors duration-300"
                    >
                        Follow @citramasfoundation
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {urls.map((url, index) => (
                        <div
                            key={index}
                            className="w-full max-w-[350px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                        >
                            <div className="flex justify-center p-2">
                                {/* Key ditambahkan url agar react merender ulang jika url berubah */}
                                <InstagramEmbed
                                    key={url} 
                                    url={url}
                                    width="100%"
                                    style={{ maxWidth: 328 }} 
                                    captioned={false}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}