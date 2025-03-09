import { useState } from "react";

const Support = () => {
  const [activeSection, setActiveSection] = useState("choose");

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <h2 className="text-3xl font-bold text-center mb-10">How Can We Help?</h2>
      
      <div className="flex justify-center space-x-10 mb-12">
        {[
          { id: "choose", step: "1", title: "Choose Your Ride" },
          { id: "book", step: "2", title: "Book Online" },
          { id: "enjoy", step: "3", title: "Enjoy Your Ride" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex flex-col items-center transition-all ${
              activeSection === item.id ? "text-blue-600" : "text-gray-700"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                activeSection === item.id ? "bg-blue-600" : "bg-yellow-500"
              }`}
            >
              {item.step}
            </div>
            <p className="mt-2 font-semibold">{item.title}</p>
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
        {activeSection === "choose" && (
          <div>
            <h3 className="text-xl font-bold mb-3">Choose Your Ride</h3>
            <p>Pick from a variety of car options for your needs.</p>
          </div>
        )}
        {activeSection === "book" && (
          <div>
            <h3 className="text-xl font-bold mb-3">Book Online</h3>
            <p>Enter your details and confirm your booking.</p>
          </div>
        )}
        {activeSection === "enjoy" && (
          <div>
            <h3 className="text-xl font-bold mb-3">Enjoy Your Ride</h3>
            <p>Relax and enjoy a comfortable journey.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;