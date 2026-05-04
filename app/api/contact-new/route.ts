import { NextResponse } from 'next/server';
import { sendGraphEmail } from '@/utils/graphMail';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { 
      fullName, 
      businessEmail, 
      company, 
      jobTitle, 
      relationshipType, 
      areaOfInterest, 
      region, 
      phoneCode,
      phone,
      batchNumber, 
      message 
    } = formData;

    if (!fullName || !businessEmail || !company || !relationshipType || !areaOfInterest || !region || !phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Routing Logic
    let routeTo = "General Inbox / Admin";
    if (areaOfInterest === 'Proprietary Ingredient Sourcing') {
      routeTo = `Regional Sales Lead (${region})`;
    } else if (areaOfInterest === 'CDMO & Contract Manufacturing' || areaOfInterest === 'R&D & Co-Development') {
      routeTo = "Business Development Team";
    } else if (areaOfInterest === 'Quality Assurance (QA)' || areaOfInterest === 'Regulatory & Compliance') {
      routeTo = "Technical & Regulatory Affairs";
    }

    // High Priority Lead Flag
    const isHighPriority = relationshipType === 'New Partnership Inquiry' && 
                          (areaOfInterest === 'CDMO & Contract Manufacturing' || areaOfInterest === 'R&D & Co-Development');

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #222; margin: 0; padding: 0; background-color: #f5f5f5; }
            .email-container { max-width: 650px; margin: 20px auto; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
            .header { background: ${isHighPriority ? 'linear-gradient(107deg, #FF4B2B -20.85%, #FF416C 118.78%)' : 'linear-gradient(107deg, #80B9E6 -20.85%, #99C7EB 48.97%, #CAE16D 118.78%)'}; color: white; padding: 40px 32px; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
            .priority-badge { display: inline-block; background-color: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-top: 10px; border: 1px solid white; }
            .content { padding: 32px; }
            .section { margin-bottom: 32px; }
            .section-title { font-size: 16px; font-weight: 700; color: #0080C7; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #0080C7; text-transform: uppercase; }
            .field-row { display: flex; border-bottom: 1px solid #EBEBEB; padding: 12px 0; }
            .label { font-weight: 600; color: #616161; font-size: 13px; width: 35%; flex-shrink: 0; }
            .value { color: #222; font-size: 14px; flex-grow: 1; }
            .message-box { background-color: #f9f9f9; border-left: 4px solid #0080C7; padding: 16px; margin-top: 8px; border-radius: 4px; font-size: 14px; white-space: pre-wrap; }
            .footer { background-color: #f9f9f9; padding: 24px; text-align: center; border-top: 1px solid #EBEBEB; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>New ${areaOfInterest} Enquiry</h1>
              ${isHighPriority ? '<div class="priority-badge">HIGH PRIORITY LEAD</div>' : ''}
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Routed to: ${routeTo}</p>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">Sender Details</div>
                <div class="field-row"><div class="label">Full Name:</div><div class="value">${fullName}</div></div>
                <div class="field-row"><div class="label">Email:</div><div class="value"><a href="mailto:${businessEmail}">${businessEmail}</a></div></div>
                <div class="field-row"><div class="label">Phone:</div><div class="value">${phoneCode} ${phone}</div></div>
                <div class="field-row"><div class="label">Company:</div><div class="value">${company}</div></div>
                <div class="field-row"><div class="label">Job Title:</div><div class="value">${jobTitle || 'N/A'}</div></div>
              </div>
              <div class="section">
                <div class="section-title">Inquiry Details</div>
                <div class="field-row"><div class="label">Relationship:</div><div class="value">${relationshipType}</div></div>
                <div class="field-row"><div class="label">Interest:</div><div class="value">${areaOfInterest}</div></div>
                <div class="field-row"><div class="label">Region:</div><div class="value">${region}</div></div>
                ${batchNumber ? `<div class="field-row"><div class="label">Batch/Request:</div><div class="value">${batchNumber}</div></div>` : ''}
              </div>
              <div class="section">
                <div class="section-title">Message</div>
                <div class="message-box">${message || 'No message provided.'}</div>
              </div>
            </div>
            <div class="footer">
              <p>Submitted via Laila Nutra Contact Form New</p>
              <p>Received on ${new Date().toLocaleString('en-IN')}</p>
            </div>
          </div>
        </body>
        </html>
    `;

    const recipients = [
      process.env.AZURE_SENDER_EMAIL!,
      'parakh@stuvio.co',
      'jigar@stuvio.co'
    ];

    await sendGraphEmail({
      to: recipients,
      replyTo: businessEmail,
      subject: `${isHighPriority ? '[URGENT] ' : ''}New ${areaOfInterest} Enquiry: ${fullName} (${company})`,
      html: htmlContent,
    });

    // Confirmation email to user
    try {
      await sendGraphEmail({
        to: businessEmail,
        subject: 'We’ve received your enquiry – Laila Nutra',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #222;">
            <div style="background: #0080C7; color: white; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">Thank you for reaching out</h1>
            </div>
            <div style="padding: 30px; line-height: 1.6;">
              <p>Dear ${fullName},</p>
              <p>Thank you for your interest in Laila Nutra. We have received your enquiry regarding <strong>${areaOfInterest}</strong>.</p>
              <p>Our team is reviewing your requirements and will get back to you within 1–2 business days.</p>
              <p style="margin-top: 30px;">Best regards,<br><strong>Laila Nutra Team</strong></p>
            </div>
          </div>
        `
      });
    } catch (e) {
      console.log('Confirmation email failed', e);
    }

    return NextResponse.json({ success: true, message: 'Enquiry sent successfully' });

  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
