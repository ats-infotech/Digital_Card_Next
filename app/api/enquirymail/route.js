import sendmail from 'sendmail';
import { NextResponse } from 'next/server';

const sendemail = sendmail();

export async function POST(req) {
  if (req.method === 'POST') {
    const { to, subject, text, image } = await req.json();

    let attachment = [];
    if (image) {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      attachment = [
        {
          filename: 'product-image.jpg',
          content: buffer,
          encoding: 'base64',
          contentType: 'image/jpeg',
        },
      ];
    }

    return new Promise((resolve, reject) => {
      sendemail(
        {
          from: 'no-reply@ats.com',
          to: to,
          subject: subject,
          html: `<p>${text}</p>`,
          attachments: attachment,
        },
        (error, reply) => {
          if (error) {
            return reject(error);
          }
          return resolve(reply);
        }
      );
    })
      .then((reply) => {
        return NextResponse.json({ status: 'success', reply });
      })
      .catch((error) => {
        return NextResponse.json({ status: 'error', error: error.message }, { status: 500 });
      });
  }
  return NextResponse.json({ status: 'invalid-method' });
}

