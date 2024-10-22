import { Link } from "react-router-dom";
import classes from "./Post.module.css";

const Post = ({ id, title, content }) => {
  return (
    <li className={classes.post}>
      <Link to={`/post/${id}`}>
        <p className={classes.title}>{title}</p>
        <p className={classes.content}>{content}</p>
      </Link>
    </li>
  );
};

export default Post;
