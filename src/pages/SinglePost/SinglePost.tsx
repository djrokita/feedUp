import { redirect, json, useRouteLoaderData, Params } from "react-router-dom";
import { PostResponse } from "../../types";
import { retrieveToken } from "../../utils/auth";
import PostPreview from "../../components/PostPreview/PostPreview";

const SinglePost = () => {
    const { post } = useRouteLoaderData('single-post') as Awaited<PostResponse>;

    return <PostPreview post={post} />;
};

export default SinglePost;

export async function loader({ params }: { params: Params; }) {
    const token = retrieveToken();

    if (!token) {
        return redirect('/auth');
    }

    const response = await fetch('http://localhost:8080/feed/post/' + params.postId, {
        headers: {
            'Authentication': 'Bearer ' + token
        }
    });

    if (!response.ok) {
        throw json({}, { status: 500, statusText: 'No response from the server' });
    }

    return await response.json();
}