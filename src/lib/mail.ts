/**
 * Email Service Interface and Console Logger Stub.
 * Ready for Resend / Nodemailer / SendGrid provider swap.
 */

export interface EmailService {
  sendApplicationConfirmation(to: string, name: string, track: string): Promise<boolean>;
  sendEventRsvpConfirmation(
    to: string,
    name: string,
    eventTitle: string,
    eventDate?: string,
    venue?: string
  ): Promise<boolean>;
  sendContactAck(to: string, name: string, subject: string): Promise<boolean>;
}

class ConsoleLoggerEmailService implements EmailService {
  private maskEmail(email: string): string {
    const [user, domain] = email.split("@");
    if (!domain) return "***";
    const maskedUser = user.length > 2 ? `${user[0]}***${user[user.length - 1]}` : `${user[0]}***`;
    return `${maskedUser}@${domain}`;
  }

  async sendApplicationConfirmation(to: string, name: string, track: string): Promise<boolean> {
    console.log(
      `[MailService:Stub] Dispatching Application Confirmation to: ${this.maskEmail(to)} | Candidate: ${name} | Track: ${track}`
    );
    return true;
  }

  async sendEventRsvpConfirmation(
    to: string,
    name: string,
    eventTitle: string,
    eventDate?: string,
    venue?: string
  ): Promise<boolean> {
    console.log(
      `[MailService:Stub] Dispatching Event RSVP to: ${this.maskEmail(to)} | Attendee: ${name} | Event: "${eventTitle}" (${eventDate || "TBA"} @ ${venue || "Campus"})`
    );
    return true;
  }

  async sendContactAck(to: string, name: string, subject: string): Promise<boolean> {
    console.log(
      `[MailService:Stub] Dispatching Contact Acknowledgment to: ${this.maskEmail(to)} | Name: ${name} | Subject: "${subject}"`
    );
    return true;
  }
}

export const emailService: EmailService = new ConsoleLoggerEmailService();

