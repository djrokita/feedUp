import { TPost } from "../../types";
import { convertDate } from "../../utils/date";
import Image from "../Image/Image";
import "./SinglePost.css";

type PostPreviewProps = {
    post: TPost;
};

function PostPreview({ post }: PostPreviewProps) {
    const date = convertDate(post.createdAt);


    return (<section className="single-post">Sample
        <h1>{post.title}</h1>
        <h2>
            {`Created by ${post.creator.name} on ${date}`}
        </h2>
        <div className="single-post__image">
            <Image contain imageUrl={'http://localhost:8080/' + post.imageUrl} />
        </div>
        <p>{post.content}</p>
    </section>);
};

export default PostPreview;