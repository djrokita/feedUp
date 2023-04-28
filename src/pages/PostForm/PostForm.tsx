import { redirect, json, useLoaderData, Params } from "react-router-dom";
import { PostResponse } from "../../types";
import { retrieveToken } from "../../utils/auth";
import PostPreview from "../../components/PostPreview/PostPreview";
import FeedEdit from "../../components/FeedEdit/FeedEdit";

const PostForm = () => {
    // const { post } = useLoaderData() as Awaited<PostResponse>;

    return <FeedEdit method="POST" />;
};

export default PostForm;

export async function action({ request, params }: { request: Request; params: unknown; }) {
    // const searchParams = new URL(request.url).searchParams;
    // console.log("🚀 ~ file: Feed.tsx:147 ~ action ~ params:", searchParams);
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

export async function loader({ params }: { params: Params; }) {
    // const token = retrieveToken();

    // if (!token) {
    //     return redirect('/auth');
    // }

    // const response = await fetch('http://localhost:8080/feed/post/' + params.postId, {
    //     headers: {
    //         'Authentication': 'Bearer ' + token
    //     }
    // });

    // if (!response.ok) {
    //     throw json({}, { status: 500, statusText: 'No response from the server' });
    // }

    // return await response.json();
}