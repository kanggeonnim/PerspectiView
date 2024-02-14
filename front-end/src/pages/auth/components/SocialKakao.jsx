const SocialKakao = () => {
  //백엔드에게 받아오기??
  const Rest_api_key = "39cbad9f6d55a2e87cd38d9979d4fd9b"; //REST API KEY
  const redirect_uri = "http://localhost:5173/oauth"; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <>
      <button onClick={handleLogin}>카카오 로그인</button>
    </>
  );
};
export default SocialKakao;
