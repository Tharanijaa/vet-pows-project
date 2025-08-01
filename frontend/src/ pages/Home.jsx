// import React from "react";

// // 🟤 Service Card Data
// const services = [
//   {
//     title: 'Food Service',
//     description:
//       'Premium nutrition plans tailored for your dog’s specific needs. Fresh, healthy meals delivered to your doorstep with expert dietary guidance.',
//     features: ['Customized meal plans', 'Fresh ingredient delivery', 'Nutritionist consultation'],
//     tag: 'First 2 Months FREE',
//     tagColor: 'bg-green-600',
//     buttonText: 'Start Free Trial',
//     buttonColor: 'bg-orange-700 hover:bg-orange-800',
//     icon: '🍲',
//   },
//   {
//     title: 'Vaccination Service',
//     description:
//       'Complete vaccination schedules and preventive care to keep your dog healthy and protected from diseases throughout their life.',
//     features: ['Complete vaccination schedule', 'Health monitoring', 'Preventive care plans'],
//     tag: 'First 2 Months FREE',
//     tagColor: 'bg-green-600',
//     buttonText: 'Start Free Trial',
//     buttonColor: 'bg-orange-700 hover:bg-orange-800',
//     icon: '💉',
//   },
//   {
//     title: "Emergency Doctor",
//     description:
//       "Round-the-clock emergency veterinary services with experienced doctors ready to handle any urgent health situations for your pet.",
//     features: [
//       "24/7 emergency response",
//       "Expert veterinarians",
//       "Immediate medical care",
//     ],
//     tag: "24/7 Emergency",
//     tagColor: "bg-red-600",
//     buttonText: "Emergency Call",
//     buttonColor: "bg-red-600 hover:bg-red-700",
//     icon: "🩺",
//   },
// ];

// // 🟤 Reusable Service Card Component
// const ServiceCards = () => {
//   return (
//     <div className="bg-[#fdfaf6] py-16 px-4">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//         {services.map((service, index) => (
//           <div
//             key={index}
//             className="bg-white border border-orange-100 rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
//           >
//             <div className="text-5xl mb-2">{service.icon}</div>
//             <div className={`text-xs text-white px-3 py-1 rounded-full mb-4 ${service.tagColor}`}>
//               {service.tag}
//             </div>
//             <h2 className="text-xl font-bold text-orange-800 mb-2">{service.title}</h2>
//             <p className="text-sm text-gray-600 mb-4">{service.description}</p>
//             <ul className="text-left text-sm text-gray-700 mb-4 list-disc list-inside">
//               {service.features.map((f, i) => (
//                 <li key={i}>{f}</li>
//               ))}
//             </ul>
//             <button
//               className={`${service.buttonColor} text-white font-semibold px-5 py-2 rounded-full transition`}
//             >
//               {service.buttonText}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // 🟤 Main Home Component
// const Home = () => {
//   const features = [
//     {
//       title: "Expert Veterinarians",
//       description: "Experienced veterinarians available 24/7 for your pet's needs",
//       icon: "🏥",
//     },
//     {
//       title: "Healthy Nutrition",
//       description: "Customized nutritious meal plans for your dog's specific needs",
//       icon: "🍖",
//     },
//     {
//       title: "Vaccination Service",
//       description: "Timely vaccinations and regular health check-ups",
//       icon: "💉",
//     },
//   ];

//   const steps = [
//     {
//       number: "1",
//       title: "Register Your Dog",
//       description: "Create an account and register your dog with their health details",
//     },
//     {
//       number: "2",
//       title: "Choose Services",
//       description: "Select from our food, vacation care, or doctor services",
//     },
//     {
//       number: "3",
//       title: "Book Appointment",
//       description: "Schedule your preferred time and date for the service",
//     },
//     {
//       number: "4",
//       title: "Enjoy the Service",
//       description: "Relax while we take care of your furry friend",
//     },
//   ];

//   return (
//     <>
//       {/* Hero Section */}
//       <div
//         className="relative flex items-center justify-center h-screen bg-cover bg-center"
//         style={{
//           backgroundImage: "url('/assets/dog1.png')",
//         }}
//       >
//         <div className="absolute inset-0 bg-yellow-900 bg-opacity-70"></div>
//         <div className="relative z-10 text-center text-white px-6">
//           <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
//             Your Dog's Health is <br /> Our Priority
//           </h1>
//           <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
//             Complete healthcare solutions for your beloved pets with food, vacation care, and professional veterinary services.
//           </p>
//           <a
//             href="#"
//             className="inline-block px-8 py-4 rounded-full bg-orange-800 hover:bg-orange-900 text-white text-lg font-semibold shadow-lg transition"
//           >
//             Get Started - Login or Register
//           </a>
//         </div>
//       </div>

//       <section id="services">

//       {/* Services Cards Section */}
//       <ServiceCards />

//       </section>

//       {/* Who We Are Section */}
//       <section className="py-16 bg-white" id="whoweare" > 
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <h2 className="text-4xl font-bold text-gray-800 mb-4">Who We Are</h2>
//           <p className="text-lg text-gray-600 mb-12">
//             We are a dedicated team committed to ensuring the health and happiness of your dogs
//           </p>

//           <div className="grid gap-8 md:grid-cols-3">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-yellow-50 rounded-lg p-8 shadow hover:shadow-lg transition"
//               >
//                 <div className="text-5xl mb-4">{feature.icon}</div>
//                 <h3 className="text-xl font-semibold text-orange-800 mb-2">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-700">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="bg-gray-50 py-16" id="howitworks"  >
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
//           <p className="text-gray-600 text-lg mb-12">
//             Simple steps to get started with our services
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
//             {steps.map((step, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
//               >
//                 <div className="text-white bg-orange-700 w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold mb-4">
//                   {step.number}
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
//                 <p className="text-gray-600 text-sm">{step.description}</p>
//               </div>
//             ))}
//           </div>

//           <a
//             href="/signup"
//             className="inline-block bg-orange-700 hover:bg-orange-800 text-white font-semibold py-3 px-6 rounded-full transition"
//           >
//             Get Started Now
//           </a>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Home;

import React from "react";
import { FaBowlFood, FaSyringe, FaUserDoctor } from "react-icons/fa6";
import { GiDogBowl, GiHealthNormal } from "react-icons/gi";
import { MdMedicalServices } from "react-icons/md";
import { motion } from "framer-motion";

/// 🟤 Service Card Data
const services = [
  {
    title: 'Food Service',
    description:
      "Premium nutrition plans tailored for your dog's specific needs. Fresh, healthy meals delivered to your doorstep with expert dietary guidance.",
    features: ['Customized meal plans', 'Fresh ingredient delivery', 'Nutritionist consultation'],
    tag: 'First 2 Months FREE',
    tagColor: 'bg-amber-600', // Changed from bg-green-600
    buttonText: 'Start Free Trial',
    buttonColor: 'bg-amber-600 hover:bg-amber-900',
    icon: <FaBowlFood className="text-4xl" />,
  },
  {
    title: 'Vaccination Service',
    description:
      'Complete vaccination schedules and preventive care to keep your dog healthy and protected from diseases throughout their life.',
    features: ['Complete vaccination schedule', 'Health monitoring', 'Preventive care plans'],
    tag: 'First 2 Months FREE',
    tagColor: 'bg-amber-600', // Changed from bg-green-600
    buttonText: 'Start Free Trial',
    buttonColor: 'bg-amber-600 hover:bg-amber-900',
    icon: <FaSyringe className="text-4xl" />,
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
    tagColor: "bg-amber-600", // Changed from bg-red-600 (kept distinct from the free trial tags)
    buttonText: "Emergency Call",
    buttonColor: "bg-amber-600 hover:bg-amber-900", // Changed from red to amber
    icon: <FaUserDoctor className="text-4xl" />,
  },
];

// 🟤 Reusable Service Card Component
const ServiceCards = () => {
  return (
    <div className="bg-amber-50 py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-amber-100 border border-amber-200 rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-all"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="text-amber-800 mb-4 p-4 bg-amber-50 rounded-full"
            >
              {service.icon}
            </motion.div>
            <div className={`text-xs text-white px-3 py-1 rounded-full mb-4 ${service.tagColor}`}>
              {service.tag}
            </div>
            <h2 className="text-xl font-bold text-amber-900 mb-2">{service.title}</h2>
            <p className="text-sm text-amber-800 mb-4">{service.description}</p>
            <ul className="text-left text-sm text-amber-900 mb-4 list-disc list-inside">
              {service.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${service.buttonColor} text-white font-semibold px-5 py-2 rounded-full transition-colors`}
            >
              {service.buttonText}
            </motion.button>
          </motion.div>
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
      icon: <MdMedicalServices className="text-4xl" />,
    },
    {
      title: "Healthy Nutrition",
      description: "Customized nutritious meal plans for your dog's specific needs",
      icon: <GiDogBowl className="text-4xl" />,
    },
    {
      title: "Vaccination Service",
      description: "Timely vaccinations and regular health check-ups",
      icon: <GiHealthNormal className="text-4xl" />,
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
      {/* Hero Section with Enhanced Glass Morphism */}
      <div
        className="relative flex items-center justify-center h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/dog1.png')",
          backgroundPosition: "center 30%"
        }}
      >
        <div className="absolute inset-0 bg-amber-900 bg-opacity-70"></div>
        <div className="relative z-10 text-center px-6 w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-md bg-white/10 p-12 rounded-2xl border border-amber-200/30 shadow-xl"
          >
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6 text-amber-50 drop-shadow-lg"
            >
              Your Dog's Health is <br /> Our Priority
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl mb-8 text-amber-100 max-w-2xl mx-auto"
            >
              Complete healthcare solutions for your beloved pets with food, vacation care, and professional veterinary services.
            </motion.p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/login"
              className="inline-block px-8 py-4 rounded-full bg-amber-800 hover:bg-amber-900 text-white text-lg font-semibold shadow-lg transition-all"
            >
              Get Started
            </motion.a>
          </motion.div>
        </div>
      </div>

      <section id="services">
        <ServiceCards />
      </section>

      {/* Who We Are Section */}
      <section className="py-16 bg-amber-100" id="whoweare"> 
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-amber-900 mb-4"
          >
            Who We Are
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-amber-800 mb-12"
          >
            We are a dedicated team committed to ensuring the health and happiness of your dogs
          </motion.p>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg p-8 shadow hover:shadow-lg transition-all"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="text-amber-800 mb-4 p-4 bg-amber-50 rounded-full inline-block"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-amber-800">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16" id="howitworks">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-amber-900 mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-amber-800 text-lg mb-12"
          >
            Simple steps to get started with our services
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-amber-50 p-6 rounded-lg shadow hover:shadow-lg transition-all text-center"
              >
                <div className="text-white bg-amber-800 w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">{step.title}</h3>
                <p className="text-amber-800 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/signup"
            className="inline-block bg-amber-800 hover:bg-amber-900 text-white font-semibold py-3 px-6 rounded-full transition-all"
          >
            Get Started Now
          </motion.a> */}
        </div>
      </section>
    </>
  );
};

export default Home;