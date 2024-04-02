"use client";
import { useAppDispatch } from "@/hooks";
import { useEffect } from "react";
import { AppContainer } from "./style";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(ExampleActions.exampleAction("payload"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContainer>
      <h1>Post list</h1>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </AppContainer>
  );
}
