

import Image from "next/image";
import background from "@/assets/image/background-img.jpeg"
import React, { ReactNode } from "react";
import styled from "styled-components";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthLayoutContainer>
      <Image src={background} alt="" className="background" />
      <div className="content">
        {children}
      </div>
    </AuthLayoutContainer>
  )
}

const AuthLayoutContainer = styled.div`
  position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 100vh;
    .background {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.content {
  position: relative;
  z-index: 1;
}
`;