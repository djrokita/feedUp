import { redirect, json, useLoaderData, Params } from "react-router-dom";
import { PostResponse } from "../../types";
import { retrieveToken } from "../../utils/auth";
import Image from '../../components/Image/Image';
import "./SinglePost.css";

interface SinglePostProps {

}

const SinglePost = () => {
    const { post } = useLoaderData() as Awaited<PostResponse>;

    return (
        <section className="single-post">Sample
            <h1>{post.title}</h1>
            <h2>
                {`Created by ${post.creator} on ${post.createdAt}`}
            </h2>
            <div className="single-post__image">
                <Image contain imageUrl={'http://localhost:8080/' + post.imageUrl} />
            </div>
            <p>{post.content}</p>
        </section>
    );
};

export default SinglePost;

export async function loader({ params }: { params: Params; }) {
    const token = retrieveToken();

    if (!token) {
        return redirect('/');
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