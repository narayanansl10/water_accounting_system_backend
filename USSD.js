const mongoose = require('mongoose');
const prompt = require('prompt-sync')({ sigint: true });
//Server DB
// make a connection
mongoose.connect('mongodb+srv://admin:admin@was.hy9kp.mongodb.net/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connection Successful!");
    var LoginDetailsSchema = mongoose.Schema({
        user_name: {
            type: String,
            required: true
        },
        phonenumber: {
            type: Number,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        aadhar_number: {
            type: String,
            required: true
        },
        role: {
            type: String,
            require: true
        }
    });
    var PlantationSchema = mongoose.Schema({
        crop_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CropInfo',
            required: true
        },
        area_of_plantation: {
            type: Number,
            required: true
        },
        plantation_date: {
            type: Date, //DD-MM-YYYY
            required: true
        },
        water_need: {
            type: Number,
            required: true
        },
        taluk_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Taluk',
            required: true
        },
        village_name: {
            type: String,
            required: true
        },
        login_details: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LoginDetails',
            required: true
        },
        time: {
            type: Number,

        }
    });
    var TalukSchema = mongoose.Schema({
        taluk_name: {
            type: String,
            required: true
        },
        district_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'District',
            required: true
        }
    });
    const CropInfoSchema = mongoose.Schema({
        crop_name: {
            type: String,
            required: true
        },
        delta: {
            type: Number,
            required: true
        },
        base_period: {
            type: Number,
            required: true
        },
        duty_const: {
            type: Number,
            required: true
        }
    });
    const RainfallSchema = mongoose.Schema({
        district_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Districts',
            required: true
        },
        JAN: {
            type: Number,
            required: true
        },
        FEB: {
            type: Number,
            required: true
        },
        MAR: {
            type: Number,
            required: true
        },
        APR: {
            type: Number,
            required: true
        },
        MAY: {
            type: Number,
            required: true
        },
        JUN: {
            type: Number,
            required: true
        },
        JUL: {
            type: Number,
            required: true
        },
        AUG: {
            type: Number,
            required: true
        },
        SEP: {
            type: Number,
            required: true
        },
        OCT: {
            type: Number,
            required: true
        },
        NOV: {
            type: Number,
            required: true
        },
        DEC: {
            type: Number,
            required: true
        }
    });

    const Rainfall = mongoose.model('Rainfall', RainfallSchema, 'rainfall')
    const Taluk = mongoose.model('Taluk', TalukSchema, 'taluks');
    const Plantations = mongoose.model('Plantations', PlantationSchema, 'plantations');
    var LoginDetails = mongoose.model('Login', LoginDetailsSchema, 'logindetails');
    var CropInfo = mongoose.model('CropInfo', CropInfoSchema, 'cropinfos');
    var States = ['TamilNadu', 'Kerala', 'Karnataka', 'AndhraPradesh', 'Telangana'];
    var DistrictsTN = ['Madurai', 'Theni', 'Tirunelveli', 'Tenkasi', 'Kanyakumari'];
    var TaluksMdu = ['Madurai South', 'Madurai North', 'Tirumangalam', 'Vadipatti', 'Usilampatti'];
    var StatesTamil = ['தமிழ்நாடு', 'கேரளா', 'கர்நாடகா', 'ஆந்திரா', 'தெலுங்கானா'];
    var DistrictsTNTamil = ['மதுரை', 'தேனி', 'திருநெல்வேலி', 'தென்காசி', 'கன்னியாகுமரி'];
    var TaluksMduTamil = ['மதுரை தெற்கு', 'மதுரை வடக்கு', 'திருமங்கலம்', 'வாடிபட்டி', 'உசிலம்பட்டி'];
    var CropsTamil = ['அரிசி', 'சோளம்', 'பருத்தி',];
    var TalukIDs = ['5f0f24351af2f8280b2b1290', '5f0f24351af2f8280b2b1291', '5f0f24351af2f8280b2b1294', '5f0f24351af2f8280b2b1296', '5f0f24351af2f8280b2b1295'];
    var Crops = ['Rice', 'Maize', 'Cotton',];
    var CropIDs = ['5f1419b3649ce64c9f385191', '5f1419b3649ce64c9f3851a8', '5f1419b3649ce64c9f3851a6'];
    console.clear();
    console.log("Choose Language:");
    console.log("1.English")
    console.log("2.\u0ba4 \u0bae\u0bbf \u0bb4\u0bcd")
    const num = prompt('Choice:');
    if (num == '1') {
        console.clear();
        const aadharNum = prompt("Enter Aadhar Number:");
        console.clear();
        console.log("Choose State:");
        for (i = 0; i < States.length; i++) {
            console.log("" + (i + 1) + "." + States[i]);
        }
        const stateNum = prompt('Choice:');
        if (stateNum == '1') {
            console.clear();
            console.log("Choose District:");
            for (j = 0; j < DistrictsTN.length; j++) {
                console.log("" + (j + 1) + "." + DistrictsTN[j]);
            }
            const DistrictNum = prompt('Choice:');
            if (DistrictNum == '1') {
                console.clear();
                console.log("Choose Taluk:");
                for (k = 0; k < TaluksMdu.length; k++) {
                    console.log("" + (k + 1) + "." + TaluksMdu[k]);
                }
                const TalukNum = prompt('Choice:');
                console.clear();
                console.log("Choose Crop:");
                for (l = 0; l < Crops.length; l++) {
                    console.log("" + (l + 1) + "." + Crops[l]);
                }
                const CropNum = prompt('Choice:');
                console.clear();
                const Area = prompt("Enter Area of Cultivation in Hectares:");
                console.clear();
                const phonenumber = prompt("Enter Phone Number");
                console.clear();
                var logindetails2 = new LoginDetails({ user_name: "SampleUser", phonenumber: phonenumber, password: "$2a$10$9q9JyHxgaHVGOqSyz2RRceLkCAcGRxBdsWASRRCgI0VkV/iMbrqsy", aadhar_number: aadharNum, role: "user" });
                logindetails2.save(function (err, docs) {
                    if (err) return console.log(err);
                    else {
                        var id = docs._id;
                        // console.log(id);
                        var plantations1 = new Plantations({ taluk_id: TalukIDs[TalukNum - 1], crop_id: CropIDs[CropNum - 1], water_need: 0, water_need_rainfall: 0, discharge_water_need: 0, discharge_water_need_rainfall: 0, village_name: "USSD Village Sample", plantation_date: Date.now(), area_of_plantation: Area, login_details: id })
                        // plantations1.save(function (err, docs) {
                        //     if (err) return console.log(err);
                        //     else console.log("Thank You For Sharing Information");
                        // })
                        CropInfo.find({ _id: CropIDs[CropNum - 1] }, (err, docs) => {
                            var base = parseInt(docs[0].base_period);
                            var delta = parseFloat(docs[0].delta);
                            var duty_const = parseFloat(docs[0].duty_const);
                            var area = parseFloat(Area);
                            plantations1.discharge_water_need = (area / ((duty_const * base) / delta))
                            plantations1.water_need = (area / ((duty_const * base) / delta)) * 60 * 60 * 24 * base;
                            date = "01-08-2020".split("-");
                            day = parseInt(date[2])
                            month = parseInt(date[1])
                            period = (base % 30 > 15) ? parseFloat(base) / 30 + 1 : parseFloat(base) / 30
                            avgRainfall = 0.0
                            month = (day > 15) ? month + 1 : month
                            Taluk.find({ _id: TalukIDs[TalukNum - 1] }, (err, docs) => {
                                if (!err && docs.length > 0) {
                                    Rainfall.find({ district_id: docs[0].district_id }, (errr, data) => {
                                        if (data.length > 0) {
                                            rainfallMonth = []
                                            rainfallMonth.push(data[0].JAN)
                                            rainfallMonth.push(data[0].FEB)
                                            rainfallMonth.push(data[0].MAR)
                                            rainfallMonth.push(data[0].APR)
                                            rainfallMonth.push(data[0].MAY)
                                            rainfallMonth.push(data[0].JUN)
                                            rainfallMonth.push(data[0].JUL)
                                            rainfallMonth.push(data[0].AUG)
                                            rainfallMonth.push(data[0].SEP)
                                            rainfallMonth.push(data[0].OCT)
                                            rainfallMonth.push(data[0].NOV)
                                            rainfallMonth.push(data[0].DEC)
                                            // console.log(rainfallMonth)
                                            while (period > 0) {
                                                avgRainfall += parseFloat(rainfallMonth[(month - 1) % 12])
                                                period -= 1
                                                month += 1
                                            }
                                            avgRainfall /= 10
                                            plantations1.discharge_water_need_rainfall = (area / ((duty_const * base) / (delta - avgRainfall)))
                                            plantations1.water_need_rainfall = (area / ((duty_const * base) / (delta - avgRainfall))) * 60 * 60 * 24 * base;
                                            // console.log(avgRainfall)
                                            plantations1.save((err, doc) => {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    console.log("Thankyou for sharing details")
                                                }
                                            });
                                        } else {
                                            console.log(err)
                                        }
                                    })
                                } else {
                                    console.log(err)
                                }
                            })
                        });
                    }
                });
            }
        }
    }
    else if (num == '2') {
        console.clear();
        const aadharNum = prompt("ஆதார் எண்ணை உள்ளிடவும்:");
        console.clear();
        console.log("மாநிலத்தைத் தேர்வுசெய்க:");
        for (i = 0; i < States.length; i++) {
            console.log("" + (i + 1) + "." + StatesTamil[i]);
        }
        const stateNum = prompt('தேர்வு:');
        if (stateNum == '1') {
            console.clear();
            console.log("மாவட்டத்தைத் தேர்வுசெய்க:");
            for (j = 0; j < DistrictsTN.length; j++) {
                console.log("" + (j + 1) + "." + DistrictsTNTamil[j]);
            }
            const DistrictNum = prompt('தேர்வு:');
            if (DistrictNum == '1') {
                console.clear();
                console.log("தாலுகாவைத் தேர்வுசெய்க:");
                for (k = 0; k < TaluksMdu.length; k++) {
                    console.log("" + (k + 1) + "." + TaluksMduTamil[k]);
                }
                const TalukNum = prompt('தேர்வு:');
                console.clear();
                console.log("பயிர் தேர்வு:");
                for (l = 0; l < Crops.length; l++) {
                    console.log("" + (l + 1) + "." + CropsTamil[l]);
                }
                const CropNum = prompt('தேர்வு:');
                console.clear();
                const Area = prompt("சாகுபடி பகுதியை உள்ளிடவும்:");
                console.clear();
                const phonenumber = prompt("கைபேசி எண்:");
                console.clear();
                console.clear();
                var logindetails2 = new LoginDetails({ user_name: "SampleUser", phonenumber: phonenumber, password: "$2a$10$9q9JyHxgaHVGOqSyz2RRceLkCAcGRxBdsWASRRCgI0VkV/iMbrqsy", aadhar_number: aadharNum, role: "user" });
                logindetails2.save(function (err, docs) {
                    if (err) return console.log(err);
                    else {
                        var id = docs._id;
                        // console.log(id);
                        var plantations1 = new Plantations({ taluk_id: TalukIDs[TalukNum - 1], crop_id: CropIDs[CropNum - 1], water_need: 0, water_need_rainfall: 0, discharge_water_need: 0, discharge_water_need_rainfall: 0, village_name: "USSD Village Sample", plantation_date: Date.now(), area_of_plantation: Area, login_details: id })
                        // plantations1.save(function (err, docs) {
                        //     if (err) return console.log(err);
                        //     else console.log("Thank You For Sharing Information");
                        // })
                        CropInfo.find({ _id: CropIDs[CropNum - 1] }, (err, docs) => {
                            var base = parseInt(docs[0].base_period);
                            var delta = parseFloat(docs[0].delta);
                            var duty_const = parseFloat(docs[0].duty_const);
                            var area = parseFloat(Area);
                            plantations1.discharge_water_need = (area / ((duty_const * base) / delta))
                            plantations1.water_need = (area / ((duty_const * base) / delta)) * 60 * 60 * 24 * base;
                            date = "01-08-2020".split("-");
                            day = parseInt(date[2])
                            month = parseInt(date[1])
                            period = (base % 30 > 15) ? parseFloat(base) / 30 + 1 : parseFloat(base) / 30
                            avgRainfall = 0.0
                            month = (day > 15) ? month + 1 : month
                            Taluk.find({ _id: TalukIDs[TalukNum - 1] }, (err, docs) => {
                                if (!err && docs.length > 0) {
                                    Rainfall.find({ district_id: docs[0].district_id }, (errr, data) => {
                                        if (data.length > 0) {
                                            rainfallMonth = []
                                            rainfallMonth.push(data[0].JAN)
                                            rainfallMonth.push(data[0].FEB)
                                            rainfallMonth.push(data[0].MAR)
                                            rainfallMonth.push(data[0].APR)
                                            rainfallMonth.push(data[0].MAY)
                                            rainfallMonth.push(data[0].JUN)
                                            rainfallMonth.push(data[0].JUL)
                                            rainfallMonth.push(data[0].AUG)
                                            rainfallMonth.push(data[0].SEP)
                                            rainfallMonth.push(data[0].OCT)
                                            rainfallMonth.push(data[0].NOV)
                                            rainfallMonth.push(data[0].DEC)
                                            // console.log(rainfallMonth)
                                            while (period > 0) {
                                                avgRainfall += parseFloat(rainfallMonth[(month - 1) % 12])
                                                period -= 1
                                                month += 1
                                            }
                                            avgRainfall /= 10
                                            plantations1.discharge_water_need_rainfall = (area / ((duty_const * base) / (delta - avgRainfall)))
                                            plantations1.water_need_rainfall = (area / ((duty_const * base) / (delta - avgRainfall))) * 60 * 60 * 24 * base;
                                            // console.log(avgRainfall)
                                            plantations1.save((err, doc) => {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    console.log("தகவல்களைப் பகிர்ந்தமைக்கு நன்றி...")
                                                }
                                            });
                                        } else {
                                            console.log(err)
                                        }
                                    })
                                } else {
                                    console.log(err)
                                }
                            })
                        });
                    }
                });
            }
        }
    }
    else {
        console.log("Invalid USSD Operation Code");
    }

});
