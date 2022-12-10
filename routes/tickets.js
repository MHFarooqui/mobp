const router = require("express").Router();
const jwtHelper = require("../lib/jwt-helper");
const dbHelper = require("../lib/db-helper");
const QRCode = require('qrcode');

router.post('/api/generate', jwtHelper.verifyToken, async (req, res) => {
    let vehicleInfo = {
        vehicleType: req.body.vehicleType,
        vehicleNumber: req.body.vehicleNumber
    }
    const TicketInfo = await dbHelper.saveTicket({...vehicleInfo, userId: req.token.user._id});
    let resData = ''
    await QRCode.toString([
        { data: JSON.stringify(TicketInfo), mode: 'byte' },
        { data: vehicleInfo.vehicleType, mode: 'byte' }
    ], {type: 'svg'}).then(qrImage => resData = qrImage);

    res.json({
        user: req.token.user,
        data: TicketInfo,
        qrCode: resData
    });
});



router.post('/api/exit', jwtHelper.verifyToken, async (req, res) => {
    let vehicleInfo = {
        vehicleType: req.body.vehicleType,
        vehicleNumber: req.body.vehicleNumber,
        _id: req.body._id,
        issuedOn : req.body.issuedOn

    }
    const result = await dbHelper.exitTicket(vehicleInfo);
    vehicleInfo._id = req.body._id;
    res.json({
        result,
        data: vehicleInfo,
        cost: getCost(vehicleInfo.issuedOn, vehicleInfo.vehicleType)
    });
});

/**
 * 
 * @param {*} issuedOnDateTime 
 * @returns 
 */
function getCost(issuedOnDateTime, vehicleType){
    var startDate = new Date(issuedOnDateTime);
    var endDate   = new Date();
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    var timeDuration = seconds/3600;
    var value;
    if(vehicleType == 1){
       value = timeDuration*20;
    }else if(vehicleType == 2){
       value = timeDuration*10;
    }else if(vehicleType == 3){
       value = timeDuration*15;
    }
    return (Math.round(value * 100) / 100).toFixed(2);
}

module.exports = router;