import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    View,
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import db from '../config';

export default class SwipeableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allNotifications: this.props.allNotifications,
        };
    }


    updateMarkAsread = (notification) => {
        db.collection("all_notifications").doc(notification.doc_id).update({
            "notification_status": "read"
        })
    }

    renderItem = data => (
        <ListItem
            leftElement={<Icon name="bell" type="font-awesome" color='#696969' />}
            title={'  ' + data.item.itemName}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            subtitle={'  ' + data.item.message}
            bottomDivider
        />
    );

    render() {
        return (
            <View style={styles.container}>
                <SwipeListView
                    data={this.state.allNotifications}
                    renderItem={this.renderItem}
                    leftOpenValue={75}
                    previewkey={'0'}
                    disableRightSwipe={true}
                    onSwipeValueChange={this.updateMarkAsread}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});
