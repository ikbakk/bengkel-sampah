import { Button, Input } from "@material-tailwind/react";
import React from "react";
import InputLabel from "@/components/atoms/InputLabel";

export const EditProfile = () => {
  return (
    <div className="px-10 text-[#CACED8]">
      <h1 className="my-3 text-2xl font-semibold ">Edit Profile</h1>
      <p className="font-semibold">Personal</p>
      <form action="#">
        <InputLabel
          label="Name"
          placeholder="Enter your name"
          required
          type="text"
          name="name"
          id="name"
        />
        <p className="font-semibold">Contact</p>
        <InputLabel
          label="Email"
          required
          type="email"
          name="email"
          id="email"
          placeholder="Enter Value"
        />
        <InputLabel
          label="Phone Number"
          required
          type="email"
          name="email"
          id="email"
          placeholder="+6281234567890"
        />
        <Button type="submit" color="green" fullWidth>
          Save
        </Button>
      </form>
    </div>
  );
};
