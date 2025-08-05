import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getFeaturedBlogPosts } from "../../api/blog.api";

const FeaturedSection = () => {
  const navigate = useNavigate();

  const {
    data: featuredPosts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featuredBlogPosts"],
    queryFn: getFeaturedBlogPosts,
  });

  // Handle navigation to blog post
  const handleReadMore = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="bg-white">
      {/* Header with full-width background */}
      <div className="bg-[#FBF5C7] w-full ">
        <div className="max-w-7xl mx-auto px-6 py-10 font-garamond">
          <p className="text-sm text-[#9D8644] mb-1 text-left">Home/Blog</p>
          <h1 className="text-3xl font-serif text-black text-left font-garamond">
            Beauty Tips & Expert Advice
          </h1>
          <p className="text-sm text-gray-700 mt-2 max-w-lg text-left">
            Discover professional luxury insights, threading tutorials, henna
            care guides, and lash maintenance tips from our experts.
          </p>
          <div className="mt-4 text-left">
            <input
              type="text"
              placeholder="Search Our Blogs....."
              className="px-4 py-2 rounded-full border w-full max-w-sm focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Featured Posts with full-width background */}
      <div className="bg-[#F5F3E3] w-full -mt-7">
        <div className="max-w-7xl mx-auto px-6 py-10 font-garamond ">
          <h2 className="text-3xl font-serif mb-6 text-left font-garamond -mt-8">
            Featured Posts
          </h2>

          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">
                Loading featured posts...
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-red-600">
                Failed to load featured posts
              </div>
            </div>
          )}

          {featuredPosts && featuredPosts.length > 0 && (
            <div className="flex flex-col md:flex-row gap-6 ">
              {/* First Card (left) - Always displayed if there's at least one post */}
              <div
                className={`flex ${
                  featuredPosts.length === 1
                    ? "w-full"
                    : "w-[55%] -ml-5 font-garamond"
                } h-[420px] bg-white rounded-xl shadow overflow-hidden`}
              >
                <div className="w-1/2 h-full">
                  <img
                    src={
                      featuredPosts[0].featured_image_url || "pictures/img4.jpg"
                    }
                    alt={featuredPosts[0].title}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "pictures/img4.jpg";
                    }}
                  />
                </div>
                <div className="w-1/2 p-5 flex flex-col justify-between">
                  <div>
                    <span className="bg-[#E5C862] text-xs font-semibold px-2 py-1 rounded-full text-gray-800 inline-block mb-2">
                      {featuredPosts[0].category}
                    </span>
                    <h3 className="text-2xl font-serif mb-1 font-garamond">
                      {featuredPosts[0].title}
                    </h3>
                    <p className="text-md text-gray-700 mt-3">
                      {featuredPosts[0].excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>
                      Admin
                      <br />
                      {formatDate(featuredPosts[0].published_at)}
                    </span>
                    <span
                      className="text-[#B19A50] font-semibold cursor-pointer hover:underline"
                      onClick={() => handleReadMore(featuredPosts[0].slug)}
                    >
                      Read More →
                    </span>
                  </div>
                </div>
              </div>

              {/* Second Card (right) - Only displayed if there are 2 or more posts */}
              {featuredPosts.length > 1 && (
                <div className="w-[40%] h-[420px] bg-white rounded-xl shadow overflow-hidden ml-auto flex flex-col">
                  <div className="h-[50%] w-full">
                    <img
                      src={
                        featuredPosts[1].featured_image_url ||
                        "pictures/img3.png"
                      }
                      alt={featuredPosts[1].title}
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
                        {featuredPosts[1].category}
                      </span>
                      <h3 className="text-2xl font-serif mb-1 font-garamond">
                        {featuredPosts[1].title}
                      </h3>
                      <p className="text-sm text-gray-700 font-garamond">
                        {featuredPosts[1].excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>
                        Admin
                        <br />
                        {formatDate(featuredPosts[1].published_at)}
                      </span>
                      <span
                        className="text-[#B19A50] font-semibold cursor-pointer hover:underline"
                        onClick={() => handleReadMore(featuredPosts[1].slug)}
                      >
                        Read More →
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {featuredPosts && featuredPosts.length === 0 && (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">
                No featured posts available
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
