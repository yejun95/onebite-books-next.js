import BookItem from "@/components/book-item";
import style from "./page.module.css";
import {BookData} from "@/types";
import { Suspense } from "react";
import {delay} from "@/util/delay";

export const dynamic = "force-dynamic";
// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto : 기본값, 아무것도 강제하지 않음, dynamic을 선언하지 않아도 자동으로 적용
// 2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static : 페이지를 강제로 static 페이지로 설정
// 4. error : 현재 페이지를 static 페이지로 강제 전환하지만 동적 페이지인 경우 에러를 발생시킴

async function AllBooks () {
  await delay(1500)

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {cache: "force-cache"});
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allBooks : BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  )
}

async function RecoBooks () {
  await delay(3000)

  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, {cache: "force-cache"});
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, {next: {revalidate: 3}});
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recoBooks : BookData[] = await response.json();
  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book}/>
      ))}
    </div>
  )
}

export default function Home() {

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<div>도서를 불러오는 중입니다...</div>}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<div>도서를 불러오는 중입니다...</div>}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
