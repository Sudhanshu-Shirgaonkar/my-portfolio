import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-scroll";

const sections = ["skills", "experience", "projects", "education", "contact"];

const skillsData = [
  { category: "Programming Languages", skills: "Python, JavaScript, SQL (PostgreSQL, MySQL), HTML, CSS" },
  { category: "Backend Frameworks", skills: "Django (REST Framework, Ninja), FastAPI, Flask, Node.js, Express" },
  { category: "Frontend Libraries", skills: "React, jQuery, Bootstrap" },
  { category: "Data Science & ML", skills: "Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn" },
  { category: "Databases & ORMs", skills: "PostgreSQL, MySQL, SQLAlchemy, MongoDB, Redis" },
  { category: "DevOps & Cloud", skills: "AWS (Lambda, S3, EC2, RDS, App Runner), Docker" }
];

const projectsData = [
  {
    title: "On-Demand Gig Platform",
    description: "Created APIs for job postings, payment integrations, and user transactions using Django Ninja.",
    link: "#"
  },
  {
    title: "Hospital Management System",
    description: "Developed APIs using Django Ninja and FastAPI, integrated AWS Lambda for scalable services.",
    link: "#"
  },
  {
    title: "Business ERP System",
    description: "Built accounting APIs, integrated E-Invoice and Twilio for billing and reminders.",
    link: "#"
  },
  {
    title: "Community Forum",
    description: "Reddit-like platform with real-time chat, user auth, and post interaction using Django.",
    link: "#"
  },
  {
    title: "Environmental Blog Platform",
    description: "Implemented several core CRUD APIs to support user activity and content interactions on a blog platform focused on environmental awareness. Contributed to backend development using Django REST Framework.",
    link: "#" // or live link if you want to add later
  },

  {
    title: "Sentence Generator",
    description: "Created a sentence generator using the T5 model that can write sentences based on a given keyword. This project was built to explore how AI can generate human-like text.",
    link: "#"
  }

];

const educationData = [
  {
    title: "Master of Computer Applications",
    school: "D. Y. Patil International University, Akurdi, Pune",
    details: "Specialized in Artificial Intelligence & Data Science.",
    year: "2021 – 2023",
  },
  {
    title: "Bachelor of Computer Applications",
    school: " D. Y. Patil International University, Akurdi, Pune",
    details: "Specialized in Mobile Applications & Web Technology",
    year: "2018 – 2021",
  },
];

const experienceData = [
  {
    title: "Software Developer",
    company: "E-BETA INNOVATIONS LLP | July 2024 – Present",
    points: [
      "Developed and maintained APIs using Django Ninja and FastAPI.",
      "Fixed bugs and optimized performance, reliability, and security.",
      "Collaborated with frontend team to integrate APIs for a seamless UX."
    ]
  },
  {
    title: "Python Django Intern",
    company: "Banao Technology | March 2023 – February 2024",
    points: [
      "Built APIs with Django REST Framework for multiple apps.",
      "Integrated third-party APIs for payments and invoicing.",
      "Performed unit and integration testing to ensure API quality."
    ]
  }
];

// ✅ Animated Section Wrapper
const AnimatedSection = ({ children, direction = "left", delay = 0 }) => {
  const variants = {
    hidden: { opacity: 0, x: direction === "left" ? -100 : 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

const MouseEffect = () => {
  const blobRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (blobRef.current) {
        blobRef.current.animate(
          { left: `${e.clientX - 150}px`, top: `${e.clientY - 150}px` },
          { duration: 300, fill: "forwards" }
        );
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={blobRef}
      className="fixed w-72 h-72 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-30 blur-3xl pointer-events-none -z-10"
      style={{ top: 0, left: 0 }}
    ></div>
  );
};

const ShowMoreSection = ({ items, renderItem, initialVisible = 3 }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, initialVisible);

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visibleItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </div>
      {items.length > initialVisible && (
        <div className="mt-6 text-center md:hidden">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 font-medium underline"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </>
  );
};

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-[Inter] bg-gray-50 text-gray-800 relative overflow-hidden">
      <MouseEffect />

      {/* Navbar */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600 italic transform -rotate-2 ml-[-8px] md:ml-0">
            Sudhanshu Shirgaonkar
          </h1>
          <nav className="hidden md:flex space-x-6 text-lg font-semibold">
            {sections.map((s) => (
              <Link
                key={s}
                to={s}
                spy
                smooth
                duration={500}
                offset={-70}
                activeClass="text-blue-600 font-semibold"
                className="cursor-pointer hover:text-blue-600 capitalize transition"
              >
                {s}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-blue-700"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white px-6 py-4 space-y-4 text-lg font-semibold shadow">
            {sections.map((s) => (
              <Link
                key={s}
                to={s}
                spy
                smooth
                duration={500}
                offset={-70}
                activeClass="text-blue-600 font-semibold"
                className="block cursor-pointer hover:text-blue-600 capitalize transition"
                onClick={() => setMenuOpen(false)}
              >
                {s}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-blue-100" id="hero">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <AnimatedSection direction="left">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-5xl font-extrabold mb-4">Hi, I’m Sudhanshu Shirgaonkar</h2>
              <p className="text-xl text-gray-700 mb-4">
                I'm a skilled backend developer with experience in building robust APIs, integrating third-party services, and optimizing performance for scalable applications.
              </p>
              <div className="flex justify-center md:justify-start gap-4 mt-4">
                <a href="https://github.com/Sudhanshu-Shirgaonkar" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="text-2xl text-gray-700 hover:text-black" />
                </a>
                <a href="https://www.linkedin.com/in/sudhanshu-shirgaonkar/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-2xl text-gray-700 hover:text-blue-700" />
                </a>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <motion.img
              src={`${process.env.PUBLIC_URL}/Developer activity-rafiki.png`}
              alt="dev illustration"
              className="w-full max-w-sm mx-auto"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection direction="left">
            <h2 className="text-3xl font-semibold mb-12 text-center">Skills & Technologies</h2>
            <ShowMoreSection
              items={skillsData}
              initialVisible={4}
              renderItem={(item) => (
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition">
                  <h3 className="text-xl font-semibold mb-2 text-blue-700">{item.category}</h3>
                  <p className="text-sm text-gray-700">{item.skills}</p>
                </div>
              )}
            />
          </AnimatedSection>
        </div>
      </section>
      {/* Experience */}
      <section id="experience" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection direction="right">
            <h2 className="text-3xl font-semibold mb-10 text-center">Experience</h2>

            {/* Desktop: Show all */}
            <div className="hidden md:block">
              <div className="grid md:grid-cols-2 gap-6">
                {experienceData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow text-left"
                  >
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.company}</p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      {item.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile: ShowMoreSection */}
            <div className="md:hidden">
              <ShowMoreSection
                items={experienceData}
                initialVisible={1}
                renderItem={(item) => (
                  <div className="bg-white p-6 rounded-xl shadow text-left">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.company}</p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      {item.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection direction="left">
            <h2 className="text-3xl font-semibold mb-10 text-center">Projects</h2>

            {/* Desktop: Show all */}
            <div className="hidden md:grid md:grid-cols-2 gap-6">
              {projectsData.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow text-left hover:shadow-xl hover:scale-[1.02] transition-transform"
                >
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-sm mb-2">{project.description}</p>
                  {project.link && project.link !== "#" && (
                    <a
                      href={project.link}
                      className="text-blue-600 underline text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Mobile: ShowMore */}
            <div className="md:hidden">
              <ShowMoreSection
                items={projectsData}
                initialVisible={2}
                renderItem={(project) => (
                  <div className="bg-white p-6 rounded-xl shadow text-left hover:shadow-xl hover:scale-[1.02] transition-transform">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-sm mb-2">{project.description}</p>
                    {project.link && project.link !== "#" && (
                      <a
                        href={project.link}
                        className="text-blue-600 underline text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                )}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* Education */}
      <section id="education" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection direction="right">
            <h2 className="text-3xl font-semibold mb-10 text-center">Education</h2>

            {/* Desktop: Show all */}
            <div className="hidden md:grid md:grid-cols-2 gap-6">
              {educationData.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6 shadow hover:shadow-xl hover:scale-[1.02] transition-transform"
                >
                  <h3 className="text-xl font-bold text-blue-700">{edu.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{edu.school}</p>
                  <p className="text-sm text-gray-500 italic mb-1">{edu.year}</p>
                  <p className="text-gray-700 text-sm">{edu.details}</p>
                </motion.div>
              ))}
            </div>

            {/* Mobile: Show less initially */}
            <div className="md:hidden">
              <ShowMoreSection
                items={educationData}
                initialVisible={1}
                renderItem={(edu) => (
                  <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6 shadow hover:shadow-xl hover:scale-[1.02] transition-transform">
                    <h3 className="text-xl font-bold text-blue-700">{edu.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{edu.school}</p>
                    <p className="text-gray-700 text-sm">{edu.details}</p>
                  </div>
                )}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16">
        <AnimatedSection direction="left">
          <div className="max-w-xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-semibold mb-6">Contact</h2>
            <a href="mailto:sudhanshu2684@gmail.com" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">Send Email</a>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 py-4 text-center text-sm text-gray-600">
        <div className="flex justify-center gap-4 mb-2">
          <a href="https://www.linkedin.com/in/sudhanshu-shirgaonkar/" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-xl" />
          </a>
          <a href="https://www.linkedin.com/in/sudhanshu-shirgaonkar/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-xl" />
          </a>
        </div>
        &copy; 2025 Sudhanshu Shirgaonkar. All rights reserved.
      </footer>

      {/* Jump to Top Button */}
      {showTopBtn && (
        <Link
          to="hero"
          smooth
          duration={500}
          className="fixed bottom-5 right-5 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition md:hidden"
        >
          <FaArrowUp className="text-lg" />
        </Link>
      )}
    </div>
  );
};

export default App;
