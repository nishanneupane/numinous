import React from "react";

function Footer() {
  return (
    <div className="border-t border-gray-200 bg-white dark:bg-black dark:border-slate-600 px-5 py-4 text-right">
      <span className="text-gray-600">Contact: </span>
      <span className="font-bold bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text">
        <a
          href="mailto:com.nishanneupane@gmail.com"
          className="bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text hover:underline"
        >
          com.nishanneupane@gmail.com
        </a>
      </span>
    </div>
  );
}

export default Footer;
