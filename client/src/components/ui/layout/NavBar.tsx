import api from "@/lib/http/api";
import { API_ROUTES } from "@/lib/http/rest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";

async function getMe() {
  const res = await api.get(API_ROUTES.AUTH.ME);
  return res.data;
}

async function logout() {
  const res = await api.post(API_ROUTES.AUTH.LOGOUT);
  return res.data;
}

export default function NavBar() {
  const navigate = useNavigate();
  const {data, isLoading, isError} = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  })

  useEffect(() => {
    if(data) {
      console.log(data);
    }
  },[data])

  const logoutMutation = useMutation(logout, {
    onSuccess: (data) => {
      window.location.href="/login";
    }
  })

  if(isError) navigate('/login');

  return (
    <nav className="flex justify-between items-center p-8">
      {
        isLoading ? <Loading /> : null
      }
      <h1 className="">My App</h1>
      <ul className="flex gap-4 items-center">
        <li>
          <Link to={"/manage-salesmen"}>
          Salesmen
          </Link>
        </li>
        <li>
          <Link to={"/manage-location"}>
          Locations
          </Link>
          </li>
        <button  className="text-red-400 underline rounded-md"
        onClick={() => logoutMutation.mutate()}>Logout</button>
      </ul>
    </nav>
  )
}