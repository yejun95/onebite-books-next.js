import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import {BookData} from "@/types";
import {ReactNode} from "react";

async function Footer() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
      { cache: "force-cache" }
    );

    if (!response.ok) {
      return <footer>제작 @yejun</footer>;
    }

    const books: BookData[] = await response.json();
    return (
      <footer>
        <div>제작 @yejun</div>
        <div>{books.length}개의 도서가 등록되어 있습니다.</div>
      </footer>
    );
  } catch (error) {
    // 네트워크 에러 (ECONNREFUSED 등) 여기서 처리
    return <footer>제작 @yejun</footer>;
  }
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode,
  modal: ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          {modal}
          <main>{children}</main>
          <Footer />
        </div>
      <div>
        <div id="modal-root"></div>
      </div>
      </body>
    </html>
  );
}
