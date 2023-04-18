import { useLoaderData, json, redirect } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Paginator from '../../components/Paginator/Paginator';
import Post from '../../components/Post/Post';
import { PostsResponse } from '../../types';
import { retrieveToken } from '../../utils/auth';
import "./Feed.css";

interface FeedProps {

}

const Feed = () => {
    const data = useLoaderData() as Awaited<PostsResponse>;


    console.log("🚀 ~ file: Feed.tsx:9 ~ Feed ~ data:", data);
    return (
        <>
            <section className="feed__control">
                <Button mode="raised" design="accent" /*onClick={null}*/ text="New Post" disabled={false} loading={false} />
            </section>
            <section className="feed">
                {/* {this.state.postsLoading && (
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <Loader />
                    </div>
                )}
                {this.state.posts.length <= 0 && !this.state.postsLoading ? (
                    <p style={{ textAlign: 'center' }}>No posts found.</p>
                ) : null} */}
                <Paginator
                    // onPrevious={this.loadPosts.bind(this, 'previous')}
                    // onNext={this.loadPosts.bind(this, 'next')}
                    lastPage={1}
                    currentPage={1}
                >
                    {data.posts.map((post) => (
                        <Post
                            key={post._id}
                            id={post._id}
                            author={post.creator.name}
                            date={new Date(post.createdAt).toLocaleDateString('en-US')}
                            title={post.title}
                            image={post.imageUrl}
                            content={post.content}
                        // onStartEdit={this.startEditPostHandler.bind(this, post._id)}
                        // onDelete={this.deletePostHandler.bind(this, post._id)}
                        />
                    ))}
                </Paginator>
            </section>
        </>);
};

export default Feed;

export async function loader() {
    const token = retrieveToken();

    if (!token) {
        return redirect('/');
    }

    const response = await fetch('http://localhost:8080/feed/posts', {
        headers: {
            'Authentication': 'Bearer ' + token
        }
    });

    if (!response.ok) {
        throw json({}, { status: 500, statusText: 'No response from the server' });
    }

    const data = await response.json();
    // console.log("🚀 ~ file: Feed.tsx:23 ~ loader ~ data:", data);

    return data;
}
