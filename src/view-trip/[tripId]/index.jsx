import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import Information from "../components/Information";
import Hotels from "../components/Hotels";
import DailyPlan from "../components/DailyPlan";
import Footer from "../components/Footer";

const ViewTrip = () => {
    const tripId = useParams().tripId;
    const [trip, setTrip] = useState([]);

    const getTripData = async () => {
        const docRef = doc(db, "AITrips", tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setTrip(docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            toast("No such Trip Fount!", { type: "error" });
        }
    };

    useEffect(() => {
        getTripData();
    }, [tripId]);

    return (
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
            {/* Information Section */}
            <Information trip={trip} />

            {/* Recommended Hotels */}
            <Hotels trip={trip} />

            {/* Daliy Plan */}
            <DailyPlan trip={trip} />

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ViewTrip;
