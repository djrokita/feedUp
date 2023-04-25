import { useState } from 'react';
import { useLoaderData, json, redirect } from 'react-router-dom';

import Button from '../../components/Button/Button';
import FeedEdit from '../../components/FeedModal/FeedEdit';
import Paginator from '../../components/Paginator/Paginator';
import Post from '../../components/Post/Post';
import { PostsResponse } from '../../types';
import { retrieveToken } from '../../utils/auth';
import { buttonStyles } from '../../utils/buttonStyles';

import "./Feed.css";

interface FeedProps {

}

const Feed = () => {
    const data = useLoaderData() as Awaited<PostsResponse>;
    const [isModal, setModal] = useState(false);

    const openModalHandler = () => {
        console.log('OPEN-MODAL');
        setModal(true);
    };
    const cancelHandler = () => {
        console.log('CLOSE-MODAL');
        setModal(false);
    };
    const finishHandler = () => null;

    return (
        <>
            <FeedEdit
                editing={isModal}
                selectedPost={null}
                // loading={false}
                onCancelEdit={cancelHandler}
            // onFinishEdit={finishHandler}
            />
            <section className="feed__control">
                {/* <BaseButton mode="raised" design="accent">
                    <button>New Post</button>
                </BaseButton> */}
                <Button btnStyles={buttonStyles("accent", "raised")} onClick={openModalHandler} text="New Post" />
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
                            author={post.creator.name || "Guest"}
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
        return redirect('/auth');
    }

    const response = await fetch('http://localhost:8080/feed/posts', {
        headers: {
            'Authentication': 'Bearer ' + token
        }
    });

    if (!response.ok) {
        throw json({}, { status: 500, statusText: 'No response from the server' });
    }

    return await response.json();
}

export async function action({ request }: { request: Request; }) {
    const token = retrieveToken();

    if (!token) {
        return redirect('/auth');
    }

    const formData = await request.formData();

    const url = 'http://localhost:8080/feed/post';
    const response = await fetch(url, {
        method: request.method,
        headers: {
            Authentication: 'Bearer ' + token,
        },
        body: formData,
    });

    if (response.status === 422) {
        return response;
    }

    // if (res.status !== 200 && res.status !== 201) {
    //     throw new Error('Creating or editing a post failed!');
    // }

    if (!response.ok) {
        throw response;
    }

    return redirect('/');
}
