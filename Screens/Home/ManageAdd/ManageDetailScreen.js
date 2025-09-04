import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import BackHeader from '../../../Components/UISupport/BackHeader';
import Colors from '../../../Constants/Colors';
import MaIcon from '../../../Components/Icon/MaIcon';
import AuthButton from '../../../Components/UISupport/AuthButton';
import { FontFamily } from '../../../Assets/Fonts';
const ManageDetailScreen = props => {
  const data = props.route.params.data;
  const type = props.route.params.type;
  const rent = props.route.params.rent;
  const remarks = data.remarks;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgGray }}>
      <BackHeader
        title="Remarks History"
        onPress={() => props.navigation.goBack()}
      />
      <View
        style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() =>
            // console.log("ee" + JSON.stringify(data))
            props.navigation.navigate('postAdd3', {
              data: data,
              type: type,
              rent: rent,
              update: true,
            })
          }
          style={Styles.tileContainer}>
          <View
            style={{
              height: '100%',
              width: '25%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Image
              source={{
                uri: data.thumbnail
                  ? data.thumbnail
                  : 'https://www.freeiconspng.com/thumbs/building-icon/office-building-icon-32.png',
              }}
              style={{
                height: 70,
                width: 70,
                resizeMode: 'center',
                borderRadius: 5,
              }}
            />
            {/* <Image
                            source={{ uri: data?.thumbnail ? data?.thumbnail : "https://static.vecteezy.com/system/resources/thumbnails/003/694/243/small/car-icon-in-flat-style-simple-traffic-icon-free-vector.jpg" }}
                            style={{ height: 70, width: 60, resizeMode: "contain", borderRadius: 10 }}
                        /> */}
          </View>

          <View
            style={{
              height: '100%',
              width: '55%',
              justifyContent: 'center',
              paddingLeft: 15,
            }}>
            <Text
              style={{
                fontFamily: FontFamily.Medium,
                fontSize: 12,
                color:
                  data.approvalStatus === 3
                    ? Colors.blue
                    : data.approvalStatus === 1
                      ? 'oranges'
                      : data.approvalStatus === 2
                        ? 'orange'
                        : 'red',
              }}>
              {data.approvalStatus === 3
                ? 'APPROVED'
                : data.approvalStatus === 1
                  ? 'NEW'
                  : data.approvalStatus === 2
                    ? 'PENDING APPROVAL'
                    : 'REJECTED'}
            </Text>
            <Text
              style={{ fontSize: 15, color: Colors.black, fontFamily: FontFamily.Bold }}>
              {data.name ? data.name : data.title}
            </Text>
            <Text style={{ fontSize: 10, color: 'gray', }}>
              {data?.licensePlate}
            </Text>
          </View>

          <View
            style={{
              height: '100%',
              width: '25%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaIcon name="pencil" color={Colors.blue} size={20} />
          </View>
        </TouchableOpacity>

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{ width: '90%', marginVertical: 20 }}>
            <Text
              style={{ color: Colors.black, fontSize: 15, fontFamily: FontFamily.Bold }}>
              Admin Remarks
            </Text>
            <View style={{ width: '100%' }}>
              <FlatList
                data={remarks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={itemData => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('postAdd3', {
                          data: data,
                          type: type,

                          rent: rent,
                        })
                      }
                      style={{
                        width: '100%',
                        marginVertical: 5,
                        borderBottomColor: 'lightgray',
                        borderBottomWidth: 0.5,
                        paddingVertical: 10,
                      }}>
                      <Text style={{ fontSize: 12, color: 'gray' }}>
                        {itemData.item.date.slice(0, 11)}
                      </Text>
                      <View style={{ marginVertical: 5 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: Colors.black,
                          }}>
                          {itemData.item.comment}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            <View style={{ marginTop: 10 }}>
              {data.approvalStatus !== 2 && data.approvalStatus !== 3 ? (
                <AuthButton
                  onPress={() =>
                    props.navigation.navigate('postAdd3', {
                      data: data,
                      type: type,
                      rent: rent,
                      update: true,
                    })
                  }
                  title="EDIT"
                />
              ) : null}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  tileContainer: {
    height: 80,
    width: '90%',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  hr: {
    fontWeight: 'bold',
    color: 'red',
  },
});
export default ManageDetailScreen;
