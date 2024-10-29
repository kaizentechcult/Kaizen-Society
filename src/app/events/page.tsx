import BuildWithDelhi from "@/components/BuildWithDelhi/BuildWithDelhi";
import KotlinGfg from "@/components/KotlinGfg/KotlinGfg";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <section className="bg-white py-8 mt-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
              Upcoming Events
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Build With Delhi
              </h3>
              <p className="text-gray-600">
                Build With Delhi is a 24 hour hackathon organized by Kaizen
                Technical Society, IIIT Delhi. The event aims to bring together
                students from diverse backgrounds and provide them with a
                platform to showcase their skills and work on innovative
                projects.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
              Completed Events
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Kotlin GFG
              </h3>
              <p className="text-gray-600">
                Kotlin GFG is a meetup organized by Kaizen Technical Society,
                IIIT Delhi. The event aims to bring together students who are
                interested in Kotlin and Android app development and provide
                them with a platform to learn and share their knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
