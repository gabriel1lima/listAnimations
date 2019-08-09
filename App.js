import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  Animated,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const translateX = new Animated.Value(0);

const animatedEvent = Animated.event(
  [
    {
      nativeEvent: {
        translationX: translateX,
      },
    },
  ],
  { useNativeDriver: true },
);

export default class App extends Component {
  state = {
    list: [
      {
        title: 'Design Furniture',
        img: require('./src/assets/img/cadeira.png'),
        titleDescription: 'Designer armchair',
        description: 'Lorem ipsum interdum vitae aliquet porttitor ullamcorper venenatis, risus facilisis potenti pulvinar facilisis varius quis condimentum'
      },
      {
        title: 'Basketball',
        img: require('./src/assets/img/basketball.jpg'),
        titleDescription: 'Spalnding',
        description: 'Lorem ipsum interdum vitae aliquet porttitor ullamcorper venenatis, risus facilisis potenti pulvinar facilisis varius quis condimentum'
      },
      {
        title: 'Fabric Backpack',
        img: require('./src/assets/img/bolsa.png'),
        titleDescription: 'Backpack',
        description: 'Lorem ipsum interdum vitae aliquet porttitor ullamcorper venenatis, risus facilisis potenti pulvinar facilisis varius quis condimentum'
      },
      {
        title: 'Black Running Shoe',
        img: require('./src/assets/img/tenis-black.png'),
        titleDescription: 'Cloudstratus',
        description: 'Lorem ipsum interdum vitae aliquet porttitor ullamcorper venenatis, risus facilisis potenti pulvinar facilisis varius quis condimentum'
      },
      {
        title: 'Running Shoe',
        img: require('./src/assets/img/tenis-black2.png'),
        titleDescription: 'Swiss Engineering',
        description: 'Lorem ipsum interdum vitae aliquet porttitor ullamcorper venenatis, risus facilisis potenti pulvinar facilisis varius quis condimentum'
      },
      {
        title: 'Tennis Racquet',
        img: require('./src/assets/img/racquet.png'),
        titleDescription: 'Racquet',
        description: 'Lorem ipsum interdum vitae aliquet porttitor ullamcorper venenatis, risus facilisis potenti pulvinar facilisis varius quis condimentum'
      },
      {
        title: 'Racquetball',
        img: require('./src/assets/img/racquet-ball.png'),
        titleDescription: 'Ball',
        description: 'Lorem ipsum interdum vitae aliquet porttitor ullamcorper venenatis, risus facilisis potenti pulvinar facilisis varius quis condimentum'
      },
      
    ],
    current: 0,
  }

  fadeOutUp_Title() {
    this.title.fadeOutUp(500)
      .then(
        res => {
          this.title.fadeInUp(500);
        }
      );
  }

  fadeOutLeftBig_Image() {
    this.image.fadeOutLeftBig(500)
      .then(
        res => {
          this.setState({ current: this.state.current + 1 });
          this.image.zoomIn(500);
        }
      );
  }
  


  fadeOutDown_TitleDescrption() {
    this.titleDescription.fadeOutDown(500)
      .then(
        res => { 
          this.titleDescription.fadeInUp(500);
        }
      );
  }

  fadeOutDown_Descrption() {
    this.description.fadeOutDown(500)
      .then(
        res => { 
          this.description.fadeInUp(500);
        }
      );
  }



  fadeOutDown_Title() {
    this.title.fadeOutDown(500)
      .then(
        res => { 
          this.title.fadeInDown(500);
        }
      );
  }

  zoomOutImage() {
    this.image.zoomOut(500)
      .then(
        res => { 
          this.setState({ current: this.state.current - 1 });
          this.image.fadeInLeftBig(500);
        }
      );
  }



  fadeOut_Footer() {
    this.footer.fadeOut(1000)
      .then(
        res => { 
          this.footer.fadeIn(1000);
        }
      );
  }


  onHandlerStateChanged(event) {

    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX } = event.nativeEvent;

      if(translationX < 0.00 && Math.abs(translationX) > 20.00) {
        if(this.state.list.length - 1 > this.state.current ) {
          this.fadeOutUp_Title();
          this.fadeOutLeftBig_Image();
          this.fadeOutDown_TitleDescrption();
          this.fadeOutDown_Descrption();
          this.fadeOut_Footer();
        }
      } else if(Math.abs(translationX) > 20.00) {
        if(this.state.current > 0 ) {
          this.fadeOutDown_Title();
          this.zoomOutImage();
          this.fadeOutDown_TitleDescrption();
          this.fadeOutDown_Descrption();
          this.fadeOut_Footer();
        }
      }

    }
  }

  render(){
    const { list, current } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ backgroundColor: '#f5f5f5', width: '100%', height: '50%', position: 'absolute' }}></View>
        
        {/* Header */}
        <View style={{ marginTop: 45, marginLeft: 30, overflow: 'hidden' }}>
          <Animatable.Text useNativeDriver ref={ref => this.title = ref} style={{ color: '#443e39', fontSize: 22, fontFamily: 'Montserrat-Regular' }}>{ list[current].title }</Animatable.Text>
        </View>
  
        {/* Content */}
        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={(event) => this.onHandlerStateChanged(event)}
        >
          <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
 
            <Animatable.Image
              useNativeDriver
              ref={ref => this.image = ref}
              style={{ height: '70%', width: '80%', justifyContent: 'center', alignItems: 'center' }}
              resizeMode="contain"
              source={list[current].img}
            />
  
          </Animated.View>
        </PanGestureHandler>
  
        {/* Footer */}
        <View style={{ bottom: 0, width: '100%', position: 'relative', height: 150 }}>
          <View style={{ paddingHorizontal: 30 }}>
            <Animatable.Text useNativeDriver ref={ref => this.titleDescription = ref} style={{ color: '#443e39', fontSize: 18, fontFamily: 'Montserrat-Bold' }}>{ list[current].titleDescription }</Animatable.Text>
  
            <Animatable.Text useNativeDriver ref={ref => this.description = ref} numberOfLines={3} style={{ color: '#686661', marginTop: 6, fontFamily: 'Montserrat-Regular' }}>{ list[current].description }</Animatable.Text>
          </View>
  
          <Animatable.View useNativeDriver ref={ref => this.footer = ref} style={{ position: 'absolute', width: '100%', height: 50, bottom: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon color='rgba(104, 102, 97, 0.5)' name='heart' style={{ marginRight: 4 }} />
              <Text style={{ fontSize: 12.5,  color: '#686661', fontFamily: 'Montserrat-Regular' }}>1.5 k</Text>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon color='rgba(104, 102, 97, 0.5)' name='eye' style={{ marginRight: 4 }} />
              <Text style={{ fontSize: 12.5,  color: '#686661', fontFamily: 'Montserrat-Regular' }}>10 k</Text>
            </View>
  
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon color='rgba(104, 102, 97, 0.5)' name='share' style={{ marginRight: 4 }} />
              <Text style={{ fontSize: 12.5,  color: '#686661', fontFamily: 'Montserrat-Regular' }}>540</Text>
            </View>
  
          </Animatable.View>
  
        </View>
      </View>
    );
  }
};