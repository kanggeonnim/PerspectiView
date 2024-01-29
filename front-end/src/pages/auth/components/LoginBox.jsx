export function LoginBox({children}) {


  return (
    <div className="flex justify-center items-center w-[25vw] border rounded-xl">
      <div className="flex flex-col w-3/5 h-[50vh] justify-around">
        <div className="flex justify-center">
          시:작
        </div>
        <div className="flex justify-center">
          로그인 후 서비스를 이용해보세요.
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}