import { View, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import * as Icon from "react-native-feather"
import { Keyboard } from 'react-native'
import { themeColor } from '../constant'
import { db } from '../firebase'
import { addDoc, collection } from "firebase/firestore"; 


export default function AddChatScreen({navigation}) {

    const [chatName, setChatName] = useState('')

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Add a new chat",
            headerBackTitle:'Chats'
        })
    },[])

    const createChat = async ()=>{
        if(!chatName)   return alert("Chat name can not be empty")
        // Add a new document in collection "cities"
       await addDoc(collection(db, "chats"), {
            chatName
          }).then(()=>{
            navigation.goBack()
        }).catch(err => alert(err))
    }
  return (
    <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
    <View className="flex-1">
      <View className="mx-5 mt-10 border-b-2 border-gray-500 flex-row">
        <Icon.MessageSquare width={32} height={32} stroke={"#000"}/>
        <TextInput value={chatName} onChangeText={(text)=>setChatName(text)} className="flex-1 p-2" placeholder='Enter a chat name'/>
      </View>
      <TouchableOpacity
      onPress={createChat}
      style={{
        backgroundColor:themeColor.primaryColor
    }} className="h-10 m-5 rounded-lg justify-center items-center">
        <Text className="text-white text-md">
            Create new chat
        </Text>
    </TouchableOpacity>
    </View>
  
    </TouchableWithoutFeedback>
  )
}