const { gmail, microsoft, smtp } = require('../config/emailConfig');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { reputationMonitor } = require('../utils/reputationManager');

// Gmail OAuth2 configuration
const oAuth2Client = new google.auth.OAuth2(
  gmail.clientId,
  gmail.clientSecret,
  gmail.redirectUri
);
oAuth2Client.setCredentials({ refresh_token: gmail.refreshToken });

// Email Service Functions
class EmailService {
  static async sendEmail(to, subject, content) {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: smtp.user,
        clientId: gmail.clientId,
        clientSecret: gmail.clientSecret,
        refreshToken: gmail.refreshToken,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: smtp.user,
      to,
      subject,
      html: content,
    };

    await transporter.sendMail(mailOptions);
    reputationMonitor(mailOptions, 'send');
    console.log(`Email sent to ${to}`);
  }

  static async readEmails(provider) {
    if (provider === 'gmail') {
      // Use Google API to fetch emails
      console.log('Fetching emails from Gmail...');
      // Implement Gmail API logic here (e.g., using the Gmail API SDK)
    } else if (provider === 'microsoft') {
      console.log('Fetching emails from Microsoft Outlook...');
      // Implement Microsoft Graph API logic here
    }
  }

  static async moveEmailToInbox(emailId) {
    console.log(`Moving email ${emailId} to Inbox...`);
    // Implement API-specific logic to move emails out of spam/promotions
  }
}

module.exports = EmailService;
