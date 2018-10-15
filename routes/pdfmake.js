const express = require('express');
const router = express.Router();

const pdfMake = require('../pdfmake/pdfmake');
const vfsFonts = require('../pdfmake/vfs_fonts');

pdfMake.vfs = vfsFonts.pdfMake.vfs;

router.post('/pdf', (req, res, next)=>{
    //res.send('PDF');

    const name = req.body.name;
    const email = req.body.email;
    const date = req.body.date;
    const time = req.body.time;
    const service = req.body.appointmentfor;

    var documentDefinition = {
        content: [
            `Name:    ${name}` ,
            `E-Mail:  ${email}`,
            `Date:    ${date}`,
            `Time:    ${time}`,
            `Service: ${service}`,
            'We are waiting for you at ${date} on ${time}.   Come and get an awesome experience!'
        ]        
    };

    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.getBase64((data)=>{
        res.writeHead(200, 
        {
            'Content-Type': 'application/pdf',
            'Content-Disposition':'attachment;filename="filename.pdf"'
        });

        const download = Buffer.from(data.toString('utf-8'), 'base64');
        res.end(download);
    });

});


module.exports = router;