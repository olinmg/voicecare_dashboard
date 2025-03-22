import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 bg-black">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="mb-6 text-white text-2xl ">Q0</div>
        
        <ul className="flex justify-center space-x-8 mb-4">
          <li>
            <a href="#" className="text-white hover:text-gray-400">Privacy</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-400">Blog</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-400">Join Us</a>
          </li>
        </ul>
        
        <div className="pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} q0, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;