import {
    MFCurrencyISO,
    MFCustomerAddress,
    MFExecutePaymentRequest,
    MFInitiatePayment,
    MFLanguage,
    MFMobileCountryCodeISO,
    MFPaymentRequest,
} from 'myfatoorah-reactnative';

// import { useSelector } from "react-redux"

const PAYMENT_METHOD_CODE = 'uaecc';

const initiatePayments = amount => {

    return new Promise((res, rej) => {
        let initiateRequest = new MFInitiatePayment(amount, MFCurrencyISO.UAE_AED);
     
        MFPaymentRequest.sharedInstance.initiatePayment(
            initiateRequest,
            MFLanguage.ENGLISH,
            response => {
               
                if (response.getError()) {
                    rej(response.getError().error);
                
                    //   alert('error: ' + response.getError().error);
                } else {
                    let index = response
                        .getPaymentMethods()
                        .findIndex(a => a.PaymentMethodCode === PAYMENT_METHOD_CODE);
                 
                    res(response.getPaymentMethods()[index].PaymentMethodId);
                    // setPaymentMethods(response.getPaymentMethods())
                }
            },
        );
    });
};

const buildRequestJson = async (amount, selectedPaymentMethod, config) => {
    // const userInfo = useSelector((state) => state.auth.userInfo)
    // console.log(userInfo)
 
    let request = new MFExecutePaymentRequest(
        parseFloat(amount),
        selectedPaymentMethod,
    );
    // let customer = store.getState().auth;

    request.customerEmail = config.email; // must be email
    request.customerName = config.name; // must be a name
    request.customerMobile = config.contact.slice(3, config.contact.length);
    request.customerCivilId = '';
    let address = new MFCustomerAddress(null, null, null, config.address, null);
    request.customerAddress = address;
    request.customerReference = '';
    request.language = 'en';

    //change it to UAE on LIVEs
    request.mobileCountryCode = MFMobileCountryCodeISO.UAE;
    request.displayCurrencyIso = MFCurrencyISO.UAE_AED;
    // var productList = []
    // var product = new MFProduct("ABC", 1.887, 1)
    // productList.push(product)
    // request.invoiceItems = productList
   
    return request;
};

export const handlePayment = async (
    totalPrice,
    order,
    config,
    navigation,
    confirmPay,
) => {
 
    let paymentMethodId = await initiatePayments(parseFloat(totalPrice));

 
    let request = await buildRequestJson(
        parseFloat(totalPrice),
        paymentMethodId,
        config,
    );
  

    MFPaymentRequest.sharedInstance.executePayment(
        navigation,
        request,
        MFLanguage.ENGLISH,
        response => {
            if (response.getError()) {
              
                // store.dispatch.causeError({
                //   text: 'Failed to process payment.\nPlease Try Again',
                // });
                alert("Failed to process payment.\nPlease Try Again")
                // errorHandler({
                //     message: 'Failed to process payment.\nPlease Try Again',
                // });
            } else {
                var invoiceId = response.getInvoiceId();
           
                // console.log('PAYMETN ID', paymentStatusResponse.PaymentId);

                // paidOrder(order.orderId, order.orderNo, invoiceId);
                if (order?.isSplit) {
                    confirmPay(
                        order.splitPaymentId,
                        order.contributionId,
                        invoiceId,
                        order.isFacility,
                    );
                } else {
                    confirmPay(order.orderId, order.orderNo, invoiceId);
                }

                // alert(
                //   'success with Invoice Id: ' +
                //     invoiceId +
                //     ', Invoice status: ' +
                //     paymentStatusResponse.InvoiceStatus,
                // );
            }
        },
    );
    // await configureSDK({shouldShowOrderAmount: true});
    // try {
    //   const resp = await initiateCardPayment(orderResponse);
    //   console.log(resp);
    // paidOrder(data.id, data.orderNo);
    // } catch (err) {
    //   store.dispatch(causeError('Something went wrong. Please try again'));
    //   console.log({err});
    // }
};