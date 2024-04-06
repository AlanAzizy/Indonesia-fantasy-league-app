import { View, StyleSheet } from "react-native";
import SubPlayer from "./SubPlayer";
import player from "@/interfaces/player";
import { useContext } from "react";
import { SelectPlayerContext } from "@/app/Context/SelectPlayerContext";

type playerArray = {
    data : player[]
}

export default function Substitute(data : playerArray){

    const {selectPlayer, setSelectPlayer} = useContext(SelectPlayerContext);

    return (
        <View style={styles.container}> 
            {data.data.map((item)=>{
                    return <SubPlayer {...item} key={item.id}/>
                }
                )}
        </View>
    )
}


const styles = StyleSheet.create({
    container : {
        width:'98%',
        backgroundColor:'#7CB7FF',
        height:'15%',
        borderColor:'#000000',
        borderWidth:0,
        borderTopLeftRadius : 10,
        borderTopRightRadius: 10,
        marginHorizontal : '1%',
        flex : 1,
        flexDirection : 'row',
        justifyContent: 'space-around',
        padding : 6
    },
    containerSub : {
        width:'98%',
        backgroundColor:'#7CB7FF',
        height:'15%',
        borderColor:'#000000',
        borderWidth:0,
        borderTopLeftRadius : 10,
        borderTopRightRadius: 10,
        marginHorizontal : '1%',
        flex : 1,
        flexDirection : 'row',
        justifyContent: 'space-around',
        padding : 6
    }
})