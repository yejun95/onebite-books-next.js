"use client"

import {startTransition, useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Error({error, reset} : {error:Error; reset:()=>void;}){
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error])

  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      <button onClick={() => {
        startTransition(() => { // async, await를 적용할 수 없는 경우 사용 가능
          router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트들을 다시 불러옴
          reset(); // 에러 상태를 초기화하고, 컴포넌트들을 다시 렌더링
        })
      }}>
        다시 시도
      </button>
    </div>
  )
}