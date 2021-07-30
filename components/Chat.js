import { Avatar } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

function Chat({id, users}) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(
        db.collection('users').where("email","==", getRecipientEmail(users, user))
    );

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    const receipient = recipientSnapshot?.docs?.[0]?.data();
    const receipientEmail = getRecipientEmail(users, user)
    return (
        <Container onClick={enterChat}>
            {receipient ? (
                <UserAvatar src={receipient?.photoURL}/>
            ): (
                <UserAvatar>{receipientEmail[0]}</UserAvatar>
            )}
            <p>{receipientEmail}</p>
        </Container>
    )
}

export default Chat

const Container = styled.div`
display: flex;
align-items: center;
cursor: pointer;
padding: 15px;
word-break: break-word;

:hover{
    background-color: #e9eaeb;
}
`;
const UserAvatar = styled(Avatar)`
margin: 5px;
margin-right: 15px;
`;
