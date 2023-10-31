import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Avatar from '../components/Avatar'
import * as Icon from 'react-native-feather'
import { themeColor } from '../constant'
import { auth, db } from '../firebase'
import { doc, setDoc, serverTimestamp , collection,  updateDoc, arrayUnion, arrayRemove, orderBy, getDocs} from "firebase/firestore"; 
import { onSnapshot, query } from 'firebase/firestore';



export default function ChatScreen({navigation}) {

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const scrollViewRef = useRef(); 
    const user = auth.currentUser
    const subscribeToMessages = () => {
        const chatId = route.params.id;
        const chatDocRef = doc(db, 'chats', chatId);
        const messagesCollectionRef = collection(chatDocRef, 'messages');
        const messagesQuery = query(messagesCollectionRef, orderBy('timeStamp', 'asc'));
      
        // Create a listener to watch for changes
        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
          const updatedMessages = [];
          snapshot.forEach((doc) => {
            updatedMessages.push({
              id: doc.id,
              ...doc.data(),
            });
          });
      
          // Update the state with the latest messages
          setMessages(updatedMessages);
          setMessage('')
        });
      
        // Return the unsubscribe function to stop listening when needed
        return unsubscribe;
      };
      
    const fetchMessages  = async () => {
        const chatId = route.params.id;
        const chatDocRef = doc(db, 'chats', chatId);
        const messagesCollectionRef = collection(chatDocRef, 'messages');
        const messagesQuery = query(messagesCollectionRef,orderBy("timeStamp", "asc"));

      
        try {
          const querySnapshot = await getDocs(messagesQuery);
          const messages = [];
          
          querySnapshot.forEach((doc) => {
            // Transform the document data into an object and add it to the array
            messages.push({
              id: doc.id,
              ...doc.data(),
            });
          });
      
          setMessages(messages)
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

    useEffect(()=>{
        //   fetchMessages()
        const unsubscribe = subscribeToMessages();
        return unsubscribe
    },[route])


    const sendMessage = async ()=>{
        if(!message)    return
        Keyboard.dismiss();

        const id = route.params.id
        const user = auth.currentUser
        // Reference to the "LA" document
        const chatRef = doc(db, 'chats', id);

        // Define the data for the new document in the subcollection
        const newMessage = {
            displayName : user.displayName,
            timeStamp : serverTimestamp(),
            message: message,
            email: user.email,
            photoURL: user.photoURL
        };

        // Reference to the subcollection (e.g., "streets")
        const messagesRef = collection(chatRef, 'messages');

        setDoc(doc(messagesRef), newMessage)
        .then(() => {
            setMessage("")
            fetchMessages()
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });

    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitleVisible:false,
            headerTitleAlign: 'left',
            headerTitle:()=>(
                <View 
                className="flex-row items-center justify-start">
                    <Avatar/>
                    <Text
                        className="mx-5 text-white font-bold"
                    >{route.params.chatName}</Text>
                </View>
            ),
            headerRight:()=>(
                <TouchableOpacity>
                    <Icon.Phone/>
                </TouchableOpacity>
            )
        })

    })
    const route = useRoute()
  return (
    <SafeAreaView>
        <KeyboardAvoidingView
            className="h-full"
            behavior={Platform.OS === "ios" ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <>
                <ScrollView
                    ref={scrollViewRef} // Assign the ref to the ScrollView
                    onContentSizeChange={() => {
                    scrollViewRef.current.scrollToEnd({ animated: true }); // Automatically scroll to the end
                    }}
                >
                    {/* chats goes here */}
                    {
                        messages.map((msgItem)=>(
                            msgItem.email === user.email ? (
                                <View style={{
                                    borderTopRightRadius:0,
                                    backgroundColor:themeColor.primaryColor
                                }} className=" p-4 rounded-2xl  m-2 self-end flex-row" key={msgItem.id}>
                                    <Text className="text-white font-bold">
                                        {msgItem.message}
                                    </Text>
                                    {/* <Avatar/> */}
                                </View>
                            ) : (
                                <View style={{
                                    borderTopLeftRadius:0,
                                    backgroundColor:'#fff'
                                }} className=" p-4 rounded-2xl  m-2 self-start flex-row" key={msgItem.id}>
                                    <Text className="text-black font-bold">
                                        {msgItem.message}
                                    </Text>
                                    {/* <Avatar/> */}
                                </View>
                            )
                        ))
                    }
                </ScrollView>
                <View
                    className=" flex-row items-center p-2"
                >
                    <TextInput
                    onFocus={() => {
                        // Scroll to the end when input is focused
                        setTimeout(()=>{
                            scrollViewRef.current.scrollToEnd({ animated: true }); 
                        },100)
                      }}
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    onSubmitEditing={sendMessage}
                    style={{
                        lineHeight:20,
                        fontSize:18
                    }}
                    
                        className='flex-1 rounded-2xl  bg-gray-200 p-2 mr-2'
                        placeholder='send a message'
                    />
                    <TouchableOpacity
                        onPress={sendMessage}
                    >
                        <Icon.Send stroke={themeColor.primaryColor}/>
                    </TouchableOpacity>
                </View>
            </>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}