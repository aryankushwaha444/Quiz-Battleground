import { FaFacebookF, FaLinkedinIn, FaGlobe, FaGithub } from "react-icons/fa";

function Contact() {
  return (
<div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-600 flex items-center justify-center px-4">
  <div className="bg-purple-100 rounded-3xl shadow-2xl flex flex-col justify-center px-4 py-5 mt-15 mb-18">
<h1 className="text-4xl font-bold text-center text-blue-500 m-4">Our Team</h1>

      {/* Leader */}

      <div className="bg-white rounded-3xl shadow-xl p-6 max-w-4xl mx-auto mb-12 transform hover:scale-105 transition-transform">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src="../images/ourTeam/leader.PNG"
            alt="Leader"
            className="w-40 h-40 object-cover rounded-full border-4 border-indigo-500 shadow transform hover:scale-170 transition-transform"
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-indigo-800 mb-1 transform hover:scale-120 transition-transform">Aryan Kushwaha</h2>
            <p className="text-lg text-gray-700 mb-3">Project Leader</p>
            <div className="flex justify-center md:justify-start gap-4 text-xl text-white ">
              <a
                href="https://www.facebook.com/rupnarayan444"
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transform hover:scale-150 transition-transform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.linkedin.com/in/aryan-kushwaha-47479033b/"
                className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full transform hover:scale-150 transition-transform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.aaryankushawaha.com.np"
                className="bg-green-600 hover:bg-green-700 p-2 rounded-full transform hover:scale-150 transition-transform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGlobe />
              </a>
              <a
                href="https://github.com/aryankushwaha444"
                className="bg-gray-800 hover:bg-gray-900 p-2 rounded-full transform hover:scale-150 transition-transform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Collaborators */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto ">
 
        <div className="bg-white rounded-2xl shadow p-6 text-center transform hover:scale-105 transition-transform">
          <img
            src="../images/ourTeam/one.JPG" 
            alt="Collaborator 1"
            className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-purple-400 transform hover:scale-170 transition-transform"
          />
          <h3 className="text-xl font-semibold mt-4 text-purple-700 transform hover:scale-120 transition-transform">Arabin Shrestha</h3>
          <p className="text-gray-600">Collaborator</p>
        </div>

      
        <div className="bg-white rounded-2xl shadow p-6 text-center transform hover:scale-105 transition-transform">
          <img
            src="../images/ourTeam/two.jpg" 
            alt="Collaborator 2"
            className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-purple-400 transform hover:scale-170 transition-transform"
          />
          <h3 className="text-xl font-semibold mt-4 text-purple-700 transform hover:scale-120 transition-transform">Saurav Gautam</h3>
          <p className="text-gray-600">Collaborator</p>
        </div>
      </div>

      </div>
    </div>
  );
}

export default Contact;
