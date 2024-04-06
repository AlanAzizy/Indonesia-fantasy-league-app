import { View, StyleSheet } from "react-native"
import Player from "./Player"
import player from "@/interfaces/player"
import { useContext, useEffect, useState } from "react"
import { LineUpContext } from "@/app/Context/LineUpContext"


export default function PlayerWrap(){

    
    const {line_up, setLine_up} = useContext(LineUpContext);

    const [lineUpFromContext, setLineUpFromContext] = useState(line_up);

    useEffect(() => {
        setLineUpFromContext(line_up);
         // Update state when context changes
    }, [line_up]);

    return (
        <View style={styles.container}>
            <View style={styles.forwardStyle}>
                {lineUpFromContext.filter((item)=>item.position=='FWD').map((item)=>
                    <Player {...item} key={item.id}/>
                )}
            </View>
            <View style={styles.midFieldStyle}>
                {lineUpFromContext.filter((item)=>item.position=='MDF').map((item)=>
                    <Player {...item} key={item.id}/>
                )}
            </View>
            <View style={styles.defenderStyle}>
                {lineUpFromContext.filter((item)=>item.position=='DEF').map((item)=>
                    <Player {...item} key={item.id}/>
                )}
            </View>
            <View style={styles.goalkeeperStyle}>
                {lineUpFromContext.filter((item)=>item.position=='GK').map((item)=>
                    <Player {...item} key={item.id}/>
                )}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container : {
        position:'absolute', 
        flex:1, flexWrap:'wrap', 
        alignItems: 'center',
        borderColor:'#f0ff00', 
        borderWidth:0, 
        width:'90%', 
        height:500, 
        left:'5%', 
        right:'5%'
    },
    forwardStyle: {
        position:'absolute', 
        flex:1, 
        flexDirection:'row', 
        justifyContent:'space-evenly', 
        flexGrow:0 , 
        alignItems:'center', 
        borderColor:'#ff00ff', 
        borderWidth:0, 
        top:'5%', 
        width:'90%',
        height : '20%'
    },
    midFieldStyle: {
        position:'absolute', 
        flex:1, 
        flexDirection:'row', 
        justifyContent:'space-evenly', 
        flexGrow:0 , 
        alignItems:'center', 
        borderColor:'#ff00ff', 
        borderWidth:0, 
        top:'30%', 
        width:'90%',
        height : '20%'
    },
    defenderStyle: {
        position:'absolute', 
        flex:1, 
        flexDirection:'row', 
        justifyContent:'space-evenly', 
        flexGrow:0 , 
        alignItems:'center', 
        borderColor:'#ff00ff', 
        borderWidth:0, 
        top:'55%', 
        width:'90%',
        height : '20%'
    },
    goalkeeperStyle: {
        position:'absolute', 
        flex:1, 
        flexDirection:'row', 
        justifyContent:'space-evenly', 
        flexGrow:0 , 
        alignItems:'center', 
        borderColor:'#ff00ff', 
        borderWidth:0, 
        top:'80%', 
        width:'90%',
        height : '20%'
    }
})