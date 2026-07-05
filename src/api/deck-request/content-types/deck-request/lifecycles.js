'use strict';

const NOTIFICATION_EMAIL = 'info@tallium.com';
const COMPANY_LOGO_URL = 'https://sincere-positivity-25d680ef23.media.strapiapp.com/Logo_82a3e176ef.svg';

const withFallback = (value) => value || 'N/A';

const buildEmailPayload = (deckRequest) => ({
  text: `A new deck request has been submitted - ${withFallback(deckRequest.fullName)}.

Name: ${withFallback(deckRequest.fullName)}
Email: ${withFallback(deckRequest.email)}
Company: ${withFallback(deckRequest.company)}
Phone: ${withFallback(deckRequest.phone)}
Looking For: ${withFallback(deckRequest.lookingFor)}
Looking For (Other): ${withFallback(deckRequest.lookingForOther)}
Deck Type: ${withFallback(deckRequest.deckType)}
Type: ${withFallback(deckRequest.type)}
Page: ${withFallback(deckRequest.page)}
UTM Campaign: ${withFallback(deckRequest.utm_campaign)}
UTM Medium: ${withFallback(deckRequest.utm_medium)}
UTM Source: ${withFallback(deckRequest.utm_source)}
User Country: ${withFallback(deckRequest.user_country)}
User IP: ${withFallback(deckRequest.user_ip)}`,
  html: `
    <div style="margin:0;padding:24px;background:#f4f6fb;font-family:Arial,sans-serif;color:#1f2937;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <div style="padding:20px 24px;background:#111827;color:#ffffff;">
          <div style="text-align:center;margin-bottom:12px;">
            <img src="${COMPANY_LOGO_URL}" alt="Company logo" style="display:inline-block;max-height:48px;max-width:220px;height:auto;width:auto;" />
          </div>
          <h2 style="margin:0;font-size:20px;line-height:1.3;">New deck request submitted - ${withFallback(deckRequest.fullName)}</h2>
        </div>

        <div style="padding:20px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#6b7280;width:180px;vertical-align:top;"><strong>Name</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(deckRequest.fullName)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Email</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(deckRequest.email)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Company</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(deckRequest.company)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Phone</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(deckRequest.phone)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Looking For</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(deckRequest.lookingFor)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Looking For (Other)</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(deckRequest.lookingForOther)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Deck Type</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(deckRequest.deckType)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Type</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(deckRequest.type)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Page</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(deckRequest.page)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>UTM Campaign</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(deckRequest.utm_campaign)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>UTM Medium</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(deckRequest.utm_medium)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>UTM Source</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(deckRequest.utm_source)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>User Country</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(deckRequest.user_country)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>User IP</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(deckRequest.user_ip)}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  `,
});

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    const deckRequestId = result?.id;

    if (!deckRequestId) {
      console.error('[deck-request] Cannot send email: missing deckRequestId');
      return;
    }

    try {
      const emailPayload = buildEmailPayload(result);

      await strapi.plugin('email').service('email').send({
        to: NOTIFICATION_EMAIL, // TODO: change to the actual email
        replyTo: result?.email || NOTIFICATION_EMAIL,
        subject: `New deck request submitted - ${withFallback(result?.fullName)}`,
        ...emailPayload,
      });
    } catch (err) {
      console.error('[deck-request] Failed to send notification email:', err);
    }
  },
};
