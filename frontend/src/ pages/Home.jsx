import React from "react";

// 🟤 Service Card Data
const services = [
  {
    title: 'Food Service',
    description:
      'Premium nutrition plans tailored for your dog’s specific needs. Fresh, healthy meals delivered to your doorstep with expert dietary guidance.',
    features: ['Customized meal plans', 'Fresh ingredient delivery', 'Nutritionist consultation'],
    tag: 'First 2 Months FREE',
    tagColor: 'bg-green-600',
    buttonText: 'Start Free Trial',
    buttonColor: 'bg-orange-700 hover:bg-orange-800',
    icon: '🍲',
  },
  {
    title: 'Vaccination Service',
    description:
      'Complete vaccination schedules and preventive care to keep your dog healthy and protected from diseases throughout their life.',
    features: ['Complete vaccination schedule', 'Health monitoring', 'Preventive care plans'],
    tag: 'First 2 Months FREE',
    tagColor: 'bg-green-600',
    buttonText: 'Start Free Trial',
    buttonColor: 'bg-orange-700 hover:bg-orange-800',
    icon: '💉',
  },
  {
    title: "Emergency Doctor",
    description:
      "Round-the-clock emergency veterinary services with experienced doctors ready to handle any urgent health situations for your pet.",
    features: [
      "24/7 emergency response",
      "Expert veterinarians",
      "Immediate medical care",
    ],
    tag: "24/7 Emergency",
    tagColor: "bg-red-600",
    buttonText: "Emergency Call",
    buttonColor: "bg-red-600 hover:bg-red-700",
    icon: "🩺",
  },
];

// 🟤 Reusable Service Card Component
const ServiceCards = () => {
  return (
    <div className="bg-[#fdfaf6] py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white border border-orange-100 rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <div className="text-5xl mb-2">{service.icon}</div>
            <div className={`text-xs text-white px-3 py-1 rounded-full mb-4 ${service.tagColor}`}>
              {service.tag}
            </div>
            <h2 className="text-xl font-bold text-orange-800 mb-2">{service.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
            <ul className="text-left text-sm text-gray-700 mb-4 list-disc list-inside">
              {service.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <button
              className={`${service.buttonColor} text-white font-semibold px-5 py-2 rounded-full transition`}
            >
              {service.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// 🟤 Main Home Component
const Home = () => {
  const features = [
    {
      title: "Expert Veterinarians",
      description: "Experienced veterinarians available 24/7 for your pet's needs",
      icon: "🏥",
    },
    {
      title: "Healthy Nutrition",
      description: "Customized nutritious meal plans for your dog's specific needs",
      icon: "🍖",
    },
    {
      title: "Vaccination Service",
      description: "Timely vaccinations and regular health check-ups",
      icon: "💉",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Register Your Dog",
      description: "Create an account and register your dog with their health details",
    },
    {
      number: "2",
      title: "Choose Services",
      description: "Select from our food, vacation care, or doctor services",
    },
    {
      number: "3",
      title: "Book Appointment",
      description: "Schedule your preferred time and date for the service",
    },
    {
      number: "4",
      title: "Enjoy the Service",
      description: "Relax while we take care of your furry friend",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative flex items-center justify-center h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/dog1.png')",
        }}
      >
        <div className="absolute inset-0 bg-yellow-900 bg-opacity-70"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Your Dog's Health is <br /> Our Priority
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Complete healthcare solutions for your beloved pets with food, vacation care, and professional veterinary services.
          </p>
          <a
            href="#"
            className="inline-block px-8 py-4 rounded-full bg-orange-800 hover:bg-orange-900 text-white text-lg font-semibold shadow-lg transition"
          >
            Get Started - Login or Register
          </a>
        </div>
      </div>

      <section id="services">

      {/* Services Cards Section */}
      <ServiceCards />

      </section>

      {/* Who We Are Section */}
      <section className="py-16 bg-white" id="whoweare" > 
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Who We Are</h2>
          <p className="text-lg text-gray-600 mb-12">
            We are a dedicated team committed to ensuring the health and happiness of your dogs
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-yellow-50 rounded-lg p-8 shadow hover:shadow-lg transition"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-orange-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16" id="howitworks"  >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-gray-600 text-lg mb-12">
            Simple steps to get started with our services
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
              >
                <div className="text-white bg-orange-700 w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          <a
            href="/signup"
            className="inline-block bg-orange-700 hover:bg-orange-800 text-white font-semibold py-3 px-6 rounded-full transition"
          >
            Get Started Now
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
