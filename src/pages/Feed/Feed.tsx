import { useReducer } from 'react';
import { useLoaderData, json, redirect } from 'react-router-dom';

import Button from '../../components/Button/Button';
import FeedEdit from '../../components/FeedModal/FeedEdit';
import Paginator from '../../components/Paginator/Paginator';
import Post from '../../components/Post/Post';
import { PostsResponse, TPost } from '../../types';
import { retrieveToken } from '../../utils/auth';
import { buttonStyles } from '../../utils/buttonStyles';

import "./Feed.css";

interface FeedProps {

}

type ModalState = {
    isOpen: boolean;
    editPost: TPost | null;
};

enum FEED_MODAL_ACTIONS {
    NEW = 'new',
    EDIT = 'edit',
    CLOSE = 'close'
}

type ModalAction = {
    type: FEED_MODAL_ACTIONS;
    post: TPost | null;
};

const initModalState: ModalState = {
    isOpen: false,
    editPost: null
};

function modalReducer(state: ModalState, action: ModalAction): ModalState {
    switch (action.type) {
        case FEED_MODAL_ACTIONS.NEW:
            return { ...state, isOpen: true };
        case FEED_MODAL_ACTIONS.EDIT:
            return { ...state, isOpen: true, editPost: action.post };
        case FEED_MODAL_ACTIONS.CLOSE:
            return { ...state, isOpen: false, editPost: null };
        default:
            throw new Error('Wrong action type');
    }
}

const Feed = () => {
    const data = useLoaderData() as Awaited<PostsResponse>;
    const [modalState, dispatchModal] = useReducer(modalReducer, initModalState);

    const createPostHandler = () => {
        const action: ModalAction = { type: FEED_MODAL_ACTIONS.NEW, post: null };
        dispatchModal(action);
    };
    const cancelPostHandler = () => {
        const action: ModalAction = { type: FEED_MODAL_ACTIONS.CLOSE, post: null };
        dispatchModal(action);
    };
    const finishHandler = () => null;

    const startEditPostHandler = (id: string) => {
        const selectedPost = data.posts.find(post => post._id === id);
        const action: ModalAction = { type: FEED_MODAL_ACTIONS.EDIT, post: selectedPost ?? null };
        dispatchModal(action);
    };

    const deletePostHandler = (id: string) => {
        console.log('deleting mock');
    };

    return (
        <>
            <FeedEdit
                editing={modalState.isOpen}
                selectedPost={modalState.editPost}
                // loading={false}
                onCancelEdit={cancelPostHandler}
            // onFinishEdit={finishHandler}
            />
            <section className="feed__control">
                {/* <BaseButton mode="raised" design="accent">
                    <button>New Post</button>
                </BaseButton> */}
                <Button btnStyles={buttonStyles("accent", "raised")} onClick={createPostHandler} text="New Post" />
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
                            onStartEdit={startEditPostHandler.bind(null, post._id)}
                            onDelete={deletePostHandler.bind(null, post._id)}
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
