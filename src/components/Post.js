import React from 'react';
import {Image, Text, View} from 'react-native';

const Post = ({id}) => (
    <View style={{
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
    }}>
        <Image
            source={{uri: `https://source.unsplash.com/user/stephenleo1982?sig=${id}`}}
            style={{
                aspectRatio: 1.91,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10
            }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 15, overflow: 'hidden'}}>
            <Text>Like</Text>
            <Text>Comment</Text>
        </View>
    </View>
);

export default Post;
