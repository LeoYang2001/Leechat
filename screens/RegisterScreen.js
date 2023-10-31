import { View, Text, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import { themeColor } from '../constant'
import { Keyboard } from 'react-native'
import { Image } from 'react-native'
import { auth } from '../firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export default function RegisterScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState("https://th.bing.com/th/id/OIP.MbuEH7q2abQ04oRBd1XWswHaHa?pid=ImgDet&rs=1")

    const auth = getAuth()

    const height = useHeaderHeight()
    const signUp = ()=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            user.displayName = fullName,
            user.photoURL = imageUrl
            // ...
            navigation.replace('Login')
            
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode);
            
            // ..
  });
    }

  return (
    <KeyboardAvoidingView
    keyboardVerticalOffset={height}
    // enabled={false}
        behavior='padding'
    className="flex-1 ">
         <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
        <View className="flex-col mt-20 justify-center items-center  px-10">
                <Text className="text-3xl mb-10 font-extrabold">
                    Create an account
                </Text>
                
                 <View className=" w-full mt-2 border-b-2 border-gray-500 ">
                <TextInput value={fullName} onChangeText={(text) => setFullName(text)}  clearButtonMode={'always'} className="text-lg py-1" placeholder='Full Name'/>
                </View>
                <View className="mt-5 w-full border-b-2 border-gray-500 ">
                <TextInput value={email} onChangeText={(text) => setEmail(text)} keyboardType='email-address' clearButtonMode={'always'} className="text-lg py-1" placeholder='Email'/>
                </View>
                <View className="mt-5 w-full border-b-2 border-gray-500 ">
                <TextInput value={password} onChangeText={(psw) => setPassword(psw)} keyboardType='default' secureTextEntry clearButtonMode={'always'} className="text-lg py-1" placeholder='Password'/>
                </View>
                <View className="mt-5 w-full border-b-2 border-gray-500 ">
                <TextInput value={imageUrl} onChangeText={(url)=> setImageUrl(url)} keyboardType='default'  clearButtonMode={'always'} className="text-lg py-1" placeholder='Profile URL'/>
                </View>
                <TouchableOpacity
                    onPress={signUp}
                style={{backgroundColor:themeColor.primaryColor}}  className="w-full justify-center rounded-3xl mt-10 h-12">
                    <Text className="self-center text-white text-xl font-bold">
                        Register
                    </Text>
                </TouchableOpacity>
            <View style={{height:200}}></View>
        </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}