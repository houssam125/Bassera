"use server";

import nodemailer from "nodemailer";
import { team } from "@/data/team";
import { emptyValues, services, type ProposalErrors, type ProposalState, type ProposalValues } from "@/lib/proposal";

// Project proposals from the "Work with us" form are emailed to the team.
//
// Sending uses an SMTP account set in the environment (see .env.example). For the team's
// Gmail address that is smtp.gmail.com with a Google "App password". When SMTP isn't set
// up yet, the form falls back to opening the visitor's email app with the proposal filled in.

const text = (formData: FormData, key: string, max: number) =>
  String(formData.get(key) ?? "")
    .trim()
    .slice(0, max);

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function compose(v: ProposalValues) {
  const subject = `New project proposal — ${v.name.replace(/[\r\n]+/g, " ")}`;
  const body = [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    `Phone: ${v.phone || "—"}`,
    `Needs: ${v.services.length ? v.services.join(", ") : "—"}`,
    "",
    "Project:",
    v.message,
  ].join("\n");
  return { subject, body };
}

export async function proposeProject(_prev: ProposalState, formData: FormData): Promise<ProposalState> {
  const values: ProposalValues = {
    name: text(formData, "name", 120),
    email: text(formData, "email", 200),
    phone: text(formData, "phone", 40),
    services: formData
      .getAll("services")
      .map(String)
      .filter((s): s is (typeof services)[number] => (services as readonly string[]).includes(s)),
    message: text(formData, "message", 5000),
  };

  // Hidden field that people never see; bots that fill every field get a silent "sent".
  if (text(formData, "company_website", 200)) return { status: "sent", values: emptyValues };

  const errors: ProposalErrors = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.message.length < 10) errors.message = "Tell us a little about the project (at least 10 characters).";
  if (Object.keys(errors).length) return { status: "invalid", values, errors };

  const to = process.env.PROPOSALS_TO || team.contact.email;
  const { subject, body } = compose(values);
  const { SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return { status: "fallback", values, mailto };
  }

  const port = Number(process.env.SMTP_PORT || 465);
  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transport.sendMail({
      from: { name: `${team.name} website`, address: SMTP_USER },
      to,
      replyTo: { name: values.name, address: values.email },
      subject,
      text: body,
    });
    return { status: "sent", values: emptyValues };
  } catch (err) {
    console.error("Proposal email failed:", err);
    return { status: "failed", values };
  }
}

