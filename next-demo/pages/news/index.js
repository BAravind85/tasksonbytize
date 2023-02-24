function NewList({ articles }) {
  return (
    <>
      <h1>Latest News</h1>
      {articles.map((article) => {
        return (
          <div key={article.id}>
            <h2>
              {article.id} {article.name}
            </h2>
            <p>{article.description}</p>
            <h3> {article.category}</h3>
          </div>
        );
      })}
    </>
  );
}
export default NewList;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:4000/news");
  const data = await res.json();
  return {
    props: {
      articles: data,
    },
  };
}
