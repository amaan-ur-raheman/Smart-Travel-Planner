import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router";

const Hero = () => {
    return (
        <div className="flex flex-col items-center mx-56 gap-9 justify-center">
            <h1 className="font-extrabold text-[50px] text-center mt-16">
                <span className="text-[#f56551]">
                    Discover Your Next Adventure with AI:{" "}
                </span>{" "}
                <br /> Personalized Itenaries at Your Fingertips
            </h1>

            <p className="text-xl text-gray-500 text-center">
                Your personal trip planner and travel curator , creating custom
                itenaries tailored to your interests and budget
            </p>

            <Link to={"/create-trip"}>
                <Button className="">Get Started, It's Free</Button>
            </Link>

            <img src="/mockup.webp" className="rounded-xl w-full h-1/2" alt="" />
        </div>
    );
};

export default Hero;
