export function LoginBox({children}) {


  return (
    <div className="flex justify-center items-center w-[33vw] h-[50vh] border rounded-xl">
      <div className="grid grid-rows-3">
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