const nodeCron = require('node-cron');
const Reminder = require('./models/Reminder');
const Application = require('./models/Application');
const User = require('./models/User');
const sendEmail = require('./utils/email');

nodeCron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    const upcoming = new Date(now.getTime() + 5 * 60 * 1000);
    const rems = await Reminder.find({ remindAt: { $lte: upcoming, $gte: now } }).populate('application').populate('user');
    for (const r of rems) {
      const to = r.user.email;
      const subject = `Reminder: ${r.application.position} at ${r.application.company}`;
      const html = `<p>Hi ${r.user.name},</p><p>${r.message || 'Reminder: Follow up on your application.'}</p><p>Position: ${r.application.position} at ${r.application.company}</p><p><a href="${r.application.jobLink}">Job Link</a></p>`;
      await sendEmail({ to, subject, html });
      await Reminder.deleteOne({ _id: r._id });
    }
  } catch (err) { console.error('Cron error', err); }
});
