import logo from "@/assets/Logo.svg";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Link, NavLink } from "react-router-dom";
export function LoginBox({children}) {


  return (
    <div className="flex flex-col justify-center items-center w-[25vw] border rounded-xl p-4 box-border">
      <div className="w-full flex justify-end">
        <NavLink to='/'>
          <Cross1Icon />
        </NavLink>
      </div>
      <div className="flex flex-col w-full h-[50vh] items-center box-border p-4">
        <div className="flex flex-col w-2/3 h-full justify-around">
          <div className="flex justify-center">
            <img className="w-auto h-8" src={logo} alt="logo" />
          </div>
          <div className="flex justify-center">
            로그인 후 서비스를 이용해보세요.
          </div>
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}