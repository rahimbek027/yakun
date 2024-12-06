"use client";

import React, { FC, useState, ChangeEvent } from "react";
import Image from "next/image";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "./Button";
import { Input } from "antd";
import axios from "axios";
import { URL } from "@/service/request";
import toast, { Toaster } from "react-hot-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isModalContent, setIsModalContent] = useState<string>("Login");
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerFirstName, setRegisterFirstName] = useState<string>("");
  const [registerLastName, setRegisterLastName] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [registerConfirmPassword, setRegisterConfirmPassword] =
    useState<string>("");
  const [forgotLoginEmail, setForgotLoginEmail] = useState<string>("");
  const [registerOTPCode, setRegisterOTPCode] = useState<string>("");
  const [forgotOTPCode, setForgotOTPCode] = useState<string>("");
  const [resetPassword, setResetPassword] = useState<string>("");
  const [loginPasswordVisible, setLoginPasswordVisible] =
    useState<boolean>(false);
  const [registerPasswordVisible, setRegisterPasswordVisible] =
    useState<boolean>(false);
  const [registerConfirmPasswordVisible, setRegisterConfirmPasswordVisible] =
    useState<boolean>(false);
  const [resetVerifyPassword, setresetVerifyPassword] =
    useState<boolean>(false);

  if (!isOpen) return null;

  const handleLogin = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const data = {
      password: loginPassword,
      usernameoremail: loginEmail,
    };
    console.log("Login Data: ", data);
    try {
      const res = await axios.post(`${URL}/login`, data);
      window.localStorage.setItem("access_token", res.data.access_token);
      window.localStorage.setItem("refresh_token", res.data.refresh_token);
      toast.success("Hush kelibsiz " + res.data.first_name);
      onClose();
      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
      console.log(error);
    }
  };
  const token = localStorage.getItem('access_token')

  const handleRegister = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = {
      email: registerEmail,
      firstName: registerFirstName,
      lastName: registerLastName,
      password: registerPassword,
    };
    console.log("Register Data: ", data);
    try {
      await axios.post(`${URL}/register`, data, {

      }).then((res) => {
        setIsModalContent("registerVerify");
        setLoginEmail(registerEmail);
      });
    } catch (error) {
      toast.error("Registration failed. Please try again.");

      // console.log(error);
    }
  };

  const registerVerifyBtnClick = () => {
    const data = {
      email: registerEmail,
      code: registerOTPCode,
    };
    try {
      axios
        .post(
          `${URL}/users/verify`,
          {},
          {
            params: data,

          }
        )
        .then((res) => {
          setIsModalContent("Login");
          setRegisterEmail("");
          setRegisterFirstName("");
          setRegisterLastName("");
          setRegisterPassword("");
        });
    } catch (err) {
      toast.error("Verification failed. Please try again.");
      console.log(err);
    }
  };

  const forgotBtnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      axios.post(`${URL}/forgot/${forgotLoginEmail}`, {}).then((response) => {
        setIsModalContent("forgotVerify");
      });
    } catch (error) {
      console.error("Error: ");
      toast.error("Failed to send the reset code. Please try again.");
    }
  };

  const forgotOTPBtnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    axios
      .post(
        `${URL}/verify`,
        {},
        {
          params: {
            email: forgotLoginEmail,
            otp: forgotOTPCode,
          },
          headers: {
            Authorization: token
          }
        }
      )
      .then((response) => {
        setLoginEmail(forgotLoginEmail);
        setIsModalContent("createNewLogin");
      });
  };

  const resetBtnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const data = {
      email: forgotLoginEmail,
      new_password: resetPassword,
      otp: forgotOTPCode,
    };
    axios.put(`${URL}/reset-password`, data, {
      headers: {
        Authorization: token
      }
    }).then((response) => {
      setIsModalContent("Login");
      // toast.error("Password reset failed. Please try again.");
    });
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded shadow-lg relative w-full max-w-[600px]">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <CloseOutlined />
          </button>
          <div className="text-center mb-4">
            <ul className="flex items-center space-x-3 justify-center text-[22px] font-semibold">
              <li
                onClick={() => setIsModalContent("Login")}
                className={`${isModalContent == "Login"
                  ? "text-[#46A358] font-medium text-[20px] leading-[16px] cursor-pointer"
                  : "cursor-pointer"
                  }`}
              >
                Login
              </li>
              <li className="w-[1px] h-[16px] bg-[#3D3D3D]"></li>
              <li
                onClick={() => setIsModalContent("Register")}
                className={`${isModalContent == "Register"
                  ? "text-[#46A358] font-medium text-[20px] leading-[16px] cursor-pointer"
                  : "cursor-pointer"
                  }`}
              >
                Register
              </li>
            </ul>
          </div>
          {isModalContent == "Login" && (
            <form className="md:px-[100px] md:pt-[20px] md:pb-[68px]">
              <div className="mb-4">
                <label
                  className="block font-normal text-[13px] leading-[16px] text-[#3D3D3D] pb-[14px]"
                  htmlFor="email"
                >
                  Enter your username and password to login.
                </label>
                <Input
                  required
                  value={loginEmail}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setLoginEmail(e.target.value)
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="almamun_uxui@outlook.com"
                />
              </div>
              <div className="flex items-center mb-6 relative">
                <Input
                  value={loginPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setLoginPassword(e.target.value)
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type={loginPasswordVisible ? "text" : "password"}
                  placeholder="***********"
                />
                <span
                  className="absolute inset-y-0 top-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setLoginPasswordVisible(!loginPasswordVisible)}
                >
                  <Image
                    src={
                      loginPasswordVisible
                        ? "/eye-icon.svg"
                        : "/eye-off-icon.svg"
                    }
                    alt="Toggle password visibility"
                    width={20}
                    height={20}
                  />
                </span>
              </div>
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setIsModalContent("forgotEmail")}
                  className="font-normal text-[14px] leading-[16px] text-[#46A358]"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  title="Login"
                  buttonWidth={380}
                  onClick={handleLogin}
                  bgBtn={false}
                ></Button>
              </div>
            </form>
          )}
          {isModalContent == "Register" && (
            <form className="md:px-[100px] md:py-[20px]">
              <div className="mb-[16px]">
                <label
                  className="block font-normal text-[13px] leading-[16px] text-[#3D3D3D] pb-[14px]"
                  htmlFor="first-name"
                >
                  Enter your email and password to register.
                </label>
                <Input
                  required
                  value={registerFirstName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRegisterFirstName(e.target.value)
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-[#3D3D3D] font-normal leading-tight focus:outline-none focus:shadow-outline"
                  id="first-name"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <Input
                required
                value={registerEmail}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setRegisterEmail(e.target.value)
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#3D3D3D] font-normal leading-tight focus:outline-none focus:shadow-outline mb-[16px]"
                id="email"
                type="email"
                placeholder="Email"
              />
              <div className="relative mb-[16px]">
                <Input
                  required
                  value={registerPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRegisterPassword(e.target.value)
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-[#3D3D3D] font-normal leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  placeholder="Password"
                  type={registerPasswordVisible ? "text" : "password"}
                />
                <span
                  className="absolute inset-y-0 top-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() =>
                    setRegisterPasswordVisible(!registerPasswordVisible)
                  }
                >
                  <Image
                    src={
                      registerPasswordVisible
                        ? "/eye-icon.svg"
                        : "/eye-off-icon.svg"
                    }
                    alt="Toggle password visibility"
                    width={20}
                    height={20}
                  />
                </span>
              </div>
              <div className="relative mb-[41px]">
                <Input
                  required
                  value={registerConfirmPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRegisterConfirmPassword(e.target.value)
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-[#3D3D3D] font-normal leading-tight focus:outline-none focus:shadow-outline"
                  id="confirm-password"
                  type={registerConfirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                />
                <span
                  className="absolute inset-y-0 top-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() =>
                    setRegisterConfirmPasswordVisible(
                      !registerConfirmPasswordVisible
                    )
                  }
                >
                  <Image
                    src={
                      registerConfirmPasswordVisible
                        ? "/eye-icon.svg"
                        : "/eye-off-icon.svg"
                    }
                    alt="Toggle password visibility"
                    width={20}
                    height={20}
                  />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  title="Register"
                  buttonWidth={380}
                  onClick={handleRegister}
                  bgBtn={false}
                ></Button>
              </div>
            </form>
          )}
          <div className="bg-[#46A358] w-full h-[10px] absolute bottom-0 left-0"></div>
          {isModalContent == "forgotEmail" && (
            <div className="flex flex-col items-center space-x-5">
              <Input
                type="email"
                className="mb-[16px]"
                value={forgotLoginEmail}
                onChange={(e) => setForgotLoginEmail(e.target.value)}
                placeholder="Enter your Email"
                size="large"
              />
              <Button
                title="Send Code"
                buttonWidth={380}
                onClick={forgotBtnClick}
                bgBtn={false}
              ></Button>
            </div>
          )}
          {isModalContent == "forgotVerify" && (
            <div className="flex flex-col items-center">
              <Input.OTP
                value={forgotOTPCode}
                onChange={(e) => setForgotOTPCode(e)}
                length={6}
                size="large"
              />
              <div className="mt-[16px]">
                <Button
                  title="Enter Code"
                  buttonWidth={360}
                  onClick={forgotOTPBtnClick}
                  bgBtn={false}
                ></Button>
              </div>
            </div>
          )}
          {isModalContent == "createNewLogin" && (
            <div className="flex flex-col items-center">
              <div className="relative">
                <Input
                  className="w-[360px]"
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                  size="large"
                  placeholder="Enter your new password"
                  type={resetVerifyPassword ? "text" : "password"}
                />
                <span
                  className="absolute inset-y-0 top-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setresetVerifyPassword(!resetVerifyPassword)}
                >
                  <Image
                    src={
                      resetVerifyPassword
                        ? "/eye-icon.svg"
                        : "/eye-off-icon.svg"
                    }
                    alt="Toggle password visibility"
                    width={20}
                    height={20}
                  />
                </span>
              </div>
              <div className="mt-[16px]">
                <Button
                  title="Enter new password"
                  buttonWidth={360}
                  onClick={resetBtnClick}
                  bgBtn={false}
                ></Button>
              </div>
            </div>
          )}
          {isModalContent == "registerVerify" && (
            <div className="flex flex-col items-center">
              <Input.OTP
                value={registerOTPCode}
                onChange={(e) => setRegisterOTPCode(e)}
                length={6}
                size="large"
              />
              <div className="mt-[16px]">
                <Button
                  title="Enter Code"
                  buttonWidth={360}
                  onClick={registerVerifyBtnClick}
                  bgBtn={false}
                ></Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginModal;
