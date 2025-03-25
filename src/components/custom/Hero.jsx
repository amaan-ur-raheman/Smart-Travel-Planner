import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router";

const Hero = () => {
    return (
        <div className="flex flex-col items-center px-6 md:px-16 lg:px-32 xl:px-56 gap-9 justify-center mt-16">
            {/* Hero Heading */}
            <h1 className="font-extrabold text-[32px] md:text-[40px] lg:text-[50px] text-center leading-tight">
                <span className="text-[#f56551]">
                    Discover Your Next Adventure with AI:
                </span>
                <br />
                Personalized Itineraries at Your Fingertips
            </h1>

            {/* Hero Description */}
            <p className="text-lg md:text-xl text-gray-500 text-center max-w-3xl">
                Your personal trip planner and travel curator, creating custom
                itineraries tailored to your interests and budget.
            </p>

            {/* Call-to-Action Button */}
            <Link to={"/create-trip"}>
                <Button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-lg">
                    Get Started, It's Free
                </Button>
            </Link>

            {/* Hero Image */}
            <img
                src="/mockup.webp"
                className="rounded-xl w-full max-w-4xl h-auto shadow-md"
                alt="App Mockup"
            />
        </div>
    );
};

export default Hero;
