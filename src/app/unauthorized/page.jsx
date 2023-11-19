"use client";

import React from "react";
import { Button } from "@material-tailwind/react";
import { signOut } from "next-auth/react";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h3>You are unauthorized</h3>
      <Button
        onClick={signOut({
          callbackUrl: "/login",
        })}
      >
        Go Back
      </Button>
    </div>
  );
};

export default UnauthorizedPage;
