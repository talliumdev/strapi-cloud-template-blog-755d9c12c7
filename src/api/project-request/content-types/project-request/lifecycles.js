'use strict';

const NOTIFICATION_EMAIL = 'info@tallium.com';
const EMAIL_DELAY_MS = 4 * 60 * 1000;
const COMPANY_LOGO_URL = 'https://sincere-positivity-25d680ef23.media.strapiapp.com/Logo_82a3e176ef.svg';

const LAPIS_SERVER_EVENTS_URL = 'https://api.trylapis.com/api/v1/pixel/server-events';
const LAPIS_REQUEST_TIMEOUT_MS = 5000;
const LAPIS_MAX_ATTEMPTS = 2;

const withFallback = (value) => value || 'N/A';

const buildEmailPayload = (projectRequest) => ({
  text: `A new project request has been submitted - ${withFallback(projectRequest.fullName)}.

Name: ${withFallback(projectRequest.fullName)}
Email: ${withFallback(projectRequest.email)}
Company: ${withFallback(projectRequest.company)}
Phone: ${withFallback(projectRequest.phone)}
Message: ${withFallback(projectRequest.message)}
Type: ${withFallback(projectRequest.type)}
Page: ${withFallback(projectRequest.page)}
UTM Campaign: ${withFallback(projectRequest.utm_campaign)}
UTM Medium: ${withFallback(projectRequest.utm_medium)}
UTM Source: ${withFallback(projectRequest.utm_source)}
UTM Content: ${withFallback(projectRequest.utm_content)}
UTM Term: ${withFallback(projectRequest.utm_term)}
User Country: ${withFallback(projectRequest.user_country)}
User IP: ${withFallback(projectRequest.user_ip)}
Timeline: ${withFallback(projectRequest.timeline)}
Sources: ${withFallback(projectRequest.sources)}
Sources (Other): ${withFallback(projectRequest.sourcesOtherDescription)}`,
  html: `
    <div style="margin:0;padding:24px;background:#f4f6fb;font-family:Arial,sans-serif;color:#1f2937;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <div style="padding:20px 24px;background:#111827;color:#ffffff;">
          <div style="text-align:center;margin-bottom:12px;">
            <img src="${COMPANY_LOGO_URL}" alt="Company logo" style="display:inline-block;max-height:48px;max-width:220px;height:auto;width:auto;" />
          </div>
          <h2 style="margin:0;font-size:20px;line-height:1.3;">New project request submitted - ${withFallback(projectRequest.fullName)}</h2>
        </div>

        <div style="padding:20px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#6b7280;width:180px;vertical-align:top;"><strong>Name</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.fullName)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Email</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.email)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Company</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.company)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Phone</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.phone)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Type</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.type)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Page</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.page)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>UTM Campaign</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.utm_campaign)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>UTM Medium</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.utm_medium)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>UTM Source</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.utm_source)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>UTM Content</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.utm_content)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>UTM Term</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.utm_term)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>User Country</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.user_country)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>User IP</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.user_ip)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Timeline</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.timeline)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Sources</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.sources)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Sources (Other)</strong></td>
              <td style="padding:8px 0;color:#111827;">${withFallback(projectRequest.sourcesOtherDescription)}</td>
            </tr>
          </table>

          <div style="margin-top:18px;padding-top:16px;border-top:1px solid #e5e7eb;">
            <p style="margin:0 0 8px;color:#6b7280;"><strong>Message</strong></p>
            <p style="margin:0;line-height:1.6;color:#111827;">${withFallback(projectRequest.message).replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      </div>
    </div>
  `,
});

const sendLapisLead = async (projectRequest) => {
  const body = JSON.stringify({
    events: [
      {
        id: `lead_created:${projectRequest.id}`,
        type: 'lead_created',
        timestamp_ms: new Date(projectRequest.createdAt).getTime(),
        action_source: 'web',
        source_url:
          projectRequest.page && projectRequest.page.startsWith('/')
            ? `https://tallium.com${projectRequest.page}`
            : 'https://tallium.com/en/contact-us',
        lapis_click_id: projectRequest.lapis_click_id,
        data: { type: 'customer_action' },
      },
    ],
  });

  for (let attempt = 1; attempt <= LAPIS_MAX_ATTEMPTS; attempt++) {
    const response = await fetch(LAPIS_SERVER_EVENTS_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.LAPIS_SERVER_EVENT_KEY}`,
        'Content-Type': 'application/json',
      },
      body,
      signal: AbortSignal.timeout(LAPIS_REQUEST_TIMEOUT_MS),
    });

    if (response.status < 500) {
      if (response.status === 401 || response.status === 422) {
        console.error(
          `[project-request] Lapis rejected lead id=${projectRequest.id}: ${response.status} ${await response.text()}`
        );
      }
      return;
    }
  }

  console.error(`[project-request] Lapis lead id=${projectRequest.id} not delivered after ${LAPIS_MAX_ATTEMPTS} attempts`);
};

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    const projectRequestId = result?.id;

    if (!projectRequestId) {
      console.error('[project-request] Cannot schedule email: missing projectRequestId');
      return;
    }

    if (result.lapis_click_id && process.env.LAPIS_SERVER_EVENT_KEY) {
      // Not awaited: the form response must not wait for (or fail because of) Lapis
      sendLapisLead(result).catch((err) => {
        console.error(`[project-request] Failed to send lead id=${projectRequestId} to Lapis:`, err);
      });
    }

    setTimeout(async () => {
      try {
        const freshProjectRequest = await strapi.entityService.findOne(
          'api::project-request.project-request',
          projectRequestId
        );

        if (!freshProjectRequest) {
          console.error(`[project-request] Record not found for delayed email, id=${projectRequestId}`);
          return;
        }

        const emailPayload = buildEmailPayload(freshProjectRequest);

        await strapi.plugin('email').service('email').send({
          to: NOTIFICATION_EMAIL, // TODO: change to the actual email
          replyTo: NOTIFICATION_EMAIL,
          subject: `New project request submitted - ${withFallback(freshProjectRequest?.fullName)}`,
          ...emailPayload,
        });
      } catch (err) {
        console.error('[project-request] Failed to send delayed notification email:', err);
      }
    }, EMAIL_DELAY_MS);
  },
};
