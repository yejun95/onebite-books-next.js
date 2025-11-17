// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import {ReactNode} from "react";
import style from "./index.module.css"
import books from "@/mock/books.json"
import BookItem from "@/components/book-item";
import {InferGetServerSidePropsType} from "next";

// 약속된 이름의 함수: SSR
export const getServerSideProps = () => {
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수

  const data = "hello";

  // 무조건 props 프로퍼티 객체로 반환해야함
  return {
    props: {
      data
    }
  }
};

export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  console.log(data)

  return (
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {books.map((book) => (
            <BookItem key={book.id} {...book}/>
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {books.map((book) => (
            <BookItem key={book.id} {...book}/>
          ))}
        </section>
      </div>
    )
}

Home.getLayout = (page:ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}