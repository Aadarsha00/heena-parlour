import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getBlogCategories, getBlogPosts } from "../../api/blog.api";
import type { BlogApiResponse } from "../../interface/blog.interface";

const POSTS_PER_PAGE = 9;

export default function BlogGrid() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch categories for filter buttons
  const { data: backendCategories = [] } = useQuery({
    queryKey: ["blogCategories"],
    queryFn: getBlogCategories,
  });

  // Create categories array with "All Posts" first, then backend categories
  const categories = ["All Posts", ...backendCategories];

  // Fetch blog posts with filters
  const {
    data: blogResponse,
    isLoading,
    error,
  } = useQuery<BlogApiResponse>({
    queryKey: ["blogPosts", selectedCategory, currentPage],
    queryFn: () =>
      getBlogPosts({
        category:
          selectedCategory === "All Posts" ? undefined : selectedCategory,
        is_published: true,
      }),
  });

  // Handle pagination (client-side for now, can be moved to backend)
  const allPosts = blogResponse?.results || [];
  const paginatedPosts = allPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle navigation to blog post
  const handleReadMore = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  if (error) {
    return (
      <div className="bg-[#FFFBE7] pt-0">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Failed to load blog posts</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFBE7] pt-0">
      {/* Filter Section (Full width) */}
      <div className="w-full bg-[#FBF5C7] py-6 px-5 flex justify-center">
        <div className="flex gap-4 flex-wrap justify-center w-full max-w-screen-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`text-black px-4 py-2 text-sm font-semibold border rounded-full transition-all duration-200 hover:bg-[#E5C862] ${
                selectedCategory === cat
                  ? "bg-[#B97E47] text-white"
                  : "bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="px-5 py-10">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading blog posts...</div>
          </div>
        </div>
      )}

      {/* Blog Cards */}
      {!isLoading && (
        <div className="px-5 py-10">
          {paginatedPosts.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">
                No blog posts found
                {selectedCategory !== "All Posts"
                  ? ` in category "${selectedCategory}"`
                  : ""}
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5 max-w-[1400px] mx-auto">
                {paginatedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl shadow overflow-hidden flex flex-col h-[420px]"
                  >
                    <div className="h-[50%] w-full">
                      <img
                        src={post.featured_image_url || "pictures/img3.png"}
                        alt={post.title}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "pictures/img3.png";
                        }}
                      />
                    </div>
                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <div>
                        <span className="bg-[#E5C862] text-xs font-semibold px-2 py-1 rounded-full text-gray-800 inline-block mb-2">
                          {post.category}
                        </span>
                        <h3 className="text-md font-serif mb-1">
                          {post.title}
                        </h3>
                        <p className="text-xs text-gray-700">{post.excerpt}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>
                          Admin
                          <br />
                          {formatDate(post.published_at)}
                        </span>
                        <span
                          className="text-[#B19A50] font-semibold cursor-pointer hover:underline"
                          onClick={() => handleReadMore(post.slug)}
                        >
                          Read More →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10 gap-3">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 border rounded flex items-center justify-center text-sm disabled:opacity-50 hover:bg-gray-100"
                  >
                    ⟨
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${
                          page === currentPage
                            ? "bg-[#B97E47] text-white"
                            : "border hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 border rounded flex items-center justify-center text-sm disabled:opacity-50 hover:bg-gray-100"
                  >
                    ⟩
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Results Summary */}
      {!isLoading && blogResponse && (
        <div className="text-center text-sm text-gray-600 pb-6">
          Showing {paginatedPosts.length} of {allPosts.length} posts
          {selectedCategory !== "All Posts" && ` in "${selectedCategory}"`}
        </div>
      )}
    </div>
  );
}
