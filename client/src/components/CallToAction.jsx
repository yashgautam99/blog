import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col md:flex-row p-8 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg shadow-lg my-10">
      <div className="flex-1 flex flex-col justify-center items-start p-5">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Collaborate or Discuss an Idea?
        </h2>
        <p className="text-lg mb-6">
          Whether you're looking to bring a concept to life, explore new tech
          trends, or just need expert advice—let’s connect and make something
          amazing.
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          size="lg"
          className="rounded-tl-xl rounded-br-xl text-lg px-8 py-4"
        >
          <a href="#contact" className="no-underline text-white">
            Let’s Talk!
          </a>
        </Button>
      </div>
      <div className="flex-1 p-5">
        <img
          src="https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          alt="Collaboration"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
