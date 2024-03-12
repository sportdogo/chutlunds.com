import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import videosContext from '../context/videos/videosContext';
import {
    XCircleIcon
} from '@heroicons/react/solid';


const ModalMembership = () => {



    const [card_paypal, setcard_paypal] = useState("card");
    const [nameOnCard, setnameOnCard] = useState("");
    const [cardnumber, setcardnumber] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const [cvv, setcvv] = useState("");

    const [beatLoader, setbeatLoader] = useState(false);


    const { paymentModalVisible, setpaymentModalVisible } = useContext(videosContext);

    const radioBtn = (type) => {
        setcard_paypal(type);
    }

    const handleCardNumber = (e) => {
        const inputVal = e.target.value.replace(/ /g, ""); //remove all the empty spaces in the input
        let inputNumbersOnly = inputVal.replace(/\D/g, ""); // Get only digits

        if (inputNumbersOnly.length > 16) {
            //If entered value has a length greater than 16 then take only the first 16 digits
            inputNumbersOnly = inputNumbersOnly.substr(0, 16);
        }

        // Get nd array of 4 digits per an element EX: ["4242", "4242", ...]
        const splits = inputNumbersOnly.match(/.{1,4}/g);

        let spacedNumber = "";
        if (splits) {
            spacedNumber = splits.join(" "); // Join all the splits with an empty space
        }

        setcardnumber(spacedNumber); // Set the new CC number
    };

    const handlerCvv = (e) => {
        const inputVal = e.target.value.replace(/ /g, ""); //remove all the empty spaces in the input
        let inputNumbersOnly = inputVal.replace(/\D/g, ""); // Get only digits

        if (inputNumbersOnly.length > 3) {
            //If entered value has a length greater than 16 then take only the first 16 digits
            inputNumbersOnly = inputNumbersOnly.substr(0, 3);
        }


        setcvv(inputNumbersOnly); // Set the new CC number
    };


    const confirmClick = async () => {
        setbeatLoader(true)

        try {
            //first upload art image file and get url
            let art_url = ''
            const response = await uploadSingleImage(uploadedArts[0], 'art')
            if (response.sucess) {
                art_url = response.data.imageURL
            } else {
                toast.info(response.message)
                return
            }

            //Upload colors urls
            let colorsData = []

            for (let index = 0; index < selectedTshirtsForUpload.length; index++) {

                let imageDataArray = [] //Front and back
                const tshirtData = colours.filter(obj => {
                    if (selectedTshirtsForUpload[index].name === obj.name) {
                        return obj
                    }
                })
                if (selectedTshirtsForUpload[index].side === 'FRONT') {
                    imageDataArray.push(tshirtData[0].backURL)
                } else {
                    imageDataArray.push(tshirtData[0].frontURL)
                }



                const response = await uploadImageBase64(selectedTshirtsForUpload[index].imageData, selectedTshirtsForUpload[index].name)
                if (response.sucess) {


                    colorsData.push({ name: selectedTshirtsForUpload[index].name, imageUrl: [response.data.imageURL, ...imageDataArray] })
                } else {
                    toast.info(response.message)
                    return
                }

            }


            const data = { productName: publishData.productName, discountPrice: publishData.discountPrice, mrp: publishData.mrp, productDescription: publishData.productDescription, category: categorySelected, artUrl: art_url, size: ["S", "M", "L", "XL"], color: colorsData, creatorName: Cookies.get('name'), publishStatus: false }


            const response2 = await publishTshirtsDesign(data)
            if (response2.sucess) {
                setbeatLoader(false)
                toast.info('T-Shirts Published')
            } else {
                toast.info(response2.message)
                setbeatLoader(false)
                return
            }



        } catch (error) {
            toast.info(error)
            setbeatLoader(false)
            return
        }

        setpaymentModalVisible(!paymentModalVisible);

    }

    return (
        <div className={` select-none fixed flex justify-center items-center inset-0 z-30  ${paymentModalVisible ? "" : "invisible"}`}>

            <div className={`bg-white w-4/5 lg:w-2/4 2xl:w-1/4 p-[20px] rounded-xl shadow-md `}>

                <div className="w-full pt-1 pb-5">
                    <div className="bg-theme text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                        <i className="mdi mdi-credit-card-outline text-3xl"></i>
                    </div>
                </div>

                <div className="mb-10">
                    <h1 className="text-center font-bold text-xl uppercase">Secure payment info</h1>
                </div>

                <div className="flex items-center justify-start mb-5">
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            className="form-radio h-6 w-6 text-theme"
                            checked={card_paypal === 'card'}
                            onChange={() => radioBtn('card')}
                        />
                        <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="h-8 ml-3" />
                    </label>
                    <label className="inline-flex items-center ml-6">
                        <input
                            type="radio"
                            className="form-radio h-6 w-6 text-theme"
                            checked={card_paypal === 'paypal'}
                            onChange={() => radioBtn('paypal')}
                        />
                        <img src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png" className="h-[45px] ml-3" />
                    </label>
                </div>


                <div className={`${card_paypal === "card" ? "" : "opacity-50 pointer-events-none"}`}>

                    <div className={`mb-3 `}>
                        <label className="font-bold text-sm mb-2 ml-1">Name on card</label>
                        <div>
                            <input value={nameOnCard} onChange={(e) => { setnameOnCard(e.target.value) }} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John Smith" type="text" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="font-bold text-sm mb-2 ml-1">Card number</label>
                        <div>
                            <input value={cardnumber}
                                onChange={handleCardNumber} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="0000 0000 0000 0000" type="text"  inputMode="numeric"  />
                        </div>
                    </div>
                    <div className="mb-3 -mx-2 flex items-end">
                        <div className="px-2 w-1/2">
                            <label className="font-bold text-sm mb-2 ml-1">Expiration date</label>
                            <div>
                                <select value={month} onChange={e => setMonth(e.target.value)} className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                                    <option value="01">01 - January</option>
                                    <option value="02">02 - February</option>
                                    <option value="03">03 - March</option>
                                    <option value="04">04 - April</option>
                                    <option value="05">05 - May</option>
                                    <option value="06">06 - June</option>
                                    <option value="07">07 - July</option>
                                    <option value="08">08 - August</option>
                                    <option value="09">09 - September</option>
                                    <option value="10">10 - October</option>
                                    <option value="11">11 - November</option>
                                    <option value="12">12 - December</option>
                                </select>
                            </div>
                        </div>
                        <div className="px-2 w-1/2">
                            <select value={year} onChange={e => setYear(e.target.value)} className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2029">2030</option>
                                <option value="2029">2031</option>
                                <option value="2029">2032</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-10">
                        <label className="font-bold text-sm mb-2 ml-1">CVV</label>
                        <div>
                            <input value={cvv} onChange={handlerCvv} className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="000" type="number" />
                        </div>
                    </div>

                </div>

                <div>
                    <button className="block w-full max-w-xs mx-auto bg-theme hover:bg-indigo-900 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"><i className="mdi mdi-lock-outline mr-1"></i> PAY NOW  ($2.99)</button>
                </div>

                <div>
                    <button onClick={() => setpaymentModalVisible(false)} className="block w-full max-w-xs mx-auto  items-center text-theme underline rounded-lg px-3 py-3 font-semibold"> Cancel</button>
                </div>
            </div>




        </div>


    )
};
export default ModalMembership;