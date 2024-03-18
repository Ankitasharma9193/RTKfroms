import React from 'react';
import {selectAllUsers} from '../users/usersSlice';
import { useSelector } from 'react-redux';

const PostAuthor = ({ authorId }) => {
    console.log('~~~~~~~~i have~',authorId)

  const users = useSelector(selectAllUsers);

  const author = users.find((user) => user.id == authorId)
  // console.log('~~~~~~~~~~~~~~~~~',author.name)
  return (
    <span>{
        author ? author.name : 'unknown User'
        }
    </span>
  )
}

export default PostAuthor;