"use server"

import {revalidatePath} from "next/cache";

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
      method: "POST",
      body: JSON.stringify({
        bookId,
        content,
        author
      })
    })
    console.log(response.status);

    // 서버측에게 페이지 재생성 요청하여 관련 컴포넌트가 재렌더링됨
    // 서버 컴포넌트에서만 실행가능

    // 1. 특정 주소의 해당하는 페이지만 재검증
    revalidatePath(`/book/${bookId}`);

    // 2. 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath(`/book/[id]`, "page");

    // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath("/(with-searchbar)", "layout");

    // 4. 모든 데이터 재검증
    // revalidatePath("/", "layout");

    // 5. 태그 기준, 데이터 캐시 재검증 -> 데이터 fetch 시 캐시 인수로 적용했었던 부분에 { next: { tags : [이부분에 입력] } } 적용
    // revalidateTag(이부분에 입력);
  } catch(err) {
    console.error(err);
    return;
  }
}