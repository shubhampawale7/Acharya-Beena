import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Meta from "../../components/common/Meta";
import Spinner from "../../components/common/Spinner";
import { motion } from "framer-motion";
import {
  UserIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

// NOTE: This is a visual redesign only.
// The core React logic and functionality remain unchanged.

const AdminUserEditPage = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Could not fetch user data.");
        }
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
      } catch (error) {
        toast.error(error.message);
        navigate("/admin/users");
      } finally {
        setIsLoading(false);
      }
    };

    if (userInfo && userInfo.role === "admin") {
      fetchUser();
    }
  }, [userId, userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ name, email, role }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update user.");
      }

      toast.success("User updated successfully!");
      navigate("/admin/users");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Meta title={`Edit User | ${name}`} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/admin/users"
          className="inline-flex items-center gap-2 text-sm font-semibold text-nebula-purple hover:underline mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to User List
        </Link>
        <div className="bg-white/60 dark:bg-deep-space/50 backdrop-blur-xl shadow-2xl rounded-2xl ring-1 ring-black/5 dark:ring-white/10">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-slate-700">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-starlight font-serif">
              Edit User
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Update the user's details below.
            </p>
          </div>
          <div className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-starlight"
                >
                  Full Name
                </label>
                <div className="relative mt-2">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md border-0 py-2.5 pl-10 bg-white/80 dark:bg-slate-800/50 text-gray-900 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nebula-purple transition"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-starlight"
                >
                  Email address
                </label>
                <div className="relative mt-2">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-2.5 pl-10 bg-white/80 dark:bg-slate-800/50 text-gray-900 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nebula-purple transition"
                  />
                </div>
              </div>

              {/* Role Select */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-starlight"
                >
                  Role
                </label>
                <div className="relative mt-2">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                  </span>
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full appearance-none rounded-md border-0 py-2.5 pl-10 bg-white/80 dark:bg-slate-800/50 text-gray-900 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20 focus:ring-2 focus:ring-inset focus:ring-nebula-purple transition"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <motion.button
                  type="submit"
                  disabled={isUpdating}
                  whileHover={{ scale: !isUpdating ? 1.05 : 1 }}
                  whileTap={{ scale: !isUpdating ? 0.95 : 1 }}
                  className="flex w-full sm:w-auto h-11 justify-center items-center rounded-full bg-nebula-purple px-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-lg shadow-nebula-purple/20 hover:shadow-nebula-purple/40 disabled:opacity-60"
                >
                  {isUpdating ? <Spinner size="sm" /> : "Save Changes"}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AdminUserEditPage;
