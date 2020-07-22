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
    const Plantations = mongoose.model('Plantations', PlantationSchema, 'plantations');
    var LoginDetails = mongoose.model('Login', LoginDetailsSchema, 'logindetails');
    var States = ['TamilNadu', 'Kerala', 'Karnataka', 'AndhraPradesh', 'Telangana'];
    var DistrictsTN = ['Madurai', 'Theni', 'Tirunelveli', 'Tenkasi', 'Kanyakumari'];
    var TaluksMdu = ['Madurai South', 'Madurai North', 'Tirumangalam', 'Vadipatti', 'Usilampatti'];
    var StatesTamil = ['தமிழ்நாடு', 'கேரளா', 'கர்நாடகா', 'ஆந்திரா', 'தெலுங்கானா'];
    var DistrictsTNTamil = ['மதுரை', 'தேனி', 'திருநெல்வேலி', 'தென்காசி', 'கன்னியாகுமரி'];
    var TaluksMduTamil = ['மதுரை தெற்கு', 'மதுரை வடக்கு', 'திருமங்கலம்', 'வாடிபட்டி', 'உசிலம்பட்டி'];
    var CropsTamil = ['அரிசி', 'சோளம்', 'பருத்தி',];
    var TalukIDs = ['5f0f24351af2f8280b2b1290', '5f0f24351af2f8280b2b1291', '5f0f24351af2f8280b2b1294', '5f0f24351af2f8280b2b1295', '5f0f24351af2f8280b2b1296'];
    var Crops = ['Rice', 'Maize', 'Cotton',];
    var CropIDs = ['5f02d5801a597f4e7488203c', '5f0351acf3e1a4368cea7217', '5f03551ff3e1a4368cea721a'];
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
                const Area = prompt("Enter Area of Cultivation:");
                var logindetails2 = new LoginDetails({ user_name: "SampleUser", phonenumber: "9876543210", password: "null", aadhar_number: aadharNum, role: "user" });
                logindetails2.save(function (err, docs) {
                    if (err) return console.log(err);
                    else {
                        var id = docs._id;
                        console.log(id);
                        var plantations1 = new Plantations({ taluk_id: TalukIDs[TalukNum - 1], crop_id: CropIDs[CropNum - 1], water_need: 0, village_name: "USSD Village Sample", plantation_date: Date.now, area_of_plantation: Area, login_details: id })
                        plantations1.save(function (err, docs) {
                            if (err) return console.log(err);
                            else console.log("Thank You For Sharing Information");
                        })
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
                const Area = prompt("சாகுபடி பகுதியை உள்ளிடவும்:");
                var logindetails2 = new LoginDetails({ user_name: "SampleUser", phonenumber: "9876543210", password: "null", aadhar_number: aadharNum, role: "user" });
                logindetails2.save(function (err, docs) {
                    if (err) return console.log(err);
                    else {
                        var id = docs._id;
                        console.log(id);
                        var plantations1 = new Plantations({ taluk_id: TalukIDs[TalukNum], crop_id: CropIDs[CropNum], water_need: 0, village_name: "USSD Village Sample", plantation_date: "10-07-2020", area_of_plantation: Area, login_details: id })
                        plantations1.save(function (err, docs) {
                            if (err) return console.log(err);
                            else console.log("தகவல்களைப் பகிர்ந்தமைக்கு நன்றி:");
                        })
                    }
                });
            }
        }
    }
    else {
        console.log("Invalid USSD Operation Code");
    }

});
