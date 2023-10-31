import { StyleSheet, Text, View, Image, TextInput ,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';
import { themeColor } from '../constant';

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = ()=>{

    }
  return (
    <KeyboardAvoidingView
        behavior='padding'
        className=" flex-1 px-5"
        keyboardVerticalOffset={320}
    >
         <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
            <View  className="flex-1 flex-col justify-start">
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 20, // Adjust this margin as needed
                            
                            height:200
                        }}
                    >

                        <Image
                    style={{ width: 300, resizeMode: 'contain' }} // Adjust width and height as needed
                    source={require('../assets/logo.png')}
                    />
                 </View>
                <View className=" w-full border-b-2 border-gray-500 ">
                <TextInput value={email} onChangeText={(text) => setEmail(text)} keyboardType='email-address' clearButtonMode={'always'} className="text-xl py-2" placeholder='Email'/>
                </View>
                <View className="mt-5 w-full border-b-2 border-gray-500 ">
                <TextInput value={password} onChangeText={(psw) => setPassword(psw)} keyboardType='default' secureTextEntry clearButtonMode={'always'} className="text-xl py-2" placeholder='Password'/>
                </View>
                <TouchableOpacity
                    onPress={signIn}
                style={{backgroundColor:themeColor.primaryColor}}  className="w-full justify-center rounded-3xl mt-10 h-12">
                    <Text className="self-center text-white text-xl font-bold">
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{}}
                style={{backgroundColor:'#fff'}}  className="w-full justify-center rounded-3xl mt-4 h-12">
                    <Text style={{color:themeColor.primaryColor}} className="self-center text-xl font-bold">
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

