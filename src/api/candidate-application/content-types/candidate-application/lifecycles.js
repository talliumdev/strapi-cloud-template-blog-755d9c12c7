'use strict';

const COMPANY_LOGO_URL = 'https://sincere-positivity-25d680ef23.media.strapiapp.com/Logo_82a3e176ef.svg';
const LINKEDIN_URL = 'https://sincere-positivity-25d680ef23.media.strapiapp.com/in_e098d3aaff.png';
const INSTAGRAM_URL = 'https://sincere-positivity-25d680ef23.media.strapiapp.com/i_64fabcbf05.png';
const FACEBOOK_URL = 'https://sincere-positivity-25d680ef23.media.strapiapp.com/f_6d10b22cf2.png';
const LINKEDIN_PAGE_URL = 'https://www.linkedin.com/company/tallium-inc.';
const INSTAGRAM_PAGE_URL = 'https://www.instagram.com/tallium_inc/';
const FACEBOOK_PAGE_URL = 'https://www.facebook.com/talliuminc/';
const INTERNAL_NOTIFICATION_EMAIL = 'career@tallium.com,maksym.bondarenko@tallium.com'; // ... 'career@tallium.com, maksym.bondarenko@tallium.com'
const CANDIDATE_APPLICATION_UID = 'api::candidate-application.candidate-application';
const DEFAULT_ADMIN_BASE_URL = 'https://sincere-positivity-25d680ef23.strapiapp.com';
const withFallback = (value) => value || 'N/A';

const getAdminBaseUrl = () =>
  process.env.STRAPI_ADMIN_URL || process.env.PUBLIC_URL || DEFAULT_ADMIN_BASE_URL;

const buildAdminRecordUrl = (documentId) => {
  if (!documentId) {
    return null;
  }

  const baseUrl = getAdminBaseUrl().replace(/\/$/, '');
  return `${baseUrl}/admin/content-manager/collection-types/${CANDIDATE_APPLICATION_UID}/${documentId}`;
};

const resolveMediaUrl = (url) => {
  if (!url) {
    return null;
  }

  if (url.startsWith('http')) {
    return url;
  }

  const baseUrl = (process.env.STRAPI_PUBLIC_URL || getAdminBaseUrl()).replace(/\/$/, '');
  return `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
};

const buildEmailAttachments = async (files = []) => {
  const attachments = [];

  for (const file of files) {
    if (!file?.url) {
      continue;
    }

    const fileUrl = resolveMediaUrl(file.url);
    const filename =
      file.ext && file.name && !file.name.endsWith(file.ext)
        ? `${file.name}${file.ext}`
        : file.name || 'attachment';

    try {
      const response = await fetch(fileUrl);

      if (!response.ok) {
        console.error(`[candidate-application] Failed to fetch file for attachment: ${fileUrl}`);
        continue;
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      attachments.push({
        filename,
        content: buffer,
        contentType: file.mime || undefined
      });
    } catch (error) {
      console.error(`[candidate-application] Failed to prepare attachment ${filename}:`, error);
    }
  }

  return attachments;
};

const buildEmailPayload = () => ({
  text: 'We received your CV and will contact you shortly.',
  html: `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0;padding:0;background:#F3F3F3;">
      <tr>
        <td align="center" style="padding:24px 16px;background:#F3F3F3;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="width:100%;max-width:640px;">
            <tr>
              <td align="center" style="padding:0 0 20px 0;">
                <img src="${COMPANY_LOGO_URL}" alt="Tallium logo" style="display:block;max-width:140px;width:140px;height:auto;border:0;" />
              </td>
            </tr>

            <tr>
              <td style="background:#FFFFFF;border-radius:12px;padding:32px 22px;">
                <h1 style="margin:0 0 28px 0;font-family:Roboto,sans-serif;font-size:26px;line-height:130%;font-weight:700;color:#161616;">
                  Thank You for Your Application to Tallium <span style="font-weight:400;">&#129505;</span>
                </h1>

                <p style="margin:0 0 16px 0;font-family:Roboto,sans-serif;font-size:20px;line-height:140%;font-weight:400;color:#161616;">
                  Dear Candidate,
                </p>

                <p style="margin:0 0 12px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:400;color:#161616;">
                  Thank you for your interest in joining Tallium and for taking the time to apply. We truly appreciate your attention to our company and your desire to become part of our team.
                </p>
                <p style="margin:0 0 12px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:400;color:#161616;">
                  We will carefully review your profile, and if your experience and background align with our current opportunities, we will reach out to discuss the next steps.
                </p>
                <p style="margin:0 0 32px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:400;color:#161616;">
                  Thank you once again for considering Tallium. We wish you every success in your career journey!
                </p>

                <p style="margin:0;text-align:center;font-family:Roboto,sans-serif;font-size:18px;line-height:130%;font-weight:700;color:#161616;">
                  Kind regards,<br />
                  Tallium Team
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding-top:18px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#161616;border-radius:12px;padding:22px 20px;">
                  <tr>
                    <td align="center" style="padding:0 0 18px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:700;color:#FFFFFF;">
                      Get to Know Us Better &#128071;
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td width="33.33%" valign="top" style="padding-right:8px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #2F2F2F;border-radius:12px;">
                              <tr>
                                <td style="padding:14px 14px 16px 14px;height:200px;vertical-align:top;">
                                  <a href="${LINKEDIN_PAGE_URL}" style="display:block;height:100%;text-decoration:none;color:#FFFFFF;">
                                    <img src="${LINKEDIN_URL}" alt="Linkedin icon" style="display:block;width:16px;height:16px;border:0;margin-bottom:12px;" />
                                    <p style="margin:0 0 6px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:600;color:#FFFFFF;">Linkedin</p>
                                    <p style="margin:0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:400;color:#FFFFFF;">Company news, updates, and industry insights.</p>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td width="33.33%" valign="top" style="padding-left:4px;padding-right:4px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #2F2F2F;border-radius:12px;">
                              <tr>
                                <td style="padding:14px 14px 16px 14px;height:200px;vertical-align:top;">
                                  <a href="${INSTAGRAM_PAGE_URL}" style="display:block;height:100%;text-decoration:none;color:#FFFFFF;">
                                    <img src="${INSTAGRAM_URL}" alt="Instagram icon" style="display:block;width:16px;height:16px;border:0;margin-bottom:12px;" />
                                    <p style="margin:0 0 6px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:600;color:#FFFFFF;">Instagram</p>
                                    <p style="margin:0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:400;color:#FFFFFF;">Meet our team and get a glimpse of our culture. &#128522;</p>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td width="33.33%" valign="top" style="padding-left:8px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #2F2F2F;border-radius:12px;">
                              <tr>
                                <td style="padding:14px 14px 16px 14px;height:200px;vertical-align:top;">
                                  <a href="${FACEBOOK_PAGE_URL}" style="display:block;height:100%;text-decoration:none;color:#FFFFFF;">
                                    <img src="${FACEBOOK_URL}" alt="Facebook icon" style="display:block;width:16px;height:16px;border:0;margin-bottom:12px;" />
                                    <p style="margin:0 0 6px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:600;color:#FFFFFF;">Facebook</p>
                                    <p style="margin:0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:400;color:#FFFFFF;">Follow us for more updates and company news</p>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `
});

const buildInternalNotificationPayload = (candidateApplication, adminUrl) => {
  const fileNames = (candidateApplication?.files || [])
    .map((file) => file?.name)
    .filter(Boolean)
    .join(', ');

  return {
    text: [
      'A new candidate application has been submitted.',
      '',
      `Name: ${withFallback(candidateApplication.fullName)}`,
      `Email: ${withFallback(candidateApplication.email)}`,
      `Position: ${withFallback(candidateApplication.position)}`,
      `About: ${withFallback(candidateApplication.about)}`,
      `Vacancy ID: ${withFallback(candidateApplication.vacancyId)}`,
      `Submitted at: ${withFallback(candidateApplication.submittedAt)}`,
      fileNames ? `Attached files: ${fileNames}` : null,
      '',
      adminUrl ? `View application: ${adminUrl}` : 'Please review the application in the Strapi admin panel.'
    ]
      .filter(Boolean)
      .join('\n'),
    html: `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0;padding:0;background:#F3F3F3;">
      <tr>
        <td align="center" style="padding:24px 16px;background:#F3F3F3;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="width:100%;max-width:640px;">
            <tr>
              <td align="center" style="padding:0 0 20px 0;">
                <img src="${COMPANY_LOGO_URL}" alt="Tallium logo" style="display:block;max-width:140px;width:140px;height:auto;border:0;" />
              </td>
            </tr>

            <tr>
              <td style="background:#FFFFFF;border-radius:12px;padding:32px 22px;">
                <h1 style="margin:0 0 20px 0;font-family:Roboto,sans-serif;font-size:26px;line-height:130%;font-weight:700;color:#161616;">
                  New Candidate Application - ${withFallback(candidateApplication.fullName)}
                </h1>

                <p style="margin:0 0 20px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:400;color:#161616;">
                  A new candidate has submitted a CV via the website.
                </p>

                ${
                  adminUrl
                    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 24px 0;">
                  <tr>
                    <td align="center">
                      <a href="${adminUrl}" style="display:inline-block;padding:12px 24px;background:#2E7D32;border-radius:8px;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:600;color:#FFFFFF;text-decoration:none;">
                        View Application
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-top:12px;font-family:Roboto,sans-serif;font-size:14px;line-height:150%;color:#6b7280;">
                      <a href="${adminUrl}" style="color:#2E7D32;text-decoration:underline;">${adminUrl}</a>
                    </td>
                  </tr>
                </table>`
                    : `<p style="margin:0 0 20px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;font-weight:400;color:#161616;">
                  Please review the application in the Strapi admin panel.
                </p>`
                }

                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:8px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;color:#6b7280;width:140px;vertical-align:top;"><strong>Name</strong></td>
                    <td style="padding:8px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;color:#161616;">${withFallback(candidateApplication.fullName)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;color:#6b7280;vertical-align:top;"><strong>Email</strong></td>
                    <td style="padding:8px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;color:#161616;">${withFallback(candidateApplication.email)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;color:#6b7280;vertical-align:top;"><strong>Position</strong></td>
                    <td style="padding:8px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;color:#161616;">${withFallback(candidateApplication.position)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;color:#6b7280;vertical-align:top;"><strong>About</strong></td>
                    <td style="padding:8px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;color:#161616;">${withFallback(candidateApplication.about)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;color:#6b7280;vertical-align:top;"><strong>Vacancy ID</strong></td>
                    <td style="padding:8px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;color:#161616;">${withFallback(candidateApplication.vacancyId)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;color:#6b7280;vertical-align:top;"><strong>Submitted</strong></td>
                    <td style="padding:8px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;color:#161616;">${withFallback(candidateApplication.submittedAt)}</td>
                  </tr>
                  ${
                    fileNames
                      ? `<tr>
                    <td style="padding:8px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;color:#6b7280;vertical-align:top;"><strong>Files</strong></td>
                    <td style="padding:8px 0;font-family:Roboto,sans-serif;font-size:16px;line-height:150%;color:#161616;">${fileNames}</td>
                  </tr>`
                      : ''
                  }
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `
  };
};

module.exports = {
  async afterCreate(event) {
    const candidateApplicationId = event?.result?.id;

    if (!candidateApplicationId) {
      console.error('[candidate-application] Cannot send email: missing record id');
      return;
    }

    try {
      const candidateApplication = await strapi.entityService.findOne(
        'api::candidate-application.candidate-application',
        candidateApplicationId,
        { populate: ['files'] }
      );

      const recipientEmail = candidateApplication?.email;
      const adminUrl = buildAdminRecordUrl(candidateApplication?.documentId);
      const attachments = await buildEmailAttachments(candidateApplication?.files);
      const emailService = strapi.plugin('email').service('email');
      const emailTasks = [];

      if (recipientEmail) {
        emailTasks.push(
          emailService
            .send({
              to: recipientEmail,
              replyTo: 'info@tallium.com',
              subject: 'We received your CV',
              ...buildEmailPayload()
            })
            .catch((error) => {
              console.error('[candidate-application] Failed to send confirmation email:', error);
            })
        );
      } else {
        console.error(`[candidate-application] Cannot send confirmation email: missing email for id=${candidateApplicationId}`);
      }

      emailTasks.push(
        emailService
          .send({
            to: INTERNAL_NOTIFICATION_EMAIL,
            replyTo: candidateApplication?.email || 'info@tallium.com',
            subject: `New candidate application — ${withFallback(candidateApplication?.fullName)}`,
            attachments,
            ...buildInternalNotificationPayload(candidateApplication, adminUrl)
          })
          .catch((error) => {
            console.error('[candidate-application] Failed to send internal notification email:', error);
          })
      );

      await Promise.all(emailTasks);
    } catch (error) {
      console.error('[candidate-application] Failed to process afterCreate emails:', error);
    }
  }
};
