import Link from "next/link";

function PostList({ posts }) {
  return (
    <>
      <h1>Posts List</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`posts/${post.id}`}>
              <h1>
                {post.id} {post.title}
              </h1>
            </Link>
          </div>
        );
      })}
    </>
  );
}
export default PostList;

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return {
    props: {
      posts: data,
    },
  };
}
