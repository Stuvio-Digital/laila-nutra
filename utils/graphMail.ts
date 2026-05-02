async function getAccessToken() {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error('Azure credentials missing in environment variables');
  }

  const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
    scope: 'https://graph.microsoft.com/.default',
  });

  const response = await fetch(url, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to get access token: ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  return data.access_token;
}

interface SendEmailOptions {
  from?: string;
  to: string | string[];
  replyTo?: string;
  subject: string;
  html: string;
}

export async function sendGraphEmail({ from, to, replyTo, subject, html }: SendEmailOptions) {
  const accessToken = await getAccessToken();
  const senderEmail = from || process.env.AZURE_SENDER_EMAIL;

  if (!senderEmail) {
    throw new Error('Sender email (AZURE_SENDER_EMAIL) is missing');
  }

  const graphUrl = `https://graph.microsoft.com/v1.0/users/${senderEmail}/sendMail`;

  const toRecipients = Array.isArray(to) 
    ? to.map(email => ({ emailAddress: { address: email.trim() } }))
    : to.split(',').map(email => ({ emailAddress: { address: email.trim() } }));

  const mailData: any = {
    message: {
      subject,
      body: {
        contentType: 'HTML',
        content: html,
      },
      toRecipients,
    },
    saveToSentItems: 'true',
  };

  if (replyTo) {
    mailData.message.replyTo = [{ emailAddress: { address: replyTo } }];
  }

  const response = await fetch(graphUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mailData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Graph API error: ${JSON.stringify(errorData)}`);
  }

  return true;
}
