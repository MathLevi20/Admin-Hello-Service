"use client";

import { ChangeEvent, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Image from "next/image";
import { CustomClass, Loading } from "@/components/LoadingSmall";

export const Login = () => {
  const navigate = useRouter();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);

      await signIn({ email: username, password });
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-fuchsia-300 to-sky-500">
      <div
        className="absolute inset-0 flex items-center  justify-center
      bg-gradient-to-tr from-sky-300 to-sky-500 "
      >
        <div className="grid grid-rows-1 bg-white shadow-lg p-10  rounded-md ">
          <Image
            src="/logo.svg"
            className={`cursor-pointer  mx-auto p-3"`}
            width={50}
            alt="icon"
            height={50}
            priority={false}
          />
          <h4 className="text-center p-3 text-slate-800 font-semibold  font-mono text-xl ">
            Login
          </h4>
          <input
            className="p-2 border-black-900 bg-white border-cyan-600 hover:border-cyan-900 border"
            type="text"
            value={username}
            onChange={handleEmailInput}
            placeholder="Digite seu usuario"
          />
          <input
            className="p-2 mt-2 
              border-cyan-600 bg-white hover:border-cyan-900 focus:bg-white border"
            type="password"
            value={password}
            onChange={handlePasswordInput}
            placeholder="Digite sua senha"
          />
          <button className="" onClick={handleSignIn}>
            {loading ? <Loading /> : <CustomClass />}
          </button>
        </div>
      </div>
    </div>
  );
};
