import parse from "html-react-parser";
import Navbar from "../Home/Navbar";
import Footer from "../Home/footer-home";
import { Link } from "react-router-dom";

const BlogDetailPage = () => {
  const blog = {
    title: "Complete Guide to Eyebrow Threading Aftercare",
    category: "threading",
    author: "Beauty Expert Team",
    date: "August 15, 2025",
    excerpt:
      "Eyebrow threading is precise hair removal that leaves you with beautifully defined brows. Here's how to care for your skin post-threading.",
    image: "/pictures/img4.jpg",
    content: `
      <h2>Introduction</h2>
      <p>Threading is gentle on the skin and delivers sharp results.</p>
      <h2>Aftercare</h2>
      <p>Follow these steps to soothe your skin and prevent irritation.</p>
      <h2>Conclusion</h2>
      <p>With proper care, you’ll maintain flawless brows.</p>
    `,
  };

  return (
    <>
      <Navbar />

      {/* Breadcrumb */}
      <nav className="text-sm p-2 bg-[#fbf5c7] ml-4 ">
        <span className="text-gray-800">Home</span>
        <span className="text-gray-800">/</span>
        <span className="text-gray-800">Blog</span>
        <span className="text-gray-800">/</span>
        <span className="text-gray-800">Threading</span>
        <span className="text-gray-800">/</span>
        <Link
          to="/blog/threading-aftercare"
          className="text-orange-600 hover:underline"
        >
          Complete Guide to Threading Aftercare
        </Link>
      </nav>

      <div className="bg-[#FCFAED] py-10 px-4 -ml-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* LEFT MAIN BLOG CONTENT */}
          <div className="w-full max-w-[655px]">
            <p className="text-sm text-gray-500 mb-1">{blog.date}</p>
            <h1 className="text-3xl font-serif mb-2">{blog.title}</h1>
            <p className="text-sm text-gray-500 mb-6">By {blog.author}</p>

            <img
              src={blog.image}
              alt="Blog"
              className="w-full h-[450px] rounded-xl object-cover mb-6"
            />

            <p className="mb-6 text-gray-700">{blog.excerpt}</p>

            {/* Share Icons */}
            <div className="mb-6 text-sm text-gray-700 flex gap-4">
              <a
                href="https://www.facebook.com/yourpage"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook-square text-2xl text-blue-600" />
              </a>
              <a
                href="https://www.instagram.com/yourprofile"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-instagram text-2xl text-pink-600" />
              </a>
            </div>

            {/* Parsed Blog Content */}
            <article className="prose max-w-none">
              {parse(blog.content)}
            </article>

            {/* FAQ */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">
                Frequently Asked Questions
              </h2>

              <details className="mb-2">
                <summary className="cursor-pointer font-medium">
                  How long does redness last after threading?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  Redness usually fades within 30 minutes to 2 hours depending
                  on skin sensitivity.
                </p>
              </details>

              <details className="mb-2">
                <summary className="cursor-pointer font-medium">
                  Can I wear makeup after threading?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  It's best to avoid makeup for 24 hours after threading to
                  prevent irritation.
                </p>
              </details>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="flex flex-col gap-10 ml-32">
            {/* Book Appointment */}
            <div className="bg-white rounded-3xl shadow-lg border p-6 w-[510px] mt-36">
              <h2 className="text-2xl font-semibold text-center mb-2">
                Book Your Threading Service
              </h2>
              <p className="text-center text-sm text-gray-600 mb-4">
                Ready for perfectly shaped brows? Schedule your appointment with
                our threading experts.
              </p>
              <form className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm">
                    Select Your Service
                  </label>
                  <select
                    disabled
                    className="w-full border rounded p-2 text-gray-500 bg-gray-100 cursor-not-allowed"
                  >
                    <option>Select a Service.....</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm">Preferred Date</label>
                  <input
                    disabled
                    type="date"
                    className="w-full border rounded p-2 text-gray-500 bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">
                    Preferred Stylist
                  </label>
                  <select
                    disabled
                    className="w-full border rounded p-2 text-gray-500 bg-gray-100 cursor-not-allowed"
                  >
                    <option>Select Preferred Stylist...</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm">Preferred Time</label>
                  <select
                    disabled
                    className="w-full border rounded p-2 text-gray-500 bg-gray-100 cursor-not-allowed"
                  >
                    <option>Select Preferred Time...</option>
                  </select>
                </div>
                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800"
                  >
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>

            {/* Related Services */}
            <div className="bg-white rounded-3xl shadow-md p-4 w-[350px] h-auto">
              <h3 className="text-lg font-semibold mb-3">Related Services</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex space-x-2 items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Eyebrow Tinting</p>
                      <p className="text-xs text-gray-600">
                        Add definition and depth to your brows
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            <div className="bg-white rounded-3xl shadow-md p-4 w-[350px] h-auto">
              <h3 className="text-lg font-semibold mb-3">Related Posts</h3>
              <div className="space-y-4">
                {[1, 2].map((item) => (
                  <div key={item}>
                    <div className="w-full h-24 bg-gray-300 rounded mb-2" />
                    <p className="font-medium text-xs">
                      5 Threading techniques for different brow shapes
                    </p>
                    <p className="text-[10px] text-gray-600">May 5, 2025</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetailPage;
