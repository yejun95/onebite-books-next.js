import style from "./page.module.css";
import {notFound} from "next/navigation";

// generateStaticParams 변수 안에 없는 값이라면 404로 리턴시키는 함수 -> 1, 2, 3 id 이외에는 동적 페이지를 만들지 않음
// export const dynamicParams = false; - 라우트 세그먼트 옵션 중 하나

// Page Router에서 사용한 getStaticPath와 동일
// 명시된 path 이외 요청이 들어오면 동적으로 페이지를 만든다.
export function generateStaticParams (){
  return [{id:"1"}, {id:"2"}, {id: "3"}]
}

async function BookDetail({bookId}: { bookId: string}){
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`);
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const book = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

function ReviewEditor() {

  async function createReviewAction(formData: FormData) {
    "use server"

    const content = formData.get("content")?.toString();
    const author = formData.get("author")?.toString();

  }

  return (
    <section>
      <form action={createReviewAction}>
        <input name="content" placeholder="리뷰 내용"/>
        <input name="author" placeholder="작성자"/>
        <button type="submit">작성하기</button>
      </form>
    </section>
  )
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor />
    </div>
  );

}
