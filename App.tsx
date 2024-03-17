import { View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import React, { useRef, useState } from 'react';
import Video from 'react-native-video';
import * as Icons from "react-native-heroicons/solid";
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';



const App = () => {

  const[clicked,setClicked]=useState(false);
  const[paused,setPaused]=useState(false);
  const[progress,setProgress]=useState(null);
  const[fullScreen, setFullScreen] = useState(false);
  const[muted,setMuted]=useState(false);
  const ref = useRef()


  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };



  return (

    <View className="flex-1">

      

      <TouchableOpacity  style={{width:"100%",height:fullScreen?"100%":200}} onPress={()=>setClicked(true)}>
      <Video
      paused={paused}
       source={require("./asstes/video.mp4")}   // Can be a URL or a local file.
       ref={ref}
       onProgress={(x)=>{
        setProgress(x)
       }
      }
      // ref={(ref) => {
      //   this.player = ref
     //  }}                                      // Store reference
      // onBuffer={this.onBuffer}  
                    // Callback when remote video is buffering
     //  onError={this.videoError}               // Callback when video cannot be loaded
        muted={muted}
        style={{width:"100%",height:fullScreen?"100%":200}}
        resizeMode="cover"/>

        {clicked && 
        <TouchableOpacity  style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,.5)'
        }}>
         <View className="flex-row space-x-16">
           <TouchableOpacity  onPress={()=>{ref.current.seek(parseInt(progress.currentTime)-5)}}>
             <Icons.BackwardIcon  color="red" fill="white" size={42}/>
           </TouchableOpacity>

           <TouchableOpacity onPress={()=>setPaused(!paused)}>
              {paused ?  <Icons.PauseIcon  color="red" fill="white" size={48}/>: <Icons.PlayIcon  color="red" fill="white" size={48}/>}
           </TouchableOpacity>


           <TouchableOpacity onPress={()=>{ref.current.seek(parseInt(progress.currentTime)+5)}}>
             <Icons.ForwardIcon  color="red" fill="white" size={42}/>
           </TouchableOpacity>              
         </View>
         <View style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 0,
                paddingLeft: 40,
                paddingRight: 40,
                paddingBottom:10,
                alignItems:'center'
              }}>

              <Text style={{color: 'white'}}>
                {format(progress.currentTime)}
              </Text>

              <Slider
             style={{width: "80%", height: 40}}
             minimumValue={0}
             maximumValue={progress.seekableDuration}
             minimumTrackTintColor="white"
              maximumTrackTintColor="white"
              onValueChange={(x)=>{
                ref.current.seek(x)}}
              />

              <Text style={{color: 'white'}}>
                {format(progress.seekableDuration)}
              </Text>
         </View>

         <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                top: 10,
                paddingLeft: 50,
                paddingRight: 50,
                alignItems:'center'
              }}>
            <TouchableOpacity onPress={()=>{
              if(fullScreen){
                  Orientation.lockToPortrait();
              } else{
               Orientation.lockToLandscape();
               }
               setFullScreen(!fullScreen)}}>
               {
                fullScreen?<Icons.ArrowsPointingInIcon  color="red" fill="white" size={30}/>: <Icons.ArrowsPointingOutIcon  color="red" fill="white" size={30}/>
               }
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setMuted(!muted)}>
             {
             muted?<Icons.SpeakerXMarkIcon color="red" fill="white" size={30}/>: <Icons.SpeakerWaveIcon color="red" fill="white" size={30}/>
             }
            </TouchableOpacity>
          </View>


        


        </TouchableOpacity>
        }
       </TouchableOpacity>

        

        
    
    </View>
  )
}

export default App;