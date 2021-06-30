import React, { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import View from './../../../../components/View';
import Text from './../../../../components/Text';
import { Tab } from 'react-native-elements';
import styles from './../../../../assets/stylesheets/movieDetail';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { createStructuredSelector } from 'reselect';
import { ratedShowsSelector, myListSelector, authProfileSelector } from './../../../../redux/modules/auth/selectors';
import { connect } from 'react-redux';

const ACTION_TYPES = {
    ADD_TO_MY_LIST: 'ADD TO MY LIST',
    ADD_TO_LIKED_SHOWS: 'ADD TO LIKED SHOWS',
    SHARE_SHOW: 'SHARE SHOW'
}

const TabIcon = ({ actionName, data, showID, isLoading }) => 
{
    switch (actionName) 
    {
        case ACTION_TYPES.ADD_TO_MY_LIST:

            if (isLoading) {
                return <ActivityIndicator color='#fff' />
            } 
        
            return (
                <MaterialCommunityIcon 
                    name={ !data.find(({ id }) => id === showID) ? 'plus' : 'check' }
                    size={ 30 }
                    color='white'
                />
            )

        case ACTION_TYPES.ADD_TO_LIKED_SHOWS:

            if (isLoading) {
                return <ActivityIndicator color='#fff' />
            } 

            return (
                <FontAwesome5 
                    name='thumbs-up'
                    size={ 30 }
                    color='white'
                    solid={ data.find(({ id }) => id === showID)?.isRated }
                />
            )

        case ACTION_TYPES.SHARE_SHOW:

            if (isLoading) {
                return <ActivityIndicator color='#fff' />
            } 

            return (
                <FeatherIcon 
                    name='share-2'
                    size={ 30 }
                    color='white'
                />
            )
    }
}

const ActionButton = ({ 
    AUTH_PROFILE, 
    LIKED_SHOWS, 
    selectedTab, 
    selectedShowID, 
    isLoadingAddToMyList, 
    handlePressTabAddToLIst, 
    isLoadingLikedShows, 
    handlePressTabLikeShow, 
    handlePressTabShare,
    disableIndicator = false 
}) => 
{

    const myListIcon = () => {
        return (
            isLoadingAddToMyList 
                ? <ActivityIndicator color='#fff' />
                : (
                    <TabIcon 
                        actionName={ ACTION_TYPES.ADD_TO_MY_LIST } 
                        data={ AUTH_PROFILE.my_list } 
                        showID={ selectedShowID }
                    />
                )
        )
    }

    const likeShowIcon = () => {
        return (
            isLoadingLikedShows 
                ? <ActivityIndicator color='#fff' />
                : (
                    <TabIcon 
                        actionName={ ACTION_TYPES.ADD_TO_LIKED_SHOWS } 
                        data={ AUTH_PROFILE.liked_shows } 
                        showID={ selectedShowID }
                    /> 
                )
        )
    }

    return (
        <View style={ styles.tabsContainer }>
            <Tab value={ selectedTab } indicatorStyle={ styles.tabIndicator } disableIndicator={ disableIndicator }>
                <Tab.Item 
                    title='My List' 
                    icon={ myListIcon() }
                    titleStyle={ styles.tabItemTitle  }
                    containerStyle={ styles.tabItemContainer }
                    onPressIn={ handlePressTabAddToLIst }
                />
                <Tab.Item 
                    title='Like' 
                    icon={ likeShowIcon() }
                    titleStyle={ styles.tabItemTitle }
                    containerStyle={ styles.tabItemContainer }
                    onPressIn={ handlePressTabLikeShow }
                />
                <Tab.Item 
                    title='Share' 
                    icon={ 
                        <TabIcon 
                            actionName={ ACTION_TYPES.SHARE_SHOW }
                            showID={ selectedShowID }
                        /> 
                    }
                    titleStyle={ styles.tabItemTitle }
                    containerStyle={ styles.tabItemContainer }
                    onPressIn={ handlePressTabShare }
                />
            </Tab>
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH_PROFILE: authProfileSelector,
    MY_LIST: myListSelector,
    LIKED_SHOWS: ratedShowsSelector
});

export default connect(mapStateToProps)(ActionButton)
