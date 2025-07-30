export default function ContactForm() {
  return (
    <div className="bg-white shadow-md rounded-md p-4 border-l-4 border-b-4 border-[#B65C34] max-w-[400px] mt-20">
      <h3 className="font-semibold mb-4">Send Us a Message</h3>
      <form className="space-y-4 text-sm">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Full Name"
            className="border w-1/2 p-2"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="border w-1/2 p-2"
          />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          className="border w-full p-2"
        />
        <input
          type="text"
          placeholder="Select a service"
          className="border w-full p-2"
        />
        <textarea
          placeholder="Message"
          className="border w-full p-2 h-24"
        ></textarea>
        <button
          type="submit"
          className="bg-black text-white px-5 py-2 rounded-full text-xs"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
