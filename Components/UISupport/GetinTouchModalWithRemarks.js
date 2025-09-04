import React, { useEffect, useState } from 'react';
import { ScrollView, Modal, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
import Colors from '../../Constants/Colors';
import IoIcon from '../Icon/IoIcon';
import MaIcon from '../../Components/Icon/MaIcon';
import AuthButton from './AuthButton';
import Icon from 'react-native-vector-icons/Entypo';
import BackHeader from './BackHeader';
import { BaseURL } from '../../Constants/BaseUrl';
const GetinTouchModalWithRemarks = props => {

  const [remarks, setremarks] = useState([]);
  const [newremarks, setnewremarks] = useState("");
  const [loader1, setloader1] = useState(false);
  const [loader2, setloader2] = useState(false);

  useEffect(() => {
    console.log(props.id)


    if (props.id != 0 && props.id != undefined) {
      setloader1(true)
      getremarks()

    }


  }, [props.id]);

  function getremarks() {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${props.token}`,
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `${BaseURL}/api/v1/vendor/GetInTouch/${props.id}/Remarks`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result.status === 'success') {
          console.log(result)
          setremarks(result.remarks)
          setloader1(false)
        } else {
          setloader1(false)
        }
      })
      .catch(error => {
        setloader1(false)
        console.log('error', error)
      });
  }

  function addremarks() {
    setloader2(true)
    console.log(newremarks)
    var myHeaders = new Headers();
    myHeaders.append(

      'Authorization',
      `Bearer ${props.token}`,
    );

    myHeaders.append('Content-Type', 'application/json');
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify({
        "Remarks": newremarks
      }),
    };

    fetch(
      `${BaseURL}/api/v1/vendor/GetInTouch/${props.id}/Remarks`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result.status === 'success') {
          console.log(result)
          setloader2(false)
          setnewremarks("")
          getremarks()
        } else {
          //   setLoader(false);
          setloader2(false)
          setnewremarks("")
          console.log(result)
        }
      })
      .catch(error => console.log('error', error));
  }

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={props.visible}>
        <KeyboardAvoidingView
          style={{ height: "100%", width: "100%" }}
          behavior={Platform.OS === 'ios' ? "position" : ''}>
          <SafeAreaView
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: "#F1F3F5",
              justifyContent: 'center',
              alignItems: 'center',


            }}>
            <BackHeader
              title="REMARKS HISTORY"
              onPress={props.onCross}
            />

            <ScrollView

              contentContainerStyle={{

                width: '100%', paddingHorizontal: "5%",

              }}
              style={{
                width: '100%'
              }}
            >



              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#191919',
                  textAlign: 'left',

                  marginBottom: 5,

                }}>
                Description
              </Text>
              <View style={{ width: '100%' }}>
                {props.id != undefined && props.id != 0 &&
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#19191966',
                      textAlign: 'justify',
                    }}>
                    {props?.description.trim()}

                  </Text>}
              </View>
              {loader1 == true ?
                <View
                  style={{
                    flex: 1,

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size="large" color={Colors.blue} />
                </View> :
                remarks.length > 0 &&
                <>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 5 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#191919',
                        textAlign: 'left',

                        marginTop: 5,

                      }}>
                      Remarks
                    </Text>
                    <TouchableOpacity onPress={() => {
                      setloader1(true)
                      getremarks()
                    }}>
                      <IoIcon name="refresh" color={"grey"} size={20} />
                    </TouchableOpacity>
                  </View>
                  {remarks.map((item, index) => {
                    return (
                      <View style={{ width: '100%', paddingVertical: 5, }}>

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: 'black',
                              textAlign: 'justify',
                            }}>
                            {item?.name}
                            {/* {item?.remarks}
                {item?.createdOn} */}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#19191966',
                              textAlign: 'justify',
                            }}>

                            {item?.createdOn}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#19191966',
                            textAlign: 'justify',
                          }}>
                          {item?.remarks.trim()}
                        </Text>

                        {/* {"createdOn": "21 Nov 2022", "id": 38, "name": "Muhammad Faizan", "remarks": "Test 4
"} */}
                      </View>
                    );
                  })}
                </>}


            </ScrollView>

            <View style={{ paddingHorizontal: 20, width: "100%" }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#191919',
                  textAlign: 'left',
                  borderBottomColor: 'lightgray',
                  borderBottomWidth: 0.5,
                  marginVertical: 5,

                }}>
                Remarks
              </Text>
              <TextInput
                multiline
                value={newremarks}
                onChangeText={text => setnewremarks(text)}
                placeholder={'Enter Remarks'}
                style={styles.specialinstructionstextstyle}
              />

              {loader2 == true ?
                <View
                  style={{ paddingHorizontal: 5, height: 35, justifyContent: "center", alignSelf: "flex-start", marginTop: 5, alignItems: "center", }}>
                  <ActivityIndicator size="small" color={Colors.blue} />
                </View> :
                <TouchableOpacity
                  disabled={newremarks.length > 0 ? false : true}
                  onPress={() => { addremarks() }}
                  style={{ width: "100%", height: 45, backgroundColor: newremarks.length > 0 ? '#0989B8' : "grey", justifyContent: "center", borderRadius: 5, marginVertical: 5, alignItems: "center" }}>
                  <Text style={{ color: "white", fontWeight: 'bold', }}>SUBMIT</Text>
                </TouchableOpacity>}
            </View>


          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: "#F1F3F5"
  },
  modalView: {
    margin: 20,
    backgroundColor: "#F1F3F5",
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  specialinstructionstextstyle: {
    // ...styleSheet.shadow,
    borderWidth: 1,
    borderColor: 'rgba(128, 128,128, 0.6)',
    width: '100%',
    height: 100,
    fontSize: 15,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 5,
    paddingHorizontal: '5%',

    textAlignVertical: 'top',
  },
});

export default GetinTouchModalWithRemarks;
