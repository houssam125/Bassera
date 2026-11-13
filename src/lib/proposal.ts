// Shared by the proposal form (client) and its server action.

export const services = [
  "Website",
  "Web platform",
  "Mobile app",
  "CRM / ERP",
  "Dashboard",
  "Logo & branding",
  "Social media",
  "Video & motion",
  "Print",
  "Other",
] as const;

export interface ProposalValues {
  name: string;
  email: string;
  phone: string;
  services: string[];
  message: string;
}

export type ProposalErrors = Partial<Record<keyof ProposalValues, string>>;

export type ProposalState =
  | { status: "idle"; values: ProposalValues }
  | { status: "invalid"; values: ProposalValues; errors: ProposalErrors }
  | { status: "sent"; values: ProposalValues }
  | { status: "fallback"; values: ProposalValues; mailto: string }
  | { status: "failed"; values: ProposalValues };

export const emptyValues: ProposalValues = { name: "", email: "", phone: "", services: [], message: "" };
