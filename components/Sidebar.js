import { Avatar, Button, IconButton } from "@material-ui/core";
import { Chat, MoreVert, Search } from "@material-ui/icons";
import styled from "styled-components";
import * as EmailValidator from 'email-validator';
import { useAuthState } from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import { auth, db } from "../firebase";
import Chats from "./Chat";
import { useState } from "react";

function Sidebar() {
    const [user] = useAuthState(auth);
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
    const [chatsSnapshot] = useCollection(userChatRef);
const createChat = () => {
    const input = prompt(
        'Please enter the Email Address for the user to chat with'
        );
        if(!input) return null;
        if(EmailValidator.validate(input) &&!chatAlreadyExists(input) && input !== user.email ) {
            // we need to add chat in the db
            db.collection('chats').add({
                users: [user.email, input]
            })
        }    
}

const chatAlreadyExists = (receipientEmail) => {
    !!chatsSnapshot?.docs.find(chat => chat.data().users.find(user => user == receipientEmail)?.length > 0)
}
 

    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={() => auth.signOut()}/>
                <IconsContainer>
                    <IconButton>
                    <Chat/>
                    </IconButton>

                    <IconButton>
                    <MoreVert/>
                    </IconButton>
                    
                </IconsContainer>
            </Header>
            <Searchi>
                <Search/>
                <SearchInput placeholder="Search in chats"/>
            </Searchi>
            <SidebarButton onClick={createChat}>
                Start A New Chat
            </SidebarButton>
            {/* List of chats*/}
           {chatsSnapshot?.docs.map((chat) => (
               <Chats key={chat.id} id={chat.id} users={chat.data().users}/>
           ))}
        </Container>
    );
}

export default Sidebar

const Container = styled.div`
flex: 0.45;
min-width: 300px;
max-width: 350px;
border-right: 1px solid whitesmoke;
height: 100vh;
overflow-y: scroll;

::-webkit-scrollbar {
    display: none;
}

-ms-overflow-style: none;
scrollbar-width: none;
`;



const Searchi = styled.div`
display: flex;
align-items: center;
padding: 20px;
border-radius: 2px;

`;

const SidebarButton = styled(Button)`
width: 100%;
&&& { 
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
}
`;

const SearchInput = styled.input`
outline-width: 0;
border: none;
flex: 1;

`;

const Header = styled.div`
    display: flex;
    position: sticky;
    top : 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
cursor: pointer;
:hover {
    opacity: 0.0;
}
`;

const IconsContainer = styled.div``;
