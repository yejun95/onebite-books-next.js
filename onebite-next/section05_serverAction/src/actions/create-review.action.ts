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
    revalidatePath(`/book/${bookId}`)
  } catch(err) {
    console.error(err);
    return;
  }
}