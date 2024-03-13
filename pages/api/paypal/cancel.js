
import paypal from 'paypal-rest-sdk';

paypal.configure({
    'mode': "sandbox", //sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

export default async function handler(req, res) {

    try {

        res.render('cancel');

    } catch (error) {
        console.log(error.message);
    }

}