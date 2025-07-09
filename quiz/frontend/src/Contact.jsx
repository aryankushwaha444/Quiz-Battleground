import { FaFacebookF, FaLinkedinIn, FaGlobe, FaGithub } from "react-icons/fa";

function Contact() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col justify-center px-4 py-5 mt-18 mb-18 w-full">
        <h1 className="text-4xl font-bold text-center text-primary m-4">
          Our Team
        </h1>
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto w-full justify-center items-center">
          {/* Leader */}
          <div className="bg-white rounded-3xl shadow-xl p-6 flex-1 flex flex-col items-center transform hover:scale-105 transition-transform min-w-[250px] max-w-xs w-full">
            <img
              src="../images/ourTeam/leader.PNG"
              alt="Leader"
              className="w-32 h-32 object-cover rounded-full border-4 border-indigo-500 shadow mb-4"
            />
            <h2 className="text-2xl font-bold text-indigo-800 mb-1">
              Aryan Kushwaha
            </h2>

            <div className="flex justify-center gap-4 text-xl text-white ">
              <a
                href="https://www.facebook.com/rupnarayan444"
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.linkedin.com/in/aryan-kushwaha-47479033b/"
                className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.aaryankushawaha.com.np"
                className="bg-green-600 hover:bg-green-700 p-2 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGlobe />
              </a>
              <a
                href="https://github.com/aryankushwaha444"
                className="bg-gray-800 hover:bg-gray-900 p-2 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Collaborator 1 */}
          <div className="bg-white rounded-3xl shadow-xl p-6 flex-1 flex flex-col items-center transform hover:scale-105 transition-transform min-w-[250px] max-w-xs w-full">
            <img
              src="../images/ourTeam/one.JPG"
              alt="Collaborator 1"
              className="w-32 h-32 object-cover rounded-full border-4 border-purple-400 shadow mb-4"
            />
            <h3 className="text-2xl font-bold text-purple-700 mb-1">
              Arabin Shrestha
            </h3>
            <div className="flex justify-center gap-4 text-xl text-white ">
              <a
                href="https://www.facebook.com/arbin.stha.77/"
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.linkedin.com/in/arabin-shrestha-00056a23a/"
                className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://github.com/Arbinnn"
                className="bg-gray-800 hover:bg-gray-900 p-2 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Collaborator 2 */}
          <div className="bg-white rounded-3xl shadow-xl p-6 flex-1 flex   flex-col items-center transform hover:scale-105 transition-transform min-w-[250px] max-w-xs w-full">
            <img
              src="../images/ourTeam/two.jpg"
              alt="Collaborator 2"
              className="w-32 h-32 object-cover rounded-full border-4 border-purple-400 shadow mb-4"
            />
            <h3 className="text-2xl font-bold text-purple-700 mb-1">
              Saurav Gautam
            </h3>

            <div className="flex justify-center gap-4 text-xl text-white ">
              <a
                href="https://www.facebook.com/saurav.gautam.123"
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.linkedin.com/in/saurav-gautam-123456789/"
                className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://github.com/sauravgautam"
                className="bg-gray-800 hover:bg-gray-900 p-2 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
