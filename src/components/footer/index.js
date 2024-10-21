"use client"


function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-[#020817] border-none dark:text-white text-black py-10 w-full">
            <div className=" px-4 ">
                <div className="flex flex-wrap justify-between">
                    {/* Column 1 */}
                    <div className="w-full sm:w-1/3 mb-6">
                        <h3 className="text-lg font-semibold mb-2">Jobmarche</h3>
                        <p className="text-gray-400">
                            Connecting people with opportunities.
                        </p>
                    </div>
                    
                    {/* Column 2 */}
                    <div className="w-full sm:w-1/3 mb-6">
                        <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/about" className="text-gray-400 hover:text-tomato">About Us</a>
                            </li>
                            <li>
                                <a href="/jobs" className="text-gray-400 hover:text-tomato">Find Jobs</a>
                            </li>
                            <li>
                                <a href="/contact" className="text-gray-400 hover:text-tomato">Contact</a>
                            </li>
                            <li>
                                <a href="/terms" className="text-gray-400 hover:text-tomato">Terms of Service</a>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Column 3 */}
                    <div className="w-full sm:w-1/3 mb-6">
                        <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
                        <p className="text-gray-400">Email: support@jobmarche.com</p>
                        <p className="text-gray-400">Phone: +234 7036594624</p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                    <p className="text-gray-400 text-sm">
                        © {currentYear} Jobmarche. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;