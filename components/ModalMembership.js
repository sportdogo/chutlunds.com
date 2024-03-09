import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { BeatLoader } from 'react-spinners';


const ModalMembership = () => {




    const [beatLoader, setbeatLoader] = useState(false);


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

        setModalPublishVisible(!ModalPublishVisible);

    }

    return (
        <div className={`fixed flex justify-center items-center inset-0 z-30  `}>

            <div className={`bg-white w-4/5 lg:w-2/4 p-[20px] rounded-xl shadow-md `}>

                <div class="w-full pt-1 pb-5">
                    <div class="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                        <i class="mdi mdi-credit-card-outline text-3xl"></i>
                    </div>
                </div>
                <div class="mb-10">
                    <h1 class="text-center font-bold text-xl uppercase">Secure payment info</h1>
                </div>
                <div class="mb-3 flex -mx-2 items-center">
                    <div class="px-2">
                        <label for="type1" class="flex items-center cursor-pointer">
                            <input type="radio" class="form-radio h-5 w-5 text-indigo-500" name="type" id="type1" checked />
                            <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" class="h-8 ml-3" />
                        </label>
                    </div>
                    <div class="px-2">
                        <label for="type2" class="flex items-center cursor-pointer">
                            <input type="radio" class="form-radio h-5 w-5 text-indigo-500" name="type" id="type2" />
                            <img src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png" class="h-12 ml-3" />
                        </label>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="font-bold text-sm mb-2 ml-1">Name on card</label>
                    <div>
                        <input class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John Smith" type="text" />
                    </div>
                </div>
                <div class="mb-3">
                    <label class="font-bold text-sm mb-2 ml-1">Card number</label>
                    <div>
                        <input class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="0000 0000 0000 0000" type="text" />
                    </div>
                </div>
                <div class="mb-3 -mx-2 flex items-end">
                    <div class="px-2 w-1/2">
                        <label class="font-bold text-sm mb-2 ml-1">Expiration date</label>
                        <div>
                            <select class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
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
                    <div class="px-2 w-1/2">
                        <select class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
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
                <div class="mb-10">
                    <label class="font-bold text-sm mb-2 ml-1">Security code</label>
                    <div>
                        <input class="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="000" type="number" />
                    </div>
                </div>
                <div>
                    <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"><i class="mdi mdi-lock-outline mr-1"></i> PAY NOW  ($2.99)</button>
                </div>
            </div>



        </div>


    )
};
export default ModalMembership;