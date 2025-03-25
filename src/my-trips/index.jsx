import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import UserTripCard from "./components/UserTripCard";
import { db } from "@/service/firebaseConfig";
import { getPexelsImages } from "@/service/globalAPi";

const MyTrips = () => {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);
    const [tripImages, setTripImages] = useState({}); // Store images for each trip

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            navigate("/");
            return;
        }

        setUserTrips([]);

        const q = query(
            collection(db, "AITrips"),
            where("userEmail", "==", user?.email)
        );

        const querySnapshot = await getDocs(q);

        const trips = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            trips.push({ id: doc.id, ...doc.data() });
        });

        setUserTrips(trips);
        fetchTripImages(trips); // Fetch images for trips
    };

    const fetchTripImages = async (trips) => {
        const images = {};
        for (const trip of trips) {
            try {
                const location = trip?.userSelection?.location?.label || "travel";
                const response = await getPexelsImages(location);
                const photos = response.data.photos;
                if (photos.length > 0) {
                    images[trip.id] = photos[0].src.large; // Use the first image
                } else {
                    images[trip.id] = "/placeholder.webp"; // Fallback image
                }
            } catch (error) {
                console.error(`Error fetching image for trip ${trip.id}:`, error);
                images[trip.id] = "/placeholder.webp"; // Fallback image
            }
        }
        setTripImages(images);
    };

    useEffect(() => {
        GetUserTrips();
    }, []);

    return (
        <div className="flex items-center justify-center mx-auto">
            <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
                <h2 className="font-bold text-2xl">My Trips</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 mt-5 gap-6">
                    {userTrips.map((trip, index) => (
                        <Link to={`/view-trip/${trip?.id}`} key={index}>
                            <UserTripCard
                                trip={trip}
                                imageUrl={tripImages[trip.id] || "/placeholder.webp"} // Pass image URL to UserTripCard
                                key={index}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyTrips;
