"use client";

import { useEffect, useState } from "react";

const SessionPage = () => {
  const [user, setUser] = useState("");
  const INITIAL_STATE = {
    coords: {
      latitude: 0,
      longitude: 0,
    },
  };
  const [position, setPosition] = useState(INITIAL_STATE);
  const fetchItemAndStoreInSession = async () => {
    try {
      window.sessionStorage.setItem("user", JSON.stringify({ user: "Ben" }));
    } catch (error) {}
  };

  function getLocation() {
    window.navigator.geolocation.getCurrentPosition(
      (data) => setPosition(data),
      console.error,
    );
  }

  useEffect(() => {
    fetchItemAndStoreInSession();
    getLocation();
  }, []);

  console.log(position);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(window?.sessionStorage?.getItem("user")).user);
    }
  }, []);
  return (
    <div>
      Session Page {user} is at lat: {position.coords.latitude} - long{" "}
      {position?.coords.longitude}
    </div>
  );
};

export default SessionPage;
