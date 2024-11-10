import Link from "next/link";
import { getPublishedBlogPosts } from "@/lib/notion";

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  // Tarih formatı için yardımcı fonksiyon
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Tarih belirtilmemiş";
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-12 text-center">
          Blog Yazıları
        </h1>

        <div className="flex gap-8">
          {/* Sol Sidebar */}
          <div className="w-64 flex-shrink-0">
            {/* Anasayfa Butonu */}
            <Link href="/">
              <button className="w-full mb-6 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl shadow-sm transition-colors duration-200 ease-in-out">
                ← Anasayfa
              </button>
            </Link>

            {/* Kategoriler */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Kategoriler
              </h2>
              <div className="space-y-2">
                {[
                  "Yapay Zeka",
                  "Web Development",
                  "Project Management",
                  "DevOps",
                ].map((category) => (
                  <button
                    key={category}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Yıllara Göre Arşiv */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Arşiv
              </h2>
              <div className="space-y-2">
                {["2024", "2023", "2022"].map((year) => (
                  <button
                    key={year}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Ana İçerik - Blog Listesi */}
          <div className="flex-1 ">
            <div className="space-y-4 ">
              {posts.map((post: any) => (
                <Link
                  href={`/blog/${post.properties.Slug.rich_text[0].plain_text}`}
                  key={post.id}
                >
                  <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer mt-8">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        {/* Başlık */}
                        <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                          {post.properties.Title.title[0].plain_text}
                        </h2>

                        {/* Slug */}
                        <p className="text-sm text-gray-500 mb-3">
                          /{post.properties.Slug.rich_text[0].plain_text}
                        </p>

                        {/* Alt Bilgiler */}
                        <div className="flex items-center gap-4 text-sm">
                          {/* Tarih */}
                          <span className="text-gray-600">
                            {formatDate(
                              post.properties.PublishedAt?.date?.start
                            )}
                          </span>

                          {/* Etiketler */}
                          <div className="flex gap-2">
                            {post.properties.Tags.multi_select.map(
                              (tag: any) => (
                                <span
                                  key={tag.id}
                                  className="inline-block bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-xs font-medium"
                                >
                                  {tag.name}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Sağ Ok İşareti */}
                      <div className="text-gray-400 hover:text-blue-600 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
