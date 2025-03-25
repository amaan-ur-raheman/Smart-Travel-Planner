import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    AI_PROMPT,
    SelectBudgetOptions,
    SelectTravelList,
} from "@/contants/options";
import { chatSession } from "@/service/AIModel";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router";

const CreateTrip = () => {
    const [place, setPlace] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => getUserProfile(tokenResponse),
        onError: (error) => console.log(error),
    });

    const getUserProfile = (tokenInfo) => {
        axios
            .get(
                `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenInfo?.access_token}`,
                        Accept: "Application/json",
                    },
                }
            )
            .then((res) => {
                console.log(res);
                localStorage.setItem("user", JSON.stringify(res.data));
                setOpenDialog(false);
                onGenerateTrip();
            });
    };

    const saveAITrip = async (tripData) => {
        setLoading(true);

        const docId = Date.now().toString();
        const user = JSON.parse(localStorage.getItem("user"));

        // Add a new document in collection "cities"
        await setDoc(doc(db, "AITrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(tripData),
            userEmail: user?.email,
            id: docId,
        });

        setLoading(false);
		navigate(`/view-trip/${docId}`);
    };

    const onGenerateTrip = async () => {
        const user = localStorage.getItem("user");

        if (!user) {
            setOpenDialog(true);
            return;
        }

        if (
            !formData.location ||
            !formData.noOFDays ||
            !formData.budget ||
            !formData.traveler
        ) {
            toast("Please fill all the details");
            return;
        }

        setLoading(true);

        const FINAL_PROMPT = AI_PROMPT.replace(
            "{location}",
            formData?.location?.label
        )
            .replace("{noOfDays}", formData?.noOFDays)
            .replace("{traveler}", formData?.traveler)
            .replace("{budget}", formData?.budget)
			.replace("{noOfDays}", formData?.noOFDays);

        console.log(FINAL_PROMPT);

        const result = await chatSession.sendMessage(FINAL_PROMPT);

        const responseText = await result?.response?.text();
        console.log("Data: ", responseText);

        setLoading(false);
        saveAITrip(responseText);
    };

    return (
        <div className="flex items-center justify-center mb-10">
            <div className="sm:px-10 md:px-32 lg:px-54 xl:px-10 px-5 mt-10">
                <h2 className="font-bold text-3xl">
                    Tell us your travel preferences 🏕️🌴
                </h2>
                <p className="mt-3 text-gray-500 text-xl">
                    Just provide some basic information and our trip planner
                    will generate a customized itinerary based on your
                    preferences.
                </p>

                <div className="mt-20 flex flex-col gap-10">
                    {/* Destination Selection */}
                    <div>
                        <h2 className="text-xl my-3 font-medium">
                            What is your destination of choice?
                        </h2>
                        <GooglePlacesAutocomplete
                            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                            selectProps={{
                                placeholder: "Search for a destination...",
                                value: place,
                                onChange: (place) => {
                                    setPlace(place);
                                    handleInputChange("location", place);
                                },
                            }}
                            loaderOptions={{
                                async: true,
                                defer: true,
                            }}
                        />
                    </div>

                    {/* Number of Days */}
                    <div>
                        <h2 className="text-xl my-3 font-medium">
                            How many days are you planning your trip?
                        </h2>
                        <Input
                            placeholder="Ex. 3"
                            type="number"
                            onChange={(e) =>
                                handleInputChange("noOFDays", e.target.value)
                            }
                        />
                    </div>

                    {/* Budget Selection */}
                    <div>
                        <h2 className="text-xl my-3 font-medium">
                            What's your budget?
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
                            {SelectBudgetOptions.map((item, index) => (
                                <div
                                    key={index}
                                    className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                                        formData?.budget === item.title &&
                                        "shadow-lg border-2 border-black"
                                    }`}
                                    onClick={() =>
                                        handleInputChange("budget", item.title)
                                    }
                                >
                                    <h2 className="text-4xl">{item.icon}</h2>
                                    <h2 className="font-bold text-lg">
                                        {item.title}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Travel Companion Selection */}
                    <div>
                        <h2 className="text-xl my-3 font-medium">
                            Who do you plan on travelling with on your next
                            adventure?
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
                            {SelectTravelList.map((item, index) => (
                                <div
                                    key={index}
                                    className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                                        formData?.traveler === item.people &&
                                        "shadow-lg border-2 border-black"
                                    }`}
                                    onClick={() =>
                                        handleInputChange(
                                            "traveler",
                                            item.people
                                        )
                                    }
                                >
                                    <h2 className="text-4xl">{item.icon}</h2>
                                    <h2 className="font-bold text-lg">
                                        {item.title}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Generate Trip Button */}
                    <Button
                        disabled={loading}
                        className="text-xl p-5"
                        onClick={onGenerateTrip}
                    >
                        {loading ? (
                            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
                        ) : (
                            "Generate Trip"
                        )}
                    </Button>

                    {/* Dialog Confirmation */}
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogDescription>
                                    <img src="/logo.svg" />
                                    <h2 className="font-bold text-lg mt-7">
                                        Sign In with Google
                                    </h2>
                                    <p>
                                        Sign in to the app with Google
                                        authentication securely
                                    </p>

                                    <Button
                                        className="w-full mt-7 flex items-center"
                                        onClick={login}
                                    >
                                        <FcGoogle className="w-7 h-7" />
                                        Sign In with Google
                                    </Button>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default CreateTrip;
