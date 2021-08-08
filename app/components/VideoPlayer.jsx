import React, { useState, useEffect, useRef } from 'react'
import { TouchableOpacity } from 'react-native'
import { Video } from 'expo-av'
import styles from './../assets/stylesheets/videoPlayer';
import View from './View';
import Ionicon from 'react-native-vector-icons/Ionicons';

const VideoPlayer = ({ videoPath = '', posterPath = '', shouldPlay = true, shouldShowPoster = false }) => 
{
    const video = useRef(null)
    const [ status, setStatus ] = useState({});
    const [ shouldPlayVideo, setShouldPlayVideo ] = useState(shouldPlay);
    const [ usePoster, setUsePoster ] = useState(shouldShowPoster);
    
    const handleUpdateStatus = (status) => {
        setStatus(() => status);

        if (! status.isPlaying) {
            setUsePoster(true);
            setShouldPlayVideo(false);
        }
    }

    const handlePressPlayBtn = async () => {
        setUsePoster(false);
        setShouldPlayVideo(true);
        await video.current.playAsync();
    }

    const onChangeSourceRestartVideo = async () => 
    {
        await video?.current?.unloadAsync();
        await video?.current?.loadAsync({ uri: videoPath }, {}, false);
    } 

    useEffect(() => {
        if (!video) return;
        onChangeSourceRestartVideo();

        return () => {
            setStatus({});
            setUsePoster(false);
            video.current = null;
            setShouldPlayVideo(false);
        }
    }, [videoPath]);

    if (! shouldShowPoster) {
        return (
            <Video 
                ref={ video }
                style={ styles.video }
                source={{
                    uri: videoPath
                }}
                usePoster={ usePoster }
                posterSource={{ uri: posterPath }}
                posterStyle={ styles.poster }
                useNativeControls
                resizeMode='contain'
                onPlaybackStatusUpdate={ handleUpdateStatus }
                shouldPlay={ shouldPlayVideo }
            />
        )
    }

    return (
        <View>
            <Video 
                ref={ video }
                style={ styles.video }
                source={{
                    uri: videoPath
                }}
                usePoster={ usePoster }
                posterSource={{ uri: posterPath }}
                posterStyle={ styles.poster }
                useNativeControls
                resizeMode='contain'
                onPlaybackStatusUpdate={ handleUpdateStatus }
                shouldPlay={ shouldPlayVideo }
            />
            {
                !shouldPlayVideo && (
                    <TouchableOpacity onPress={ handlePressPlayBtn } style={ styles.playIcon }>
                        <Ionicon 
                            name='play-circle-outline'
                            size={ 70 }
                            color='#fff'
                        />
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export default VideoPlayer
