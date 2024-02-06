// import React, { useEffect } from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    // 인증 성공을 확인하는 로직 여기에 구현
    // 예: URL 쿼리 파라미터에서 인증 토큰이 있는지 확인
    // 이 예시에서는 단순히 인증 성공으로 가정하고 바로 리다이렉션합니다.
    navigate("/workspace");
  }, [navigate]);

  return <div>Authenticating...</div>;
}
