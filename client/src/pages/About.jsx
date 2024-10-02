export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 my-7">
          About Inkflow
        </h1>
        <div className="text-md text-gray-600 dark:text-gray-300 flex flex-col gap-6">
          <p>
            Welcome to Inkflow! This blog was created as a creative outlet to
            share knowledge, insights, and experiences in the realm of
            technology and programming. At Inkflow, we believe in the power of
            words and ideas to inspire and educate.
          </p>

          <p>
            Here, you'll find a diverse array of articles and tutorials covering
            topics like web development, software engineering, and the latest
            trends in technology. Our mission is to provide valuable content
            that empowers you to enhance your skills and stay informed in this
            ever-evolving digital landscape.
          </p>

          <p>
            We encourage community engagement, so feel free to leave comments on
            our posts, share your thoughts, and connect with other readers.
            Whether you're a beginner or an experienced developer, Inkflow is a
            space for learning and collaboration. Let's grow together!
          </p>
        </div>
      </div>
    </div>
  );
}
