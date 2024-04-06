import { useContext, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, Modal } from "react-native"
import { ModalContext } from "../Context/ModalContext";
import { SelectPlayerContext } from "../Context/SelectPlayerContext";
import { LineUpContext } from "../Context/LineUpContext";
import player from "@/interfaces/player";

type ModalFunction = {
    onClose:() => void;
    showModals : boolean;
}


const Modals = ()=> {

    const {modalShowed, setModalShowed} = useContext(ModalContext);
    const {selectPlayer, setSelectPlayer} = useContext(SelectPlayerContext);
    const {line_up, setLine_up} = useContext(LineUpContext);

    const substitue = () => {
        setModalShowed(false)
    }

    useEffect(()=>{
        // console.log(line_up)
    },[line_up])

    const setCaptain = () => {
        const currentLineUp = line_up as player[];
        if (currentLineUp.findIndex((item)=>item.id==selectPlayer.id)!=-1){
            const newLineUp = currentLineUp.map((item)=>{
                if (item.isCaptain){
                    item.isCaptain=false;
                }
                if (item.id==selectPlayer.id){
                    item.isCaptain=true;
                }
                console.log(item)
                return item;
            })
            setLine_up(newLineUp);
        }
        closeModals();
    }

    const closeModals = ()=>{
        setModalShowed(false);
        setSelectPlayer(null);
    }


    return (
        <View style={modalShowed ? styles.containerShow : styles.containerHide}>
            <View style={styles.background}>
                <TouchableOpacity style={{width:'100%', height:'100%'}} onPress={closeModals}>

                </TouchableOpacity>
            </View>
            <View style={styles.profile}>
                <View style={{height : '50%', borderColor : '#ff0000', borderWidth : 0, padding : 5, flex:6, flexDirection:'row'}}>
                    <View style={{height:'100%', width : '30%'}}>
                        <Image style={styles.profileStyle} source={require('../../assets/images/kit.png')}></Image>
                    </View>
                    <View style={{backgroundColor : '#ffffff', width : '70%', height : '100%', flex : 1, flexDirection:'row', borderRadius:4, marginLeft:6}}>
                        <View style={{flex:1, margin : 4}}>
                            <Text style={{margin : 4, textAlign : 'left', fontSize : 18}}>Name</Text>
                            <Text style={{margin : 4, textAlign : 'left', fontSize : 18}}>Tim</Text>
                            <Text style={{margin : 4, textAlign : 'left', fontSize : 18}}>Price</Text>
                        </View>
                        <View style={{flex:2, margin : 4}}>
                            <Text style={{margin : 4, textAlign : 'left', fontSize : 18}}>{selectPlayer ? selectPlayer.name : ''}</Text>
                            <Text style={{margin : 4, textAlign : 'left', fontSize : 18}}>{selectPlayer ? selectPlayer.tim : ''}</Text>
                            <Text style={{margin : 4, textAlign : 'left', fontSize : 18}}>{selectPlayer ? 'eur '+selectPlayer.price+' M' : ''}</Text>
                        </View>
                    </View>
                </View>
                <View style={{height : '50%', borderColor : '#ff0000', borderWidth : 0, padding : 5, flex:3, flexDirection : 'row'}}>
                    <View style={{flex : 1, backgroundColor : '#41ff01', width:'100%', height:'100%', borderColor:'#ffffff', borderWidth :0, borderRadius : 2, marginHorizontal : 2, justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=>substitue()}>
                            <Text style={{color:'#000', fontSize : 20, fontFamily:'sans-serif', textAlign : 'center', marginVertical:'auto', borderColor:'#0000ff'}}>
                                Substitute
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex : 1, backgroundColor : '#ffff00', width:'100%', height:'100%', borderColor:'#ffffff', borderWidth :0, borderRadius : 2, marginHorizontal : 2, justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=>setCaptain()}>
                            <Text style={{color:'#000', fontSize : 20, fontFamily:'sans-serif', textAlign : 'center', marginVertical:'auto', borderColor:'#0000ff'}}>
                                Set as captain
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>   
        </View>
    )
}

export default Modals;


const styles = StyleSheet.create({
    containerShow : {
        width : '100%',
        height : '100%',
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        position : 'absolute',
        borderColor : '#fF0000',
        borderWidth : 0,
        top : 0,
        // backgroundColor : '#000000'
        display : 'flex'
    },
    containerHide : {
        width : '100%',
        height : '100%',
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        position : 'absolute',
        borderColor : '#fF0000',
        borderWidth : 0,
        top : 0,
        // backgroundColor : '#000000'
        display : 'none'
    },
    profile : {
        width : '80%',
        height : '30%',
        backgroundColor : '#105BB7',
        opacity : 1,
        borderRadius : 10,
        padding : 15,
        zIndex : 2
    },
    background : {
        backgroundColor : '#000000',
        backfaceVisibility : 'visible',
        zIndex : 1,
        position : 'absolute',
        top : 0,
        width : '100%',
        height : '100%',
        borderColor : '#f0f0f0',
        borderWidth : 0,
        opacity : 0.4,
    },
    profileStyle : {
        width : '90%',
        height : '100%',
        padding : 10,
        borderColor: '#ffff00',
        borderWidth : 0,
        marginVertical : 'auto',
        marginHorizontal : 'auto'
    }
})