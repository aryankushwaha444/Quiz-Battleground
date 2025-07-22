// // inserting data into MongoDB for userResult
// import Categories from "../models/user.Result.models.js";

// async function storeResultUsers() {
//   try {
//     const data = {
//       nameCategory: "CyberSecurity",
//       nameUser: "John Willis",
//       email: "john.willis@example.com",
//       questions: [
//         {
//           question: "What does the acronym 'VPN' stand for?",
//           answer: "Virtual Private Network",
//           correct: 1,
//           score: 5,
//         },
//         {
//           question: "Which protocol is used to securely browse the internet?",
//           answer: "HTTPS",
//           correct: 1,
//           score: 5,
//         },
//         {
//           question: "What is phishing?",
//           answer:
//             "A method to trick users into giving sensitive information via fake emails or websites.",
//           correct: 1,
//           score: 5,
//         },
//         {
//           question: "What is the primary purpose of a firewall?",
//           answer: "To block unauthorized access to or from a private network.",
//           correct: 1,
//           score: 5,
//         },
//         {
//           question: "What is multi-factor authentication?",
//           answer:
//             "Using more than one method of authentication to verify identity.",
//           correct: 1,
//           score: 5,
//         },
//         {
//           question: "What is malware?",
//           answer:
//             "Malicious software designed to harm or exploit devices or data.",
//           correct: 1,
//           score: 5,
//         },
//         {
//           question: "What does 'ransomware' do?",
//           answer:
//             "Encrypts a victim's files and demands payment to restore access.",
//           correct: 1,
//           score: 5,
//         },
//         {
//           question: "What is the main purpose of encryption?",
//           answer:
//             "To convert data into a secure format that cannot be read without a key.",
//           correct: 1,
//           score: 5,
//         },
//         {
//           question: "What does SQL injection target?",
//           answer: "Databases via malicious SQL statements.",
//           correct: 1,
//           score: 5,
//         },
//         {
//           question: "Which of these is a strong password?",
//           answer: "T8&f*92@Lk#q",
//           correct: 1,
//           score: 5,
//         },
//         {
//           question: "What is a DDoS attack?",
//           answer:
//             "Distributed Denial of Service – overwhelming a server with traffic.",
//           correct: 1,
//           score: 5,
//         },
//       ],
//     };

//     await Categories.insertMany(data);
//     console.log("Data Stored !");
//     mongoose.disconnect();
//   } catch (error) {
//     console.error("Error!", error);
//   }
// }

// storeResultUsers();












// {
//   "email": "alice@example.com",
//   "nameCategory": "Networking",
//   "roundClear": 3,
//   "wins": "1",
//   "score": {
//     "easy": 10,
//     "medium": 5,
//     "hard": 0
//   },
//   "questions": [
//     {
//       "question": "What is the default port for HTTP?",
//       "answer": "80",
//       "correctAnswer": "80",
//       "correct": true
//     },
//     {
//       "question": "What does IP stand for?",
//       "answer": "Internet Protocol",
//       "correctAnswer": "Internet Protocol",
//       "correct": true
//     }
//   ],
//   "finishedAt": "2025-07-22T09:30:00Z"
// }






// {
//   "email": "bob@cybermail.com",
//   "nameCategory": "Cybersecurity",
//   "roundClear": 2,
//   "wins": "0",
//   "score": {
//     "easy": 8,
//     "medium": 2,
//     "hard": 1
//   },
//   "questions": [
//     {
//       "question": "What is a brute force attack?",
//       "answer": "Trying all password combinations",
//       "correctAnswer": "Trying all password combinations",
//       "correct": true
//     },
//     {
//       "question": "Is HTTPS encrypted?",
//       "answer": "Yes",
//       "correctAnswer": "Yes",
//       "correct": true
//     },
//     {
//       "question": "What is a zero-day?",
//       "answer": "A known vulnerability",
//       "correctAnswer": "An unknown vulnerability",
//       "correct": false
//     }
//   ],
//   "finishedAt": "2025-07-21T15:45:00Z"
// }







// {
//   "email": "charlie@devopspro.com",
//   "nameCategory": "DevOps",
//   "roundClear": 4,
//   "wins": "1",
//   "score": {
//     "easy": 12,
//     "medium": 6,
//     "hard": 3
//   },
//   "questions": [
//     {
//       "question": "What tool is used for containerization?",
//       "answer": "Docker",
//       "correctAnswer": "Docker",
//       "correct": true
//     },
//     {
//       "question": "What does CI/CD stand for?",
//       "answer": "Continuous Integration/Continuous Deployment",
//       "correctAnswer": "Continuous Integration/Continuous Delivery",
//       "correct": false
//     }
//   ],
//   "finishedAt": "2025-07-20T18:00:00Z"
// }



