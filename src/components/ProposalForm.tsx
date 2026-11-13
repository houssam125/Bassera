"use client";

import { useActionState, useEffect } from "react";
import { proposeProject } from "@/app/actions/propose";
import { team } from "@/data/team";
import { emptyValues, services, type ProposalState } from "@/lib/proposal";
import { ArrowRight } from "./icons";

const initial: ProposalState = { status: "idle", values: emptyValues };

/** "Propose a project" — sends the proposal to the team's inbox (see app/actions/propose.ts). */
export default function ProposalForm() {
  const [state, action, pending] = useActionState(proposeProject, initial);
  const errors = state.status === "invalid" ? state.errors : {};
  const v = state.values;

  // Email sending isn't configured on this server: hand the proposal to the visitor's email app.
  useEffect(() => {
    if (state.status === "fallback") window.location.href = state.mailto;
  }, [state]);

  const status = {
    idle: "",
    invalid: "Please check the highlighted fields.",
    sent: "Thank you — your proposal is on its way to us. We’ll reply by email.",
    fallback: `Your email app should open with the proposal filled in — just press Send. If it doesn’t, write to ${team.contact.email}.`,
    failed: `Sorry, it couldn’t be sent right now. Please email us at ${team.contact.email}.`,
  }[state.status];

  const err = (name: keyof typeof errors) =>
    errors[name]
      ? { "aria-invalid": true, "aria-describedby": `propose-${name}-error` }
      : {};

  return (
    <form action={action} className="propose">
      <h3>Propose a project</h3>
      <p className="propose-lead">Tell us what you need. It comes straight to our inbox, and we reply by email.</p>

      <div className="field-row">
        <label className="field">
          <span>Your name</span>
          <input name="name" autoComplete="name" required minLength={2} maxLength={120} defaultValue={v.name} {...err("name")} />
          {errors.name && <small id="propose-name-error">{errors.name}</small>}
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={200} defaultValue={v.email} {...err("email")} />
          {errors.email && <small id="propose-email-error">{errors.email}</small>}
        </label>
      </div>

      <label className="field">
        <span>
          Phone <em>optional</em>
        </span>
        <input name="phone" type="tel" autoComplete="tel" maxLength={40} defaultValue={v.phone} />
      </label>

      <fieldset className="field">
        <legend>What do you need?</legend>
        <div className="pick">
          {services.map((s) => (
            <label key={s} className="pick-chip">
              <input type="checkbox" name="services" value={s} defaultChecked={v.services.includes(s)} />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="field">
        <span>About the project</span>
        <textarea
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={5000}
          placeholder="Goals, audience, deadline, budget — anything that helps."
          defaultValue={v.message}
          {...err("message")}
        />
        {errors.message && <small id="propose-message-error">{errors.message}</small>}
      </label>

      {/* Spam trap: hidden from people, filled in by bots. */}
      <input className="hp" type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden />

      <div className="propose-foot">
        <button type="submit" className="btn btn-lime" disabled={pending}>
          {pending ? "Sending…" : "Send proposal"} <ArrowRight />
        </button>
        <p className="propose-status" data-status={state.status} role="status" aria-live="polite">
          {status}
        </p>
      </div>
    </form>
  );
}
