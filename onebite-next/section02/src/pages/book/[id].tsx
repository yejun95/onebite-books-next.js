import style from "./[id].module.css"
import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import fetchOneBook from "@/lib/fetch-one-books";
import {useRouter} from "next/router";

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
    // false: 404 Not Found 페이지 반환
    // blocking: 즉시 생성 (Like SSR)
    // true: 즉시 생성 + 페이지만 미리 반환
    fallback: true
  }
}

// SSG
export const getStaticProps = async(context: GetStaticPropsContext) => {

  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      // book data를 불러오지 못했다면 404로 리턴
      notFound: true,
    }
  }

  return {
    props: {
      book
    }
  };
}

export default function Page({book}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  // fallback 일때만 반환되는 텍스트
  if (router.isFallback) return "로딩중입니다...";

  // 진짜 book data가 없을 때 => 존재하지 않는 pathVariable이 들어왔을 때
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