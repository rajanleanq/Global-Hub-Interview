import React from "react";
import Navbar from "../../../landing-page/components/navbar/navbar";

export default function DetailPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="w-full h-full flex flex-1 bg-white-gradient relative">
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
}
