import api from "@/lib/http/api";
import { API_ROUTES } from "@/lib/http/rest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

async function signup({email, password, name}: {email: string, password: string, name: string}) {
  const res = await api.post(API_ROUTES.AUTH.SIGNUP, {email, password, name});
  return res.data;  
}

async function getMe() {
  const res = await api.get(API_ROUTES.AUTH.ME);
  return res.data;
}

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const {data} = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  })

  useEffect(() => {
    if(data) {
      navigate('/');
    }
  },[data])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const mutation = useMutation(signup, {
    onSuccess: (data) => {
      console.log(data);
      navigate('/');
    }
  });

  const handleSignup = () => {
    mutation.mutate({email, password, name});
  }

  return (
    <div className="w-screen h-screen overflow-hidden ">
      <div className="flex w-full h-full justify-center items-center">
        <div className="p-8 bg-white flex flex-col gap-4 items-center min-w-[360px] border rounded-xl">
          <h1 className="text-2xl font-semibold">Signup, QuickSales</h1>

          <div className="flex flex-col my-8 w-full h-full gap-4">
          <input type="name" placeholder="Full name" className="p-2 w-full border rounded-md text-lg"
              onChange={handleNameChange} />
            <input type="email" placeholder="youremail@example.com" className="p-2 w-full border rounded-md text-lg"
              onChange={handleEmailChange} />
            <input type="password" placeholder="Password" className="p-2 w-full border rounded-md text-lg"
              onChange={handlePasswordChange} />
          </div>

          <button className="p-2 w-full bg-black text-white rounded-md" onClick={handleSignup}>Signup</button>
          <Link to="/login" className="text-black underline">Already have an account ?</Link>
        </div>
      </div>
    </div>
  )
}