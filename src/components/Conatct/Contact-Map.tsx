export default function ContactMap() {
  return (
    <div className="bg-white shadow-md rounded-md p-4 border-l-4 border-b-4 border-[#B65C34] w-[400px] mb-8 max-h-[350px]">
      <h2 className="mb-5">Find Us</h2>
      <div className="  w-[350px] h-[200px] rounded-xl overflow-hidden shadow-lg mb-10">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3103.139146082685!2d-76.57459668464833!3d39.28034347951274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c8049bb3e6c55f%3A0xdeaee2e5a2575ad6!2s2931%20O'Donnell%20St%2C%20Baltimore%2C%20MD%2021224%2C%20USA!5e0!3m2!1sen!2snp!4v1720959059619!5m2!1sen!2snp"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
