import React, { forwardRef } from 'react';
import './Message.css';
import { Card, CardContent, Typography } from '@material-ui/core';

interface Props {
  username: string;
  message: firebase.firestore.DocumentData;
  ref?:
    | string
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
    | undefined;
}

const Message: React.ForwardRefExoticComponent<
  Pick<Props, 'username' | 'message'> & React.RefAttributes<HTMLDivElement>
> = forwardRef(({ username, message }, ref) => {
  const { user, content } = message;
  const isUser = username === user;

  return (
    <div ref={ref} className={`message ${isUser && 'message__user'}`}>
      <Card
        className={`message ${
          isUser ? 'message__userCard' : 'message__guestCard'
        }`}
      >
        <CardContent>
          <Typography variant='h5' component='h2'>
            {!isUser && `${user}: `} {content}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
