const EmailService = require('../services/emailService');

class EmailController {
  static async send(req, res) {
    const { to, subject, content } = req.body;

    try {
      await EmailService.sendEmail(to, subject, content);
      res.status(200).send({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  static async fetchEmails(req, res) {
    const { provider } = req.params;

    try {
      await EmailService.readEmails(provider);
      res.status(200).send({ message: 'Emails fetched successfully' });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  static async moveToInbox(req, res) {
    const { emailId } = req.body;

    try {
      await EmailService.moveEmailToInbox(emailId);
      res.status(200).send({ message: 'Email moved to Inbox successfully' });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}

module.exports = EmailController;
