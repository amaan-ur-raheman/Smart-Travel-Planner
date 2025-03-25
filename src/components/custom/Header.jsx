import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import { Link, useNavigate } from "react-router";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const Header = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.picture) {
            console.log("User picture URL:", user.picture);
        }
    }, [user?.picture]);

    const getCachedImage = (url) => {
        const cachedImage = localStorage.getItem("cachedImage");
        if (cachedImage) {
            return cachedImage;
        }
        localStorage.setItem("cachedImage", url);
        return url;
    };

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
                window.location.reload();
            });
    };

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => getUserProfile(codeResponse),
        onError: (error) => console.log(error),
    });

    return (
        <div className="p-3 shadow-sm flex justify-between items-center px-5">
            <Link to={"/"}>
            <img src="/logo.svg" />
            </Link>
            <div>
                {user ? (
                    <div className="flex items-center gap-3">
                        <a href="/create-trip">
                            <Button variant="outline" className="rounded-full">
                                + Create Trips
                            </Button>
                        </a>
                        <a href="/my-trips">
                            <Button variant="outline" className="rounded-full">
                                My Trips
                            </Button>
                        </a>

                        <Popover>
                            <PopoverTrigger>
                                <img
                                    src={getCachedImage(user?.picture)}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/default-avatar.jpeg";
                                    }}
                                    className="h-[35px] w-[35px] rounded-full"
                                />
                            </PopoverTrigger>
                            <PopoverContent>
                                <h2
                                    className="text-center cursor-pointer bg-black text-white px-3 rounded-xl w-[50%]"
                                    onClick={() => {
                                        googleLogout();
                                        localStorage.clear();
                                        navigate("/");
                                    }}
                                >
                                    Logout
                                </h2>
                            </PopoverContent>
                        </Popover>
                    </div>
                ) : (
                    <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
                )}
            </div>

            <Dialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                className="cursor-pointer"
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <img src="/logo.svg" />
                            <h3 className="font-bold text-start text-lg mt-7">
                                Sign In With Google
                            </h3>
                            <p className="text-start">
                                Sign to the app with Google authentication
                                securely
                            </p>

                            <Button
                                onClick={login}
                                className="w-full mt-5 flex gap-4 items-center"
                            >
                                <FcGoogle className="h-7 w-7" />
                                Sign In With Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Header;
