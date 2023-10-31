import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Avatar({imageUrl}) {
    const _imageUrl = imageUrl || "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-1024.png";
  return (
    <View style={{
        width:36,
        height:36,
        overflow:'hidden',
    }} className=" justify-center items-center rounded-full shadow-xl">
        <Image
        className="rounded-full"
          style={{ width:'100%', height:'100%',
        }}
        source={{
            uri:_imageUrl
        }} />
    </View>
  )
}