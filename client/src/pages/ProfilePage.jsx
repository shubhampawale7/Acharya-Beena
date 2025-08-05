import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Meta from "../components/common/Meta";

const ProfilePage = () => {
  const { userInfo, login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
      }
      login(data);
      toast.success("Profile updated successfully!");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Meta title="My Profile | Acharya Beena" />
      <div className="bg-gray-50 dark:bg-transparent py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 lg:px-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-3xl">
            User Profile
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Update your profile information and password here.
          </p>
          <div className="mt-8 bg-white dark:bg-deep-space/50 dark:backdrop-blur-sm shadow-md rounded-lg p-8 ring-1 ring-black/5 dark:ring-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-starlight"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-slate-800/50 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-nebula-purple"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-starlight"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-slate-800/50 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-nebula-purple"
                  />
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-white/20 pt-6">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Leave passwords blank to keep the current one.
                </p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-starlight"
                >
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-slate-800/50 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-nebula-purple"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-starlight"
                >
                  Confirm New Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-slate-800/50 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-nebula-purple"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-md bg-indigo-600 dark:bg-nebula-purple px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-purple-600 disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
