import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";
import { MdOutlineEmojiEmotions } from "react-icons/md";

function Footercom() {
  return (
    <Footer
      container
      className="border-t-4 border-teal-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
    >
      <div className="w-full max-w-7xl mx-auto py-10 px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
          {/* Brand Section */}
          <div className="mt-5">
            <Link to="/" className="text-2xl font-bold">
              <span className="px-3 py-2 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-400 rounded-lg text-white">
                Inkflow
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Unleashing creativity, one thought at a time. Let your ideas flow
              with Inkflow.
            </p>
          </div>

          {/* Footer Links */}
          <div className="space-y-4">
            <Footer.Title
              title="Company"
              className="text-lg font-semibold text-gray-700 dark:text-gray-300"
            />
            <Footer.LinkGroup col className="space-y-2 ">
              {["About Us", "Careers", "Blog", "Contact"].map((item, index) => (
                <Footer.Link
                  key={index}
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition duration-200"
                >
                  {item}
                </Footer.Link>
              ))}
            </Footer.LinkGroup>
          </div>

          {/* Follow Us */}
          <div className="space-y-4">
            <Footer.Title
              title="Follow Us"
              className="text-lg font-semibold text-gray-700 dark:text-gray-300"
            />
            <div className="flex justify-center sm:justify-start gap-5 mt-3">
              {[
                { icon: BsFacebook, href: "#" },
                {
                  icon: BsInstagram,
                  href: "https://www.instagram.com/thatsyash01/",
                },
                { icon: BsTwitter, href: "https://x.com/yashgautam2502" },
                { icon: BsGithub, href: "https://github.com/yashgautam99" },
                {
                  icon: MdOutlineEmojiEmotions,
                  href: "https://yashportfolio-react.netlify.app/",
                },
              ].map((social, index) => (
                <Footer.Icon
                  key={index}
                  href={social.href}
                  icon={social.icon}
                  className="hover:text-teal-600 transition duration-200"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <Footer.Divider className="my-6 border-t-2 border-gray-300 dark:border-gray-700" />

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <Footer.Copyright
            href="#"
            by="Inkflow Inc"
            year={new Date().getFullYear()}
          />
          <div className="flex space-x-6 mt-4 sm:mt-0">
            {["Privacy Policy", "Terms & Conditions"].map((item, index) => (
              <Footer.Link
                key={index}
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition duration-200"
              >
                {item}
              </Footer.Link>
            ))}
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default Footercom;
