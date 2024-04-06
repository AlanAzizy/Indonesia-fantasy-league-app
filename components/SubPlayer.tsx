import { View,Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacityBase } from "react-native"
import player from "@/interfaces/player"
import { ModalContext } from "@/app/Context/ModalContext"
import { useContext, useState, useCallback, useEffect } from "react"
import { SelectPlayerContext } from "@/app/Context/SelectPlayerContext"
import { LineUpContext } from "@/app/Context/LineUpContext"
import { SubContext } from "@/app/Context/SubContext"

type player_type = {
    data : player
}

export const getPlayer = (lineUp : player[], lineUpId : number) => {
    return lineUp.filter((item)=>item.id==lineUpId);
}

export const getIndex = (lineUp : player[], lineUpId : number) => {
    let temp = -1
    let i = 0
    for (i;i<lineUp.length;i++){
        if (lineUp[i].id==lineUpId){
            temp=i
        }
    }
    return temp;
}



const SubPlayer:React.FC<player>=(item)=>{
  
    const {modalShowed, setModalShowed} = useContext(ModalContext);
    const {selectPlayer, setSelectPlayer} = useContext(SelectPlayerContext);
    const {line_up, setLine_up} = useContext(LineUpContext);
    const {subs, setSubs} = useContext(SubContext);

    const showModals = () => {
        setModalShowed(true);
        setSelectPlayer(item as player)
    }

    // useEffect(()=>{
    //     // console.log(line_up)
    // },[line_up])

    const substitute = () => {
        var temp;
        var toSub;
        if (selectPlayer){
            const newLineUp = line_up as player[];
            const newSubs = subs as player[];
            if (newSubs.find((e)=>selectPlayer.id==e.id)){
                temp = getPlayer(newSubs, selectPlayer.id)[0] as player;
                newSubs[getIndex(newSubs, selectPlayer.id)] = getPlayer(newSubs,item.id)[0] as player;
                newSubs[getIndex(newSubs,item.id)] = temp;
            }
            else{
                temp = getPlayer(newLineUp, selectPlayer.id)[0] as player;
                toSub = getPlayer(newSubs,item.id)[0] as player;
                if (selectPlayer.isCaptain){
                    temp.isCaptain = false;
                    toSub.isCaptain = true;
                }
                newLineUp[getIndex(newLineUp, selectPlayer.id)] = toSub;
                setLine_up(newLineUp);
                newSubs[getIndex(newSubs,item.id)] = temp;
                setSubs(newSubs);
            }
            setSelectPlayer(null)
        }else{
            showModals();
            setSelectPlayer(item as player)
        }
    }

    return(
        <View style={(selectPlayer && selectPlayer.id==item.id) ? styles.containerBorder : styles.container}>
            <TouchableOpacity style={{width:'100%'}} onPress={substitute}>
                <Text style={styles.pos}>{item.position}</Text>  
                <Image style={styles.image} source={require('../assets/images/kit.png')}></Image>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.tim}>{item.tim}</Text>  
            </TouchableOpacity>   
        </View>
    )
}

export default SubPlayer;

const styles = StyleSheet.create({
    container:{
        height : 100,
        alignItems : 'center',
        width : '18%',
        borderColor:'#ff0000',
        borderWidth:0

    },
    containerBorder:{
        height : 100,
        alignItems : 'center',
        width : '18%',
        borderColor:'#ff0000',
        borderWidth:2,
        backgroundColor : '#999999',

    },
    image:{
        width : '100%',
        height: '65%',
        objectFit : 'contain',
    },
    name:{
        margin:0, 
        padding : 0,
        fontSize:12, 
        backgroundColor:'#F6AE2D', 
        width:'100%', 
        textAlign:'center'
    },
    tim:{
        margin:0, 
        padding : 0,
        fontSize:12, 
        backgroundColor:'#CCAC2B', 
        width:'100%', 
        textAlign:'center'
    },
    pos : {
        margin:0, 
        padding : 0,
        fontSize:12, 
        width:'100%', 
        textAlign:'center'
    }
})
