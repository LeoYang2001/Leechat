import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import { themeColor } from '../constant'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
    //    const unsubscribe = auth.onAuthStateChanged((authUser) => {
    //     if(authUser){
    //         navigation.replace('Home')
    //     }
    //   })
    //   return unsubscribe;
    }, [])
    

    const signIn = ()=>{
        const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigation.replace('Home')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                alert(errorCode)
                const errorMessage = error.message;
            });

    }
    const height = useHeaderHeight()
  return (
    <KeyboardAvoidingView
    keyboardVerticalOffset={height}
        behavior='padding'
    className="flex-1 ">
         <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
        <View className="flex-col mt-20 justify-center items-center p-10">
        <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 20, // Adjust this margin as needed
                            
                            height:100
                        }}
                    >

                        <Image
                    style={{ width: 300, resizeMode: 'contain' }} // Adjust width and height as needed
                    source={require('../assets/logo.png')}
                    />
                 </View>
                 <View className=" w-full mt-2 border-b-2 border-gray-500 ">
                <TextInput value={email} onChangeText={(text) => setEmail(text)} keyboardType='email-address' clearButtonMode={'always'} className="text-lg py-1" placeholder='Email'/>
                </View>
                <View className="mt-5 w-full border-b-2 border-gray-500 ">
                <TextInput value={password} onChangeText={(psw) => setPassword(psw)} keyboardType='default' secureTextEntry clearButtonMode={'always'} className="text-lg py-1" placeholder='Password'/>
                </View>
                <TouchableOpacity
                    onPress={signIn}
                style={{backgroundColor:themeColor.primaryColor}}  className="w-full justify-center rounded-3xl mt-10 h-12">
                    <Text className="self-center text-white text-xl font-bold">
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate('Register')
                    }}
                style={{backgroundColor:'#fff'}}  className="w-full justify-center rounded-3xl mt-4 h-12">
                    <Text style={{color:themeColor.primaryColor}} className="self-center text-xl font-bold">
                        Register
                    </Text>
                </TouchableOpacity>
            <View style={{height:260}}></View>
        </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}