import { getSingleBlogPost } from "@/lib/notion";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";

// Tip tanımlamaları
interface NotionTag {
  id: string;
  name: string;
}

interface BlogPost {
  metadata: {
    Title?: {
      title: Array<{ plain_text: string }>;
    };
    PublishedAt?: {
      date?: {
        start?: string;
      };
    };
    Tags?: {
      multi_select: NotionTag[];
    };
    Image?: {
      url: string;
    };
  };
  markdown: string;
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  try {
    console.log("Attempting to fetch post with slug:", params.slug);
    const post = await getSingleBlogPost(params.slug);

    // Debug için post verisini yazdır
    console.log("Received post data:", JSON.stringify(post, null, 2));

    if (!post || !post.metadata || !post.metadata.Title) {
      console.log("Invalid post data received");
      return <BlogPostNotFound />;
    }

    // Tarih formatı için yardımcı fonksiyon
    const formatDate = (dateString?: string) => {
      if (!dateString) return "Tarih belirtilmemiş";
      return new Date(dateString).toLocaleDateString("tr-TR");
    };

    // Görsel URL'sini kontrol et
    const hasImage = post.metadata.Image && post.metadata.Image.url;
    console.log("Has image:", hasImage, "Image URL:", post.metadata.Image?.url);

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex gap-8">
            {/* Sol Sidebar */}
            <div className="w-64 flex-shrink-0">
              {/* Anasayfa Butonu */}
              <Link href="/">
                <button className="w-full mb-4 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl shadow-sm transition-colors duration-200 ease-in-out">
                  ← Anasayfa
                </button>
              </Link>

              {/* Blog'a Dön Butonu */}
              <Link href="/blog">
                <button className="w-full mb-6 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl shadow-sm transition-colors duration-200 ease-in-out">
                  ← Blog'a Dön
                </button>
              </Link>

              {/* Yazı Bilgileri */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Yazı Bilgileri
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Yayın Tarihi</p>
                    <p className="text-gray-700">
                      {formatDate(post.metadata.PublishedAt?.date?.start)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Kategori</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {post.metadata.Tags?.multi_select?.length ? (
                        post.metadata.Tags.multi_select.map(
                          (tag: NotionTag) => (
                            <span
                              key={tag.id}
                              className="inline-block bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-xs font-medium"
                            >
                              {tag.name}
                            </span>
                          )
                        )
                      ) : (
                        <span className="text-gray-500">
                          Kategori belirtilmemiş
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ana İçerik */}
            <div className="flex-1">
              <article className="bg-white rounded-xl shadow-sm p-8">
                {/* Başlık */}
                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                  {post.metadata.Title?.title?.[0]?.plain_text ||
                    "Başlıksız Yazı"}
                </h1>

                {/* Kapak Görseli */}
                {hasImage && (
                  <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
                    <Image
                      src={post.metadata.Image?.url || ""}
                      alt={
                        post.metadata.Title?.title?.[0]?.plain_text ||
                        "Blog görseli"
                      }
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}

                {/* İçerik */}
                <div className="prose prose-lg max-w-none">
                  <MDXRemote source={post.markdown} />
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering blog post:", error);
    return <BlogPostError />;
  }
}

// Ayrı komponentler olarak hata durumlarını tanımlayalım
function BlogPostNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Yazı Bulunamadı
        </h1>
        <p className="text-gray-600 mb-8">
          Aradığınız blog yazısı bulunamadı veya kaldırılmış olabilir.
        </p>
        <Link href="/blog">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Blog Sayfasına Dön
          </button>
        </Link>
      </div>
    </div>
  );
}

function BlogPostError() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Bir Hata Oluştu
        </h1>
        <p className="text-gray-600 mb-8">
          Blog yazısı yüklenirken bir hata oluştu. Lütfen daha sonra tekrar
          deneyin.
        </p>
        <Link href="/blog">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Blog Sayfasına Dönssss
          </button>
        </Link>
      </div>
    </div>
  );
}
