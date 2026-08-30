export type QuoteLineItemType = {
  id: string;
  title: string;
  description: string;
  quantity: number;
  unitPrice: number;
  timeline: string;
};

export type QuoteDetailType = {
  id: string;
  slug: string;
  quoteNumber: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  projectTitle: string;
  issueDate: string;
  validUntil: string;
  status: "Draft" | "Sent" | "Accepted" | "Completed";
  summary: string;
  lineItems: QuoteLineItemType[];
  subtotal: number;
  discount?: number;
  total: number;
  estimatedTimeline: string;
  paymentTerms: string;
  terms: string[];
};
