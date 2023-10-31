import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ChatItem from '../components/ChatItem'
import Avatar from '../components/Avatar'
import { auth, db } from '../firebase'
import * as Icon from "react-native-feather";
import { collection, query, where, onSnapshot } from "firebase/firestore";


export default function HomeScreen({navigation}) {

  const [chats, setChats] = useState([])

  const signOutUser = ()=>{
    auth.signOut().then(()=>{
      navigation.replace('Login')
    })
  }

  const enterChat = ({id,chatName}) => {
    
    navigation.navigate("Chat",{
      id,
      chatName
    })
  }

  useEffect(() => {
    const q = query(collection(db, "chats"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const chats = [];
    querySnapshot.forEach((doc) => {
        chats.push({
          id:doc.id,
          data:doc.data()
        });
    });
    setChats(chats)
  });
    return unsubscribe
  }, [])
  

  useLayoutEffect(()=>{
    navigation.setOptions({
      title:'LeeChat',
      headerStyle:{backgroundColor:'#fff'},
      headerTitleStyle:{color:"#000"},
      headerTintColor:'#000',
      headerLeft:()=>(
        <TouchableOpacity
          onPress={signOutUser}
        >
          <Avatar
            imageUrl={auth?.currentUser?.photoUrl}
          />
        </TouchableOpacity>
      ),
      headerRight:()=>(
       <View className="flex-row">
         <TouchableOpacity>
          <Icon.Camera/>
        </TouchableOpacity>
         <TouchableOpacity
         onPress={()=>{
          navigation.navigate("AddChat")
         }}
         className="ml-6">
         <Icon.Edit2/>
       </TouchableOpacity>
       </View>
      )
    })
  })
  return (
    <ScrollView>
      {
        chats.map(({id,data:{chatName}}) => (
          <ChatItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
        ))
      }
      
    </ScrollView>
  )
}