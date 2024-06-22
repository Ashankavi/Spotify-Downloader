import React from 'react';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram, FaGithub, FaBehance, FaDribbble } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative p-6 bg-black text-white ">
      <div className="container mx-auto text-center">
        <div className="flex flex-row justify-center gap-2 text-xl text-white ">
            
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#80d7ff]">
            <FaTwitter />
          </a>
          <a href="https://web.facebook.com/profile.php?id=100012056560141" target="_blank" rel="noopener noreferrer" className="hover:text-[#80d7ff]">
            <FaFacebook />
          </a>
          <a href="https://www.linkedin.com/in/ashan-kavindu/" target="_blank" rel="noopener noreferrer" className="hover:text-[#80d7ff]">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/ashxn___/" target="_blank" rel="noopener noreferrer" className="hover:text-[#80d7ff]">
            <FaInstagram />
          </a>
          <a href="https://github.com/Ashankavi" target="_blank" rel="noopener noreferrer" className="hover:text-[#80d7ff]">
            <FaGithub />
          </a>
          <a href="https://www.behance.net/ashankavindu2?log_shim_removal=1" target="_blank" rel="noopener noreferrer" className="hover:text-[#80d7ff]">
            <FaBehance />
          </a>
          <a href="https://dribbble.com/shanuk05" target="_blank" rel="noopener noreferrer" className="hover:text-[#80d7ff]">
            <FaDribbble />
          </a>
        </div>
        <p className="mb-3 mt-5 text-sm text-white">
        © 2024 <span><a href="https://ashankavi-portfolio.000webhostapp.com/" className=' text-[#49e3f5] font-semibold'>AshanKavi</a>.</span> All rights reserved.
      </p>
      </div>
    </footer>
  );
}

export default Footer;