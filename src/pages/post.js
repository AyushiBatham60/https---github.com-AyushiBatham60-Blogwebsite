import PostList from '../../components/PostList';

export default function Posts({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      <PostList  />
    </div>
  );
}

// This function runs at build time to fetch the blog posts data and pass it to the component as props
export async function getStaticProps() {
  const res = await fetch('https://myapi.com/posts');
  const posts = await res.json();
  return {
    props: { posts },
  };
}

export async function getPost(id) {
    const res = await fetch(`https://myapi.com/posts/${id}`);
    const post = await res.json();
    return post;
  }
  
