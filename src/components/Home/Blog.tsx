/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { getBlogPosts } from "../../api/blog.api";

const BlogSection = () => {
  const navigate = useNavigate();

  const {
    data: blogPosts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: () => getBlogPosts({ is_published: true }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get first 3 blog posts
  const displayPosts = blogPosts?.results?.slice(0, 3) || [];

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

  if (isLoading) {
    return (
      <section className="bg-[#f7f6e7] py-16 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 font-display">
              Beauty Tips and News
            </h2>
            <p className="text-gray-700">
              Stay updated with our latest beauty advice, tips and salon news.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow overflow-hidden animate-pulse h-[420px]"
              >
                <div className="h-[50%] bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-[#f7f6e7] py-16 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 font-display">
              Beauty Tips and News
            </h2>
            <p className="text-red-600">
              Error loading blog posts: {error?.toString()}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f7f6e7] py-16 mt-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 font-display">
            Beauty Tips and News
          </h2>
          <p className="text-gray-700">
            Stay updated with our latest beauty advice, tips and salon news.
          </p>
        </div>

        {displayPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {displayPosts.map((post: any) => (
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
                      <h3 className="text-md font-serif mb-1">{post.title}</h3>
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
            <div className="text-center">
              <Link
                to="/blog"
                className="inline-flex items-center text-sm font-medium text-black hover:underline transition-colors duration-200"
              >
                View All Blogs <span className="ml-2">→</span>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-gray-600">
              No blog posts available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
