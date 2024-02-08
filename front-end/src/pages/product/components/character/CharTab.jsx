import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Card } from "@/components/ui/card";
import DnD from "./reactflow/DragAndDrop";
import CharList from "./CharList";
import CharAdd from "./CharAdd";
import useCharStore from "@/store/useCharStore";
import useCharQueryModule from "@/hook/useCharQueryModule";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;


// zustand 完

export default function CharTab() {
  const {
    inputs,
    users,
    selectedIdx,
    setInputs,
    setUsers,
    setSelectedIdx,
    onCreate
  } = useCharStore();
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const [cookies, setCookie] = useCookies(["refresh token"]);
  // const ACCESS_TOKEN = searchParams.get("accessToken");
  // const REFRESH_TOKEN = searchParams.get("refreshToken");

  useEffect(() => {
    navigate("/product/1/character");
    const response = axios.get(`${VITE_BASE_URL}/api/team`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTEyMTY1ODc3Njg3MTk0MDM1MDU3Iiwicm9sZSI6Ilt7XCJpZFwiOjQsXCJyb2xlXCI6XCJST0xFX1VTRVJcIn1dIiwiaWF0IjoxNzA3MzUwOTY3LCJleHAiOjE3MDczNTE4Njd9.uIJ8Xej6vskQ5bE08nKA6iQuDrJbOOBceFriG3J5avE`,
        "Access-Control-Allow-Origin": "http://localhost:5173",
        "Access-Control-Expose-Headers" : "Authorization",
        "Access-Control-Allow-Credentials": true,
      },
      withCredentials: true,
    });
    console.log("user", response);
    
    
  }, []);


  


  const find = ({teamId}) => {
    const {charData, getCharIsSuccess} = useCharQueryModule(teamId);
  }
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <div className="flex items-center justify-center w-full h-full p-2 mt-2 border rounded shadow-md">
      <Card className="box-border w-full h-full">
        <div className="box-border flex flex-row h-full p-3">
          <div className="box-border w-2/3 m-2 text-2xl font-semibold border-r h-11/12">
            인물 관계도
            <DnD users={users} idx={selectedIdx} />
          </div>
          <div className="flex flex-col w-1/3">
            <div className="flex justify-between">
              <div className="box-border w-1/2 m-2 text-2xl font-semibold h-11/12">
                인물 목록
              </div>
              <CharAdd
                name={inputs.name}
                description={inputs.description}
                onChange={onChange}
                onCreate={onCreate}
              />
            </div>
            <div className="box-border w-full h-full m-2">
              <CharList users={users} onIdxChange={(idx) => setSelectedIdx(idx)} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
