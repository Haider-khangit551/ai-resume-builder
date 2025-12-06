import React from "react";

const Footer = () => {
    return (
        <>
            <footer className="w-full bg-[#111111] mt-28 text-white">
                <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
                    <div className="flex items-center space-x-3 mb-6">
                        <p className="text-4xl font-bold text-green-600">Elevate<span className="text-white">Me.</span></p>
                    </div>
                    <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
                        Build your dream resume effortlessly with our AI-powered tools. Stand out, highlight your skills, and land your next opportunity with a professional, tailor-made resume in minutes.
                    </p>
                </div>
                <div className="border-t">
                    <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                        <a href="https://prebuiltui.com">ElevateMe</a> ©2025. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
