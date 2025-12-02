import {ReactNode} from "react";
import SearchBar from "@/app/(with-searchbar)/searchbar";

export default function Layout({
    children
}: {
    children: ReactNode
}) {
  return (
    <div>
      <SearchBar />
      {children}
    </div>
  )
}