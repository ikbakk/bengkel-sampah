"use client";
import {
  Button,
  Card,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo from "public/logo-bengkel-sampah-warna.png";
import Link from "next/link";

const FormLogin = () => {
  const session = useSession();
  const router = useRouter();

  const [data, setData] = useState({
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, []);

  const loginUser = async (e) => {
    e.preventDefault();
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        alert(callback.error);
      }

      if (callback?.ok && !callback?.error) {
        alert("Logged in successfully!");
        router.push("/dashboard");
      }
    });
  };

  const [isRevealed, setIsRevealed] = useState(false);

  const revealPassword = (e) => {
    e.preventDefault();
    setIsRevealed(!isRevealed);
  };
  return (
    <Card
      color="transparent"
      shadow={false}
      className="flex min-h-screen w-full flex-col items-center justify-center px-4 lg:w-1/2"
    >
      <Image
        src={logo}
        alt="logo bengkel sampah"
        width={160}
        height={80}
        placeholder="empty"
      />
      <Typography variant="h4" color="blue-gray">
        Sign In
      </Typography>
      <Typography
        color="gray"
        className="mt-1 w-80 px-4 text-center font-normal sm:w-96"
      >
        Hello! Please Login First to Use Our Service
      </Typography>
      <form
        className="mb-2 mt-8 w-80 max-w-screen-lg px-4 sm:w-96"
        onSubmit={loginUser}
      >
        <div className="mb-1 flex flex-col gap-6">
          <label className="-mb-3 font-bold text-blue-gray-800" htmlFor="phone">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            size="lg"
            type="number"
            placeholder="08123456789"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none hidden",
            }}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            required
            crossOrigin={undefined}
          />
          <label
            className="-mb-3 font-bold text-blue-gray-800"
            htmlFor="password"
          >
            Password
          </label>
          <Input
            id="password"
            name="password"
            type={isRevealed === false ? "password" : "text"}
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none hidden",
            }}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            icon={<RevealIcon onClick={revealPassword} />}
            required
            crossOrigin={undefined}
          />
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              Remember me
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
          crossOrigin={undefined}
        />
        <Button className="mt-6 bg-bs-secondary" type="submit" fullWidth>
          Sign In
        </Button>
        <Typography
          color="gray"
          className="mt-4 text-center text-xs font-normal"
        >
          I dont have an account,
          <br />
          <Link
            href="/register"
            className="ml-1 font-medium text-gray-900 hover:underline"
          >
            Please Take Me to Register Page
          </Link>
        </Typography>
      </form>
    </Card>
  );
};

export default FormLogin;

const RevealIcon = ({ onClick }) => {
  return (
    <button role="show-password" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="16"
        height="16"
      >
        <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
      </svg>
    </button>
  );
};
