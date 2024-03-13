import paypal from 'paypal-rest-sdk';
import { NextResponse, NextRequest } from "next/server";

paypal.configure({
    'mode': "sandbox", //sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

export default async function handler(req, res) {

    const { amount, productInfo, email } = req.body

    return res.redirect("http://localhost:3000/channels")
    return NextResponse.json(finalDataArray_Arrar, {
        status: 200,
    });


    try {

        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": `${process.env.FRONTEND_URL}api/paypal/success`,
                "cancel_url": `${process.env.FRONTEND_URL}api/paypal/cancel`
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Chutlunds Premiom Access",
                        "sku": "001",
                        "price": "5.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "5.00"
                },
                "description": "Chutlunds Premiom Access"
            }]
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.redirect(payment.links[i].href);
                    }
                }
            }
        });

    } catch (error) {
        console.log(error.message);
    }


}