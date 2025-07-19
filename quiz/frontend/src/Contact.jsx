import { FaFacebookF, FaLinkedinIn, FaGlobe, FaGithub } from "react-icons/fa";

const teamMembers = [
  {
    name: "Aaryan Kushawaha",
    image: "../images/ourTeam/leader.PNG",
    links: {
      facebook: "https://www.facebook.com/rupnarayan444",
      linkedin: "https://www.linkedin.com/in/aryan-kushwaha-47479033b/",
      website: "https://www.aaryankushawaha.com.np",
      github: "https://github.com/aryankushwaha444",
    },
  },
  {
    name: "Arabin Shrestha",
    image: "../images/ourTeam/one.JPG",
    links: {
      facebook: "https://www.facebook.com/arbin.stha.77",
      linkedin: "https://www.linkedin.com/in/arabin-shrestha-00056a23a/",
      github: "https://github.com/Arbinnn",
    },
  },
  {
    name: "Saurav Gautam",
    image: "../images/ourTeam/two.jpg",
    links: {
      facebook: " ",
      linkedin: " ",
      website: " ",
      github: " ",
    },
  },
];

function ContactCard({ member }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 transform hover:scale-105 transition-transform text-center">
      <img
        src={member.image}
        alt={member.name}
        className="w-32 h-32 object-cover rounded-full border-4 border-indigo-500 shadow mx-auto mb-4 transform hover:scale-140 transition-transform"
      />
      <h2 className="text-xl font-bold text-indigo-800 mb-3">{member.name}</h2>
      <div className="flex justify-center gap-4 text-xl text-white">
        {Boolean(member?.links?.facebook?.trim()) && (
          <a
            href={member.links.facebook}
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full hover:scale-130 transition-transform"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
        )}

        {Boolean(member?.links?.linkedin?.trim()) && (
          <a
            href={member.links.linkedin}
            className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full hover:scale-130 transition-transform"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
        )}

        {Boolean(member?.links?.website?.trim()) && (
          <a
            href={member.links.website}
            className="bg-green-600 hover:bg-green-700 p-2 rounded-full hover:scale-130 transition-transform"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGlobe />
          </a>
        )}

        {Boolean(member?.links?.github?.trim()) && (
          <a
            href={member.links.github}
            className="bg-gray-800 hover:bg-gray-900 p-2 rounded-full hover:scale-130 transition-transform"
            target="_blank"
            rel="noopener noreferrer"
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
    <div className="min-h-screen bg-gradient-to-br from-[#74ebd5] via-[#acb6e5] to-[#ffffff] flex items-center justify-center px-4">
      <div className="bg-purple-100 rounded-3xl shadow-2xl px-6 py-8 w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center text-blue-500 mb-10">
          Our Team
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <ContactCard key={index} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;
