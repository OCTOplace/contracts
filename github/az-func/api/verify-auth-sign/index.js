const recoverSignature = require("eth-sig-util").recoverTypedSignature_v4;
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const msgParams = req.body.data;
    const signature = req.body.sig;

    const address = recoverSignature({data: msgParams, sig: signature});
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: address
    };
}