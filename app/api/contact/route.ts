import { NextResponse } from 'next/server';
import { sendGraphEmail } from '@/utils/graphMail';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { name, email, phone, companyName, supportType, message } = formData;

    if (!name || !email || !phone || !companyName || !supportType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
              line-height: 1.6; 
              color: #222;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .email-container { 
              max-width: 650px; 
              margin: 0 auto; 
              background-color: #ffffff;
              box-shadow: 0 4px 20px rgba(0,0,0,0.1);
              border-radius: 8px;
              overflow: hidden;
            }
            .header { 
              background: linear-gradient(107deg, #80B9E6 -20.85%, #99C7EB 48.97%, #CAE16D 118.78%);
              color: white; 
              padding: 40px 32px;
              text-align: left;
            }
            .header h1 { 
              margin: 0; 
              font-size: 28px;
              font-weight: 600;
              letter-spacing: -0.5px;
            }
            .header p {
              margin: 8px 0 0 0;
              font-size: 15px;
              opacity: 0.95;
            }
            .content { 
              padding: 32px 32px;
            }
            .section {
              margin-bottom: 32px;
            }
            .section-title {
              font-size: 18px;
              font-weight: 600;
              color: #0080C7;
              margin: 0 0 16px 0;
              padding-bottom: 8px;
              border-bottom: 2px solid #0080C7;
            }
            .field-row { 
              display: table;
              width: 100%;
              margin-bottom: 12px;
              border-bottom: 1px solid #EBEBEB;
              padding-bottom: 12px;
            }
            .field-row:last-child {
              border-bottom: none;
              margin-bottom: 0;
              padding-bottom: 0;
            }
            .label { 
              display: table-cell;
              font-weight: 600; 
              color: #616161;
              font-size: 14px;
              width: 40%;
              padding-right: 16px;
              vertical-align: top;
              text-transform: uppercase;
            }
            .value { 
              display: table-cell;
              color: #222;
              font-size: 15px;
              word-wrap: break-word;
            }
            .value a {
              color: #0080C7;
              text-decoration: none;
            }
            .message-box {
              background-color: #f9f9f9;
              border-left: 4px solid #0080C7;
              padding: 16px;
              margin-top: 8px;
              border-radius: 4px;
            }
            .message-box p {
              margin: 0;
              color: #222;
              font-size: 14px;
              line-height: 1.6;
              white-space: pre-wrap;
            }
            .footer {
              background-color: #f9f9f9;
              padding: 24px;
              text-align: center;
              border-top: 1px solid #EBEBEB;
            }
            .footer p {
              margin: 0;
              font-size: 13px;
              color: #616161;
            }
            @media only screen and (max-width: 600px) {
              .field-row { display: block; }
              .label, .value { display: block; width: 100%; padding-right: 0; }
              .label { margin-bottom: 4px; }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>New Contact Enquiry</h1>
              <p>Subject: ${supportType}</p>
            </div>
            <div class="content">
              <div class="section">
                <h2 class="section-title">Sender Details</h2>
                <div class="field-row"><div class="label">Full Name:</div><div class="value">${name}</div></div>
                <div class="field-row"><div class="label">Email Address:</div><div class="value"><a href="mailto:${email}">${email}</a></div></div>
                <div class="field-row"><div class="label">Phone Number:</div><div class="value"><a href="tel:${phone}">${phone}</a></div></div>
                <div class="field-row"><div class="label">Company:</div><div class="value">${companyName}</div></div>
              </div>
              <div class="section">
                <h2 class="section-title">Enquiry Information</h2>
                <div class="field-row"><div class="label">Service Type:</div><div class="value">${supportType}</div></div>
                <div class="label">Message:</div>
                <div class="message-box"><p>${message || 'No message provided.'}</p></div>
              </div>
            </div>
            <div class="footer">
              <p>This Enquiry was submitted via Laila Nutra Contact Form</p>
              <p style="margin-top: 8px; color: #999; font-size: 12px;">Received on ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        </body>
        </html>
    `;

    // Send main Enquiry email to internal team
    const recipients = [
      process.env.AZURE_SENDER_EMAIL!,
      'parakh@stuvio.co',
      'jigar@stuvio.co'
    ];

    await sendGraphEmail({
      to: recipients,
      replyTo: email,
      subject: `New ${supportType} Enquiry: ${name}`,
      html: htmlContent,
    });

    // Confirmation email to the user
    try {
      await sendGraphEmail({
        to: email,
        subject: 'Thank You for Reaching Out to Laila Nutra',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #222; margin: 0; padding: 0; background-color: #f5f5f5; }
              .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; margin-top: 20px; }
              .header { background: linear-gradient(107deg, #80B9E6 -20.85%, #99C7EB 48.97%, #CAE16D 118.78%); color: white; padding: 32px 24px; }
              .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
              .content { padding: 32px 24px; }
              .content p { margin: 0 0 16px 0; color: #222; font-size: 15px; }
              .highlight-box { background-color: #f0f9ff; border-left: 4px solid #0080C7; padding: 16px; margin: 24px 0; }
              .highlight-box p { margin: 0; color: #222; }
              .footer { background-color: #f9f9f9; padding: 24px; text-align: center; border-top: 1px solid #EBEBEB; }
              .footer p { margin: 0; font-size: 13px; color: #616161; }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header"><h1>We've Received Your Enquiry</h1></div>
              <div class="content">
                <p>Dear ${name},</p>
                <p>Thank you for reaching out to Laila Nutra. We have successfully received your enquiry regarding <strong>${supportType}</strong>.</p>
                <div class="highlight-box">
                  <p><strong>What happens next?</strong></p>
                  <p style="margin-top: 8px;">Our team is reviewing your message and we will get back to you with the information you need as soon as possible.</p>
                </div>
                <p>We appreciate your interest in Laila Nutra.</p>
                <p style="margin-top: 24px;">Best regards,<br><strong>Laila Nutra Team</strong></p>
              </div>
              <div class="footer">
                <p>Laila Nutra</p>
                <p style="margin-top: 4px; font-size: 12px; color: #999;">This is an automated confirmation email</p>
              </div>
            </div>
          </body>
          </html>
        `
      });
    } catch (e) {
      console.log('Confirmation email failed', e);
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' });

  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
