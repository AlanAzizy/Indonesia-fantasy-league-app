import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Player from '@/components/Player';
import PlayerWrap from '@/components/PlayerWrap';
import Substitute from '@/components/Substitute';
import Data from '../../assets/Data';
import { useState, useEffect, createContext } from 'react';
import player from '../../interfaces/player';
import Modals from '../modals/Modals'
import { ModalContext } from '../Context/ModalContext';
import { SelectPlayerContext } from '../Context/SelectPlayerContext';
import { SelectSubContext } from '../Context/SelectSubContext';
import { SubContext } from '../Context/SubContext';
import { LineUpContext } from '../Context/LineUpContext';


export default function SetTeam() {

  const [line_up, setLine_up] = useState(Data.slice(0,11))
  const [subs, setSubs] = useState(Data.slice(11,15))
  const [modalShowed, setModalShowed] = useState<boolean>(false)
  const [selectPlayer, setSelectPlayer] = useState<player|null>(null)
  const [isChange, setIsChange] = useState(false);

  const closeModals = ()=>{
    setModalShowed(false);
  }

  const saveChanges = () => {
    setIsChange(false)
  }

  useEffect(()=>{
    setIsChange(true)
  },[line_up])


  return (
    <ModalContext.Provider value={{modalShowed, setModalShowed}}>
      <SelectPlayerContext.Provider value={{selectPlayer, setSelectPlayer}}>
      <SubContext.Provider value={{subs, setSubs}}>
      <LineUpContext.Provider value={{line_up, setLine_up}}>
        <View style={{flex:1}}>
            <LinearGradient style={styles.container}  colors={['#105BB7', '#FFFFFF']}>
                <View style={styles.whiteSpace}>
                    <Text style={styles.announce}>Confirm Your Squad before 30 of march</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../../assets/images/lapangan.png')}></Image>
                    <PlayerWrap data={line_up as player[]}/>
                </View>
                <Substitute data={subs as player[]}/>
                <View style={isChange ? styles.correctBubble : {display : 'none'}}>
                  <TouchableOpacity onPress={saveChanges}>
                    <Image source={require('../../assets/icons/correct.png')} style={{width: 30, height:30}}></Image>
                    <Text style={{fontSize:10, textAlign:'center'}}>Save</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.tripleBubble}>
                  <Text style={{fontSize:20, textAlign:'center'}}>3X</Text>
                  <Text style={{fontSize:7, textAlign:'center'}}>Triple Captain</Text>
                </View>
                <View style={styles._12Player}>
                <Text style={{fontSize:7, textAlign:'center'}}>12th player</Text>
                </View>
            </LinearGradient>
            <Modals/>
        </View>
        </LineUpContext.Provider>
      </SubContext.Provider>
      </SelectPlayerContext.Provider>
    </ModalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor:'#105BB7',
    opacity: 70,
    borderColor:'#ffff00',
    borderWidth:0,
    position : 'relative',
    width : '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  whiteSpace: {
    width : '100%',
    padding : 'auto',
    borderColor:'#000',
    borderWidth:0
  },
  image:{
    height:'95%',
    width:'100%',
    position:'absolute',
    top : 10,
    left:'0%'
  },
  announce : {
    fontSize:18, 
    padding:4, 
    color:'#000000', 
    textAlign:'center'
  },
  imageContainer:{
    position:'relative', 
    borderColor:'#f0ff0f', 
    borderWidth:0, 
    left:0, 
    height:'80%', 
    width:'100%', 
    backgroundColor:'transparent'
  },
  correctBubble:{
    borderRadius: 25, 
    width:50, 
    height:50, 
    position:'absolute', 
    top:'10%',
    left:'2%', 
    flex:1, 
    alignItems:'center', 
    justifyContent:'center', 
    backgroundColor:'#51F461'
  },
  cancelBubble:{
    borderRadius: 25, 
    width:50, 
    height:50, 
    position:'absolute', 
    top:'20%',
    left:'2%', 
    flex:1, 
    alignItems:'center', 
    justifyContent:'center', 
    backgroundColor:'#E54747'
  },
  tripleBubble:{
    borderRadius: 25, 
    width:50, 
    height:50, 
    position:'absolute', 
    top:'10%',
    right:'2%'
  },
  _12Player:{
    borderRadius: 25, 
    width:50, 
    height:50, 
    position:'absolute', 
    top:'20%',
    right:'2%'}
});
