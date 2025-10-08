import { MFApplePayButtonView, MFApplePayStyle, MFCountry, MFCurrencyISO, MFEnvironment, MFExecutePaymentRequest, MFGetPaymentStatusRequest, MFInitiatePaymentRequest, MFKeyType, MFLanguage, MFNotificationOption, MFSDK, MFSendPaymentRequest } from 'myfatoorah-reactnative';
import { processColor } from 'react-native-reanimated';
import React from 'react'
 
export const configure = async (orderdetailslink) => {
    await MFSDK.init(orderdetailslink?.MyFatoorahKey,
   MFCountry.UNITEDARABEMIRATES,
   MFEnvironment.LIVE
    );
 
 
  };
 
  export const setUpActionBar = async () => {
    await MFSDK.setUpActionBar('Fougito Payment', processColor('#FFFFFF'), processColor('#000000'), true);
  };
 
 
  export const initiatePayment = async (orderdetailslink) => {
    let data = []
    var initiatePaymentRequest: MFInitiatePaymentRequest = new MFInitiatePaymentRequest(orderdetailslink?.TotalAmount, MFCurrencyISO.UAE_AED);
 
    await MFSDK
      .initiatePayment(initiatePaymentRequest, MFLanguage.ARABIC)
      .then((success) => {
 
        console.log("initiatePayment " + JSON.stringify(success))
       data = success?.PaymentMethods.filter(function (item) {
        return item?.PaymentMethodCode == "uaecc";
      })
      .map(function (item) {
        return item;
      })
            console.log("initiatePaymentdata " + JSON.stringify(data))
 
 
    }
        )
      .catch((error) => console.log(error));
      return data
  };
 
  export const executePayment = async (orderdetailslink,usercountrycode, userphonenumber, username, useremail, data, restrauntdetails) => {
  let mobilenumber = userphonenumber
  mobilenumber = mobilenumber.replace(usercountrycode, '')
    let status = ""
    console.log(orderdetailslink,'orderdetailslink')
    var executePaymentRequest = new MFExecutePaymentRequest(orderdetailslink?.TotalAmount);
    executePaymentRequest.PaymentMethodId = data[0]?.PaymentMethodId;
    executePaymentRequest.CustomerEmail = useremail;
    executePaymentRequest.CustomerMobile =  mobilenumber.toString();
    executePaymentRequest.CustomerReference = username;
    executePaymentRequest.DisplayCurrencyIso = MFCurrencyISO.UAE_AED;
    executePaymentRequest.UserDefinedField = orderdetailslink?.OrderNo != undefined ? orderdetailslink?.OrderNo : orderdetailslink?.MealNo
    executePaymentRequest.Suppliers =[{
      SupplierCode: orderdetailslink.SupplierCode,
      InvoiceShare: orderdetailslink.TotalAmount,
      ProposedShare: null
 
    }]
    // executePaymentRequest.SupplierCode =  orderdetailslink.SupplierCode;
    // executePaymentRequest.InvoiceShare =  orderdetailslink.TotalAmount;
 
    // executePaymentRequest.ExpiryDate = '2024-06-08T17:36:23.173';
// alert("SupplierCode " + orderdetailslink.SupplierCode)
// alert("InvoiceShare " + orderdetailslink.InvoiceShare)
    await MFSDK
      .executePayment(executePaymentRequest, MFLanguage.ARABIC, (invoiceId: string) => console.log('invoiceId: ' + invoiceId))
      .then((success) => {
        status = success
        console.log("executePayment" + JSON.stringify(success))
      })
      .catch((error) => {
        console.log(error)
        status = error
      });
 
    return status
  };
 
 
  export const sendPayment = async () => {
    var sendPaymentRequest = new MFSendPaymentRequest(10, MFNotificationOption.LINK, 'customerName');
    sendPaymentRequest.CustomerEmail = 'Test@test.com';
    sendPaymentRequest.CustomerMobile = '123456789';
    sendPaymentRequest.CustomerReference = 'Test12345';
    sendPaymentRequest.DisplayCurrencyIso = MFCurrencyISO.UAE_AED;
    sendPaymentRequest.ExpiryDate = '2023-06-08T17:36:23.132Z';
 
    await MFSDK
      .sendPayment(sendPaymentRequest, MFLanguage.ARABIC)
      .then((success) => console.log(success))
      .catch((error) => console.log(error));
 
  };
 
 
  export const getPaymentStatus = async () => {
    var getPaymentStatusRequest = new MFGetPaymentStatusRequest('1515410', MFKeyType.INVOICEID);
 
    await MFSDK
      .getPaymentStatus(getPaymentStatusRequest, MFLanguage.ARABIC)
      .then((success) => console.log(success))
      .catch((error) => console.log(error));
  };
 
 
  var applePayView: MFApplePayButtonView | null;
  const applePayStyle = () => {
    var applePayButton = new MFApplePayStyle(30, 30, 'Buy with', false);
    return applePayButton;
  };
 
  export const displayAppleButton =  () => {
    return(
 
 
      <MFApplePayButtonView ref={(ref) => (applePayView = ref)} style={{width:400, height:400}} applePayButtonStyle={applePayStyle()} />
 
    )
  }
 
 
  export const applePay = async () => {
 
    var executePaymentRequest = new MFExecutePaymentRequest(10);
    executePaymentRequest.DisplayCurrencyIso = MFCurrencyISO.UAE_AED;
    executePaymentRequest.SessionId = '';
 
    await applePayView
      ?.applePayPayment(executePaymentRequest, MFLanguage.ARABIC, (invoiceId: string) => console.log('invoiceId: ' + invoiceId))
      .then((success) => console.log("success message" + success))
      .catch((error) => console.log("error message" +error));
  };