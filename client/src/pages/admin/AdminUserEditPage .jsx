import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Meta from "../../components/common/Meta";
import Spinner from "../../components/common/Spinner";

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
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Meta title={`Edit User | ${name}`} />
      <div>
        <Link
          to="/admin/users"
          className="text-indigo-600 dark:text-nebula-purple hover:underline mb-6 inline-block"
        >
          &larr; Back to User List
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-starlight mb-6">
          Edit User
        </h1>
        <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-8 ring-1 ring-black/5 dark:ring-white/10">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-slate-700/50 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-nebula-purple"
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
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-slate-700/50 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-nebula-purple"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-starlight"
              >
                Role
              </label>
              <div className="mt-2">
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-slate-700/50 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-nebula-purple"
                >
                  <option value="user" className="bg-white dark:bg-slate-800">
                    User
                  </option>
                  <option value="admin" className="bg-white dark:bg-slate-800">
                    Admin
                  </option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isUpdating}
                className="rounded-md bg-indigo-600 dark:bg-nebula-purple px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-purple-600 disabled:opacity-50"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminUserEditPage;
