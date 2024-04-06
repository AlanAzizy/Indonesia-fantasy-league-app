import { View,Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacityBase } from "react-native"
import player from "@/interfaces/player"
import { ModalContext } from "@/app/Context/ModalContext"
import { useContext, useEffect } from "react"
import { SelectPlayerContext } from "@/app/Context/SelectPlayerContext"
import { getPlayer, getIndex } from "./SubPlayer"
import { LineUpContext } from "@/app/Context/LineUpContext"
import { SubContext } from "@/app/Context/SubContext"

type player_type = {
    data : player
}


const Player:React.FC<player>=(item)=>{
  
    const {modalShowed, setModalShowed} = useContext(ModalContext);
    const {selectPlayer, setSelectPlayer} = useContext(SelectPlayerContext);
    const {line_up, setLine_up} = useContext(LineUpContext);
    const {subs, setSubs} = useContext(SubContext);

    const showModals = () => {
        setModalShowed(true);
    }

    // useEffect(()=>{
    //     // console.log(item)
    // },[line_up])

    const substitute = () => {
        var temp;
        var toSub;
        if (selectPlayer){
            const newLineUp = line_up as player[];
            const newSubs = subs as player[];
            if (newLineUp.find((e)=>selectPlayer.id==e.id)){
                temp = getPlayer(newLineUp, selectPlayer.id)[0] as player;
                newLineUp[getIndex(newLineUp, selectPlayer.id)] = getPlayer(newLineUp,item.id)[0] as player;
                newLineUp[getIndex(newLineUp,item.id)] = temp;
            }else{
                temp = getPlayer(newSubs, selectPlayer.id)[0] as player;
                toSub = getPlayer(newLineUp,item.id)[0] as player;
                if (item.isCaptain){
                    temp.isCaptain = true;
                    toSub.isCaptain = false;
                }
                newSubs[getIndex(newSubs, selectPlayer.id)] = toSub;
                setSubs(newSubs);
                newLineUp[getIndex(newLineUp,item.id)] = temp;
                setLine_up(newLineUp);
            }
            setSelectPlayer(null);
        }else{
            showModals();
            setSelectPlayer(item as player)
        }
    }

    return(
        <View style={(selectPlayer && selectPlayer.id==item.id) ? styles.containerBorder : styles.container}>
            <TouchableOpacity style={{width:'100%'}} onPress={substitute}>
                <Image style={styles.image} source={require('../assets/images/kit.png')}></Image>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.tim}>{item.tim}</Text>  
                <View style={item.isCaptain ? styles.captain : {}}>
                    <Text style={item.isCaptain ? {justifyContent:'center', alignItems:'center', textAlign : 'center'} : {display : 'none'}}>C</Text>
                </View>
            </TouchableOpacity>   
        </View>
    )
}

export default Player;

const styles = StyleSheet.create({
    container:{
        height : '100%',
        alignItems : 'center',
        width : '18%',
        borderColor:'#ff0000',
        borderWidth:0,
        position : 'relative'

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
    captain : {
        width : 20,
        height : 20,
        backgroundColor : '#ffff00',
        position : 'absolute',
        top : '1%',
        right : '1%',
        borderRadius : 10,
        flex : 1
    }
})
