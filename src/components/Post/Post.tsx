import { Link } from 'react-router-dom';

import { TPost, User } from '../../types';
import { buttonStyles } from '../../utils/buttonStyles';
import Button from '../Button/Button';
import Image from '../Image/Image';
import './Post.css';

type PostProps = {
  id: string;
  title: string;
  date: string;
  content: string;
  image: string;
  author: string;
};

function Post(props: PostProps) {
  return (
    <article className="post">
      <header className="post__header">
        <h3 className="post__meta">
          Posted by {props.author} on {props.date}
        </h3>
        <h1 className="post__title">{props.title}</h1>
      </header>
      <div className="post__actions">
        <Link className={buttonStyles(null, "flat")} to={props.id}>View</Link>
        {/* <Button mode="flat" onClick={props.onStartEdit} text="Edit" />
        <Button mode="flat" design="danger" onClick={props.onDelete} text="Delete" /> */}
      </div>
    </article>
  );
}

export default Post;
