import { useRouter } from "next/router";

export default function Book() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Book {id}</h1>;
}