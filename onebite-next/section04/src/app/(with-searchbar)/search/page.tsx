import BookItem from "@/components/book-item";
import {BookData} from "@/types";
import {delay} from "@/util/delay";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

async function SearchResult ({q}:{q : string}){
  // Suspense를 쓰기 위해 강제 지연
  await delay(1500);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`, {cache: "force-cache"}) // 검색되는 데이터 마다 캐싱이 가능
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books : BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <Suspense fallback={<BookListSkeleton count={2} />}>
      <SearchResult q={q || ""}/>
    </Suspense>
  )

}
