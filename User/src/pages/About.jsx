import React from "react";
import Navbar from "../components/Navbar";
import Chatbot from "./Chatbot";

const About = () => {
  return (
    <div>
        <Navbar/>
        <Chatbot/>
 
    <div className="px-8 py-20 bg-gray-50" >
      
      <div
  className="flex flex-col items-center gap-12 mb-28 md:flex-row"
  style={{ color: "blue", marginTop: "30px" }}
>
        <img
          src="https://images.pexels.com/photos/5215006/pexels-photo-5215006.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="Doctor"
          className="w-full shadow-xl md:w-1/2 rounded-2xl"
        />
        <div className="text-center md:w-1/2 md:text-left" style={{padding:'90px'}}>
          <h1 className="mb-12 text-5xl font-bold text-blue-900">
            Welcome to Smart Care App
          </h1>
          <p className="mb-10 text-xl leading-relaxed text-gray-700">
            Welcome to <strong>SmartCare</strong>, your trusted partner in managing
            your healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to scheduling
            doctor appointments and managing their health records.
          </p>
          <p className="text-xl leading-relaxed text-gray-700">
            SmartCare is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior service.
            Whether you're booking your first appointment or managing ongoing care,
            Prescripto is here to support you every step of the way.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mb-24 text-center pt-28">
        <h2 className="mb-16 text-4xl font-semibold text-blue-800">Why Choose Us</h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {[
            {
              title: "Efficiency",
              desc: "Book appointments and manage records with ease.",
            },
            {
              title: "Personalization",
              desc: "Get tailored healthcare recommendations.",
            },
            {
              title: "Convenience",
              desc: "Access care anytime, anywhere.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="p-10 transition-colors duration-300 bg-white shadow-lg rounded-2xl hover:bg-blue-300"
            >
              <h3 className="mb-4 text-2xl font-semibold">{card.title}</h3>
              <p className="text-lg text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div
  className="max-w-3xl px-10 py-12 mx-auto mb-24 text-center bg-white shadow-md rounded-2xl"
  style={{
    paddingTop: "90px", 
    alignSelf: "center", 
    paddingLeft:"500px",
    width:'100%'
  }}
>
        <h3 className="mb-4 text-3xl font-semibold">About Prescripton</h3>
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          SmartCare is a modern solution to traditional healthcare hassles. We bring
          simplicity, speed, and smart features to help you stay in control of your
          health. Built with care for people who care.
        </p>
       
        
      </div>

      {/* Footer */}
      <footer className="pt-10 text-sm text-center text-gray-500 border-t">
        &copy; {new Date().getFullYear()} SmartCare. All rights reserved.
      </footer>
    </div>
    </div>
  );
};

export default About;
 