import style from "./[id].module.css"
import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import fetchOneBook from "@/lib/fetch-one-books";

// SSR
// export const getServerSideProps = async(context: GetServerSidePropsContext) => {
//
//   const id = context.params!.id;
//   const book = await fetchOneBook(Number(id));
//
//   return {
//     props: {
//       book
//     }
//   }
// }

export const getStaticPaths = () => {
  return {
    paths: [
      // pathVariable은 반드시 문자열로 지정
      { params: { id: "1"} },
      { params: { id: "2"} },
      { params: { id: "3"} }
    ],
    // 일종의 대비책
    fallback: false
  }
}

// SSG
export const getStaticProps = async(context: GetStaticPropsContext) => {

  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  return {
    props: {
      book
    }
  }
}

export default function Page({book}: InferGetStaticPropsType<typeof getStaticProps>) {

  if (!book) return "문제가 발생했습니다. 다시 시도하세요."

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{backgroundImage:`url('${coverImgUrl}')`}}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>{author} | {publisher}</div>
      <div className={style.description}>{description}</div>
    </div>
  )
}