import { Button } from "@/components/ui/button";
import { getPlaceDetails } from "@/service/globalAPi";
import React, { useEffect } from "react";
import { FaShareAlt } from "react-icons/fa";

const Information = ({ trip }) => {
    const getPlacePhoto = async () => {
        const data = {
           textQuery: trip?.userSelection?.location?.label, 
        }

        const result =await getPlaceDetails(data).then((res) => {
            console.log(res.data.places[0].photos[3].name);
        })
    }

    useEffect(() => {
        trip && getPlacePhoto();
    }, [trip])

    return (
        <div>
            <img
                src="/placeholder.webp"
                alt=""
                className="h-[340px] w-full border object-cover rounded-xl"
            />

            <div className="flex justify-between items-center">
                <div className="my-5 flex flex-col gap-2">
                    <h1 className="text-2xl font-bold mt-4">
                        {trip?.userSelection?.location?.label}
                    </h1>
                    <div className="flex gap-5">
                        <p className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 max-sm:text-xs">
                            📅 {trip?.userSelection?.noOFDays} Day
                        </p>
                        <p className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 max-sm:text-xs">
                            💰 {trip?.userSelection?.budget} Budget
                        </p>
                        <p className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 max-sm:text-xs">
                            🥂 No of Travelers: {trip?.userSelection?.traveler}
                        </p>
                    </div>
                </div>

                <Button>
                    <FaShareAlt />
                </Button>
            </div>
        </div>
    );
};

export default Information;
