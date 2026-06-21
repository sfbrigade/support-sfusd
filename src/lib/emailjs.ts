import emailjs from "@emailjs/browser";

/**
 * Centralized EmailJS service/template/key configuration.
 * Override any value via the corresponding NEXT_PUBLIC_EMAILJS_* environment variable.
 */
export const emailjsConfig = {
  volunteer: {
    serviceId:
      process.env.NEXT_PUBLIC_EMAILJS_VOLUNTEER_SERVICE_ID ?? "service_itlkzak",
    templateId:
      process.env.NEXT_PUBLIC_EMAILJS_VOLUNTEER_TEMPLATE_ID ?? "template_ee6s74u",
    publicKey:
      process.env.NEXT_PUBLIC_EMAILJS_VOLUNTEER_PUBLIC_KEY ?? "10-NnnxJFw9zLmYPf",
  },
  confirmation: {
    serviceId:
      process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_SERVICE_ID ?? "service_xkteori",
    templateId:
      process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID ?? "template_ldjot9t",
    publicKey:
      process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_PUBLIC_KEY ?? "D8WCCvG0aRMjhfkml",
  },
} as const;

/**
 * Sends a volunteer sign-up email to Support SF and, on success, a confirmation
 * email back to the volunteer. Centralizes the two-step EmailJS send flow shared
 * by SchoolVolunteer and NavBar.
 */
export function sendVolunteerEmail(
  data: Record<string, unknown>,
  callbacks: {
    onSuccess: () => void;
    onError: (reason: unknown) => void;
    onFinally: () => void;
  },
): void {
  const { onSuccess, onError, onFinally } = callbacks;

  emailjs
    .send(
      emailjsConfig.volunteer.serviceId,
      emailjsConfig.volunteer.templateId,
      data,
      { publicKey: emailjsConfig.volunteer.publicKey },
    )
    .then(() => {
      emailjs
        .send(
          emailjsConfig.confirmation.serviceId,
          emailjsConfig.confirmation.templateId,
          data,
          { publicKey: emailjsConfig.confirmation.publicKey },
        )
        .catch((reason: unknown) => {
          console.error(
            "FAILED: error sending volunteer confirmation through EmailJS.",
            reason,
          );
        });
      onSuccess();
    })
    .catch(onError)
    .finally(onFinally);
}
