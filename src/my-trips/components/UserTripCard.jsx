import React from "react";

const UserTripCard = ({ trip, imageUrl }) => {
    return (
        <div className="shadow-md border p-3 rounded-xl hover:scale-105 transition-all cursor-pointer">
            <img
                src={imageUrl}
                alt={trip?.userSelection?.location?.label || "Trip"}
                className="w-full h-40 object-cover rounded-xl"
            />
            <div className="mt-3">
                <h2 className="font-bold text-lg">
                    {trip?.userSelection?.location?.label}
                </h2>
                <p className="text-sm text-gray-500">
                    📅 {trip?.userSelection?.noOFDays} Days
                </p>
                <p className="text-sm text-gray-500">
                    💰 {trip?.userSelection?.budget} Budget
                </p>
            </div>
        </div>
    );
};

export default UserTripCard;
