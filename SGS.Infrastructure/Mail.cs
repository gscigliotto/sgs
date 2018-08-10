using System;
using System.Net.Mail;

namespace SGS.Infrastructure
{
    public static class Mail
    {
        public static bool SendEmail(string to, string subject, string body)
        {
            var message = new MailMessage();

            message.To.Add(to);
            message.Subject = subject;
            message.Body = body;
            message.Priority = MailPriority.High;

            var client = new SmtpClient();

            try
            {
                client.Send(message);
            }
            catch (Exception ex)
            {
                throw new SmtpException(ex.Message);
            }

            return true;
        }
    }
}
