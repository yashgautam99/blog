import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";
import { MdOutlineEmojiEmotions } from "react-icons/md";

function Footercom() {
  return (
    <Footer
      container
      className="border-t-4 border-teal-500 bg-gradient-to-br from-gray-100 via-gray-200 to-white text-gray-800"
    >
      <div className="w-full max-w-7xl mx-auto py-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold">
              <span className="px-3 py-2 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-lg text-white">
                Inkflow
              </span>
            </Link>
            <p className="text-sm text-gray-500">
              Unleashing creativity, one thought at a time. Let your ideas flow
              with Inkflow.
            </p>
          </div>

          {/* Footer Links */}
          <div className="space-y-4">
            <Footer.Title
              title="Company"
              className="text-lg font-semibold text-gray-700"
            />
            <Footer.LinkGroup col className="space-y-2">
              <Footer.Link
                href="/about"
                className="text-gray-600 hover:text-gray-800"
              >
                About Us
              </Footer.Link>
              <Footer.Link
                href="#"
                className="text-gray-600 hover:text-gray-800"
              >
                Careers
              </Footer.Link>
              <Footer.Link
                href="#"
                className="text-gray-600 hover:text-gray-800"
              >
                Blog
              </Footer.Link>
              <Footer.Link
                href="#"
                className="text-gray-600 hover:text-gray-800"
              >
                Contact
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Follow Us */}
          <div className="space-y-4">
            <Footer.Title
              title="Follow Us"
              className="text-lg font-semibold text-gray-700"
            />
            <div className="flex justify-center sm:justify-start gap-5 mt-3">
              <Footer.Icon
                href="#"
                icon={BsFacebook}
                className="hover:text-teal-600"
              />
              <Footer.Icon
                href="https://www.instagram.com/thatsyash01/"
                icon={BsInstagram}
                className="hover:text-pink-500"
              />
              <Footer.Icon
                href="https://x.com/yashgautam2502"
                icon={BsTwitter}
                className="hover:text-blue-400"
              />
              <Footer.Icon
                href="https://github.com/yashgautam99"
                icon={BsGithub}
                className="hover:text-gray-700"
              />
              <Footer.Icon
                href="https://yashportfolio-react.netlify.app/"
                icon={MdOutlineEmojiEmotions}
                className="hover:text-yellow-500"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <Footer.Divider className="my-6 border-t-2 border-gray-300" />

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <Footer.Copyright
            href="#"
            by="Inkflow Inc"
            year={new Date().getFullYear()}
          />
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Footer.Link href="#" className="text-gray-600 hover:text-gray-800">
              Privacy Policy
            </Footer.Link>
            <Footer.Link href="#" className="text-gray-600 hover:text-gray-800">
              Terms & Conditions
            </Footer.Link>
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default Footercom;
