import { FaFacebookF, FaLinkedinIn, FaGlobe, FaGithub } from "react-icons/fa";

const teamMembers = [
  {
    name: "Aaryan Kushwaha",
    image: "/images/ourTeam/leader.png",
    links: {
      facebook: "https://www.facebook.com/rupnarayan444",
      linkedin: "https://www.linkedin.com/in/aryan-kushwaha-47479033b/",
      website: "https://www.aaryankushawaha.com.np",
      github: "https://github.com/aryankushwaha444",
    },
  },
  {
    name: "Arabin Shrestha",
    image: "/images/ourTeam/one.jpg",
    links: {
      facebook: "https://www.facebook.com/arbin.stha.77",
      linkedin: "https://www.linkedin.com/in/arabin-shrestha-00056a23a/",
      github: "https://github.com/Arbinnn",
    },
  },
  {
    name: "Saurav Gautam",
    image: "/images/ourTeam/two.jpg",
    links: {
      facebook: "https://www.facebook.com/saurav1101/",
      github: "https://github.com/saurav624",
    },
  },
];

function ContactCard({ member }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 text-center transform transition-transform duration-300 hover:scale-105">
      <img
        src={member.image}
        alt={member.name}
        className="w-32 h-32 object-cover rounded-full border-4 border-indigo-500 shadow mx-auto mb-4 transform transition-transform duration-300 hover:scale-110"
      />

      <h2 className="text-xl font-bold text-indigo-800 mb-3">{member.name}</h2>

      <div className="flex justify-center gap-4 text-xl text-white">
        {member?.links?.facebook?.trim() && (
          <a
            href={member.links.facebook}
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-transform duration-200 hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} Facebook`}
          >
            <FaFacebookF />
          </a>
        )}

        {member?.links?.linkedin?.trim() && (
          <a
            href={member.links.linkedin}
            className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full transition-transform duration-200 hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} LinkedIn`}
          >
            <FaLinkedinIn />
          </a>
        )}

        {member?.links?.website?.trim() && (
          <a
            href={member.links.website}
            className="bg-green-600 hover:bg-green-700 p-2 rounded-full transition-transform duration-200 hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} Website`}
          >
            <FaGlobe />
          </a>
        )}

        {member?.links?.github?.trim() && (
          <a
            href={member.links.github}
            className="bg-gray-800 hover:bg-gray-900 p-2 rounded-full transition-transform duration-200 hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} GitHub`}
          >
            <FaGithub />
          </a>
        )}
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#74ebd5] via-[#acb6e5] to-[#ffffff] flex items-center justify-center px-4 py-8">
      <div className="bg-purple-100 rounded-3xl shadow-2xl px-6 py-8 w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center text-blue-500 mb-10">
          Our Team
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <ContactCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;
