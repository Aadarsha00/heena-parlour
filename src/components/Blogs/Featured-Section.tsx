/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getFeaturedBlogPosts } from "../../api/blog.api";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: featuredPosts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featuredBlogPosts"],
    queryFn: getFeaturedBlogPosts,
  });

  const handleReadMore = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredPosts =
    featuredPosts?.filter((post: any) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <section className="bg-white">
      {/* Header */}
      <div className="bg-[#FBF5C7] w-full">
        <div className="max-w-7xl mx-auto px-6 py-10 font-garamond">
          <p className="text-sm text-[#9D8644] mb-1 text-left">Home/Blog</p>
          <h1 className="text-3xl font-serif text-black text-left">
            Beauty Tips & Expert Advice
          </h1>
          <p className="text-sm text-gray-700 mt-2 max-w-lg text-left">
            Discover professional luxury insights, threading tutorials, henna
            care guides, and lash maintenance tips from our experts.
          </p>
          <div className="mt-4 text-left">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Our Blogs....."
              className="px-4 py-2 rounded-full border w-full max-w-sm focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      <div className="bg-[#F5F3E3] w-full -mt-7">
        <div className="max-w-7xl mx-auto px-6 py-10 font-garamond">
          <h2 className="text-3xl font-serif mb-6 text-left -mt-8">
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

          {filteredPosts.length > 0 && (
            <div className="flex flex-col md:flex-row gap-6">
              {/* First Card */}
              <div
                className={`flex flex-col sm:flex-row ${
                  filteredPosts.length === 1 ? "w-full" : "md:w-[55%]"
                } h-auto bg-white rounded-xl shadow overflow-hidden`}
              >
                <div className="sm:w-1/2 w-full h-64 sm:h-auto">
                  <img
                    src={
                      filteredPosts[0].featured_image_url || "pictures/img4.jpg"
                    }
                    alt={filteredPosts[0].title}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "pictures/img4.jpg";
                    }}
                  />
                </div>
                <div className="sm:w-1/2 w-full p-5 flex flex-col justify-between">
                  <div>
                    <span className="bg-[#E5C862] text-xs font-semibold px-2 py-1 rounded-full text-gray-800 inline-block mb-2">
                      {filteredPosts[0].category}
                    </span>
                    <h3 className="text-2xl font-serif mb-1">
                      {filteredPosts[0].title}
                    </h3>
                    <p className="text-md text-gray-700 mt-3">
                      {filteredPosts[0].excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mt-4">
                    <span>
                      Admin
                      <br />
                      {formatDate(filteredPosts[0].published_at)}
                    </span>
                    <span
                      className="text-[#B19A50] font-semibold cursor-pointer hover:underline"
                      onClick={() => handleReadMore(filteredPosts[0].slug)}
                    >
                      Read More →
                    </span>
                  </div>
                </div>
              </div>

              {/* Second Card */}
              {filteredPosts.length > 1 && (
                <div className="w-full md:w-[40%] bg-white rounded-xl shadow overflow-hidden flex flex-col">
                  <div className="h-64 md:h-[210px] w-full">
                    <img
                      src={
                        filteredPosts[1].featured_image_url ||
                        "pictures/img3.png"
                      }
                      alt={filteredPosts[1].title}
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
                        {filteredPosts[1].category}
                      </span>
                      <h3 className="text-2xl font-serif mb-1">
                        {filteredPosts[1].title}
                      </h3>
                      <p className="text-sm text-gray-700">
                        {filteredPosts[1].excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600 mt-4">
                      <span>
                        Admin
                        <br />
                        {formatDate(filteredPosts[1].published_at)}
                      </span>
                      <span
                        className="text-[#B19A50] font-semibold cursor-pointer hover:underline"
                        onClick={() => handleReadMore(filteredPosts[1].slug)}
                      >
                        Read More →
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {filteredPosts.length === 0 && !isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">
                No posts found for "{searchTerm}"
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
