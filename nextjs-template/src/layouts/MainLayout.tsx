import Navbar from "@/components/Navbar";
import Image from "next/image";
import { ReactNode } from "react";
import styled from "styled-components";
import background from "@/assets/image/background-img.jpeg"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <MainLayoutContainer>
      <Image src={background} alt="" className="background" />
      <Navbar></Navbar>
      {children}
    </MainLayoutContainer>
  )
}

const MainLayoutContainer = styled.div`
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
`;