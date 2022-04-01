import { getLink } from "@/api/common";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Go = ({ data }) => {
  const router = useRouter()

  const goPage = () => {
    const url = data?.originalUrl?.split('.com')[1]
    if (url) {
      router.push(url)
    } else {
      router.push('/')
    }
  }

  useEffect(() => {
    goPage()
  }, [])

  return (
    <div>loading...</div>
  )
}

export const getServerSideProps = async ({ params: { id } }) => {
  const { data } = await getLink(id)
  return {
    props: {
      data
    }
  }
}

export default Go