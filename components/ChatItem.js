import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import { doc, setDoc, serverTimestamp , collection,  updateDoc, arrayUnion, arrayRemove, orderBy, getDocs} from "firebase/firestore"; 
import { onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';

export default function ChatItem(
    {
        id,
        chatName,
        enterChat
    }
) {
    const [chatMessage, setChatMessage] = useState("")

    useEffect(() => {
        const chatDocRef = doc(db, 'chats', id);
        const messagesCollectionRef = collection(chatDocRef, 'messages');
        const messagesQuery = query(messagesCollectionRef, orderBy('timeStamp', 'asc'));
      
        
        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const updatedMessages = [];
            snapshot.forEach((doc) => {
              updatedMessages.push({
                id: doc.id,
                ...doc.data(),
              });
            });
        
            setChatMessage(updatedMessages[updatedMessages.length - 1])
            
          });
        
    
    }, [])
    

  return (
    <TouchableOpacity
        onPress={()=>{enterChat({id,chatName})}}
    activeOpacity={.5} className="w-full bg-white justify-start flex-row items-center px-4 py-2">
        <Avatar imageUrl={chatMessage.photoURL}/>
        <View  className=" flex-1 justify-between ml-4 ">
            <Text className="text-lg font-bold">
                {chatName}
            </Text>
            <Text numberOfLines={1} className="text-sm w-full">
                {chatMessage.message}
            </Text>
        </View>
    </TouchableOpacity>
  )
}