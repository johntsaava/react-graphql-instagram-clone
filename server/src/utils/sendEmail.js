import mailgun from "mailgun-js";

const transporter = mailgun({
  apiKey: process.env.MAILER_API_KEY,
  domain: process.env.MAILER_DOMAIN
});

export default async (email, url) => {
  const data = {
    from: "<support@instagram-clone.ml>",
    to: email,
    subject: "Instagram-clone",
    html: `<a href="${url}">${url}</a>`
  };

  transporter.messages().send(data, function(error, body) {
    if (error) console.log(error);
    console.log(body);
  });
};
