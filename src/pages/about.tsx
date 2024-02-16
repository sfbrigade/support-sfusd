import React from "react";
import Navbar from "../components/NavBar";

const About = () => {
  return (
    <div className="mx-auto flex h-[calc(100vh-64px)] max-w-[1280px] flex-col">
      <main className="flex-1 p-4">
        <div className="container mx-auto">
          <h1 className="mb-4 text-4xl font-bold">About Us</h1>

          <p className="mb-4 text-lg">
            Welcome to Support SFUSD, a platform dedicated to fostering
            connections between the community and schools within the San
            Francisco Unified School District.
          </p>

          <p className="mb-4 text-lg">
            Our mission is to enhance the educational experience of students by
            facilitating community involvement and support. We believe in the
            power of community to make a positive impact on the education and
            lives of young people.
          </p>

          <p className="mb-4 text-lg">
            On our platform, you can discover schools, find opportunities to get
            involved, and learn about the various ways you can contribute to
            supporting education in San Francisco. Whether you are a parent,
            teacher, student, or community member, there is a place for you
            here.
          </p>

          <h2 className="mb-3 text-3xl font-bold">Get Involved</h2>

          <p className="mb-4 text-lg">
            There are numerous ways to get involved and make a difference. From
            volunteering in schools to donating resources, your support is
            invaluable. Explore our website to find the best way for you to
            contribute.
          </p>

          <h2 className="mb-3 text-3xl font-bold">Contact Us</h2>

          <p className="mb-4 text-lg">
            If you have any questions or would like to learn more about how you
            can support SFUSD, please do not hesitate to{" "}
            <a href="" className="text-blue-600">
              contact us
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
};

export default About;
