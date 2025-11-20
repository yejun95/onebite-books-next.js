// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import {ReactNode} from "react";
import style from "./index.module.css"
import BookItem from "@/components/book-item";
import {InferGetStaticPropsType} from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

// 약속된 이름의 함수: SSR
// export const getServerSideProps = async() => {
//   const [allBooks, recoBooks] = await Promise.all([
//     fetchBooks(),
//     fetchRandomBooks(),
//   ])
//
//   return {
//     props: {
//       allBooks,
//       recoBooks
//     }
//   }
// };

// SSG
export const getStaticProps = async() => {
  console.log("인덱스 페이지")

  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ])

  return {
    props: {
      allBooks,
      recoBooks
    },
    // ISR 적용 -> 재검증하다.
    // 3초 주기로 재검증
    // revalidate: 3,
  }
};

export default function Home({ allBooks, recoBooks }: InferGetStaticPropsType<typeof getStaticProps>) {


  return (
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => (
            <BookItem key={book.id} {...book}/>
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book}/>
          ))}
        </section>
      </div>
    )
}

Home.getLayout = (page:ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}