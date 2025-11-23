// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import {ReactNode} from "react";
import style from "./index.module.css"
import BookItem from "@/components/book-item";
import {InferGetStaticPropsType} from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import Head from "next/head";

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
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스"/>
        <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요"/>
      </Head>
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
    </>
    )
}

Home.getLayout = (page:ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}