import { NextResponse } from "next/server";
import sendmail from 'sendmail';

const sendemail = sendmail();

export async function POST(req) {
  if (req.method === 'POST') {
    const { to, subject, text } = await req.json(); 

    return new Promise((resolve, reject) => {
      sendemail(
        {
          from: 'no-reply@ats.com', 
          to: to,                        
          subject: subject,               
          html: `<p>${text}</p>`,                     
        },
        (error, reply) => {
          if (error) {
            return reject(error); 
          }
          return resolve(reply); 
        }
      );
    }).then((reply) => {
      return NextResponse.json({ status: 'success', reply });
    }).catch((error) => {
      return NextResponse.json({ status: 'error', error });
    });
  }

  return NextResponse.json({ status: 'invalid-method' });
}

// import { NextResponse } from "next/server";
// import sendmail from 'sendmail';

// const sendemail = sendmail();

// export async function POST(req) {
//   if (req.method === 'POST') {
//     const { to, subject, text, attachments } = await req.json();

//     return new Promise((resolve, reject) => {
//       const emailData = {
//         from: 'no-reply@ats.com',
//         to: to,
//         subject: subject,
//         html: `<p>${text}</p>`,
//         attachments: [
//           {
//             filename: 'product-image.jpg',
//             path: attachments,
//             contentType: 'image/jpeg',
//           }
//         ]
//       };

//       sendemail(emailData, (error, reply) => {
//         if (error) {
//           return reject(error);
//         }
//         return resolve(reply);
//       });
//     })
//     .then((reply) => {
//       return NextResponse.json({ status: 'success', reply });
//     })
//     .catch((error) => {
//       return NextResponse.json({ status: 'error', error });
//     });
//   }

//   return NextResponse.json({ status: 'invalid-method' });
// }

