import express from 'express';
const router = express.Router();
import aws from 'aws-sdk';
const ses = new aws.SES({ region: 'us-east-2' });
router.post('/api/email', (req, resp) => {
  const { name, email, message } = req.body;
  console.log(req.body);
  sendEmail(email, message, name)
    .then((val) => {
      console.log('response of /api/email: ' + val);
      resp.send('200', 'success');
    })
    .catch((err) => {
      resp.send('err: ' + err);
      console.log('err: ' + err);
    });
});

function sendEmail(emailTo, message, name) {
  const emailFrom = 'yufeiyang.frank@gmail.com';
  var params = {
    Destination: {
      ToAddresses: [emailTo],
    },
    Message: {
      Body: {
        Text: { Data: 'From Contact Form: ' + name + '\n ' + message },
      },

      Subject: { Data: 'From: ' + emailFrom },
    },
    Source: emailFrom,
  };

  return ses.sendEmail(params).promise();
}
export default router;
