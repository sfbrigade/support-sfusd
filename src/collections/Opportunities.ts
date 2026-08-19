import type { CollectionConfig } from "payload";
import { authenticated } from "../access/authenticated.ts";

const validateURL = (value: null | string | undefined): string | true => {
  if (!value) {
    return "A URL is required.";
  }

  try {
    const url = new URL(value);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "Enter a URL beginning with http:// or https://.";
    }
  } catch {
    return "Enter a valid absolute URL.";
  }

  return true;
};

export const Opportunities: CollectionConfig = {
  slug: "opportunities",
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "date", "location", "source"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      maxLength: 160,
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      maxLength: 1000,
      required: true,
    },
    {
      name: "date",
      type: "text",
      admin: {
        description:
          'Editor-friendly display text, such as "Fri, Aug 14, 2026 - 9AM-4PM" or "Year-round".',
      },
      maxLength: 160,
      required: true,
    },
    {
      name: "location",
      type: "text",
      maxLength: 200,
      required: true,
    },
    {
      name: "source",
      type: "text",
      maxLength: 100,
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "url",
      type: "text",
      admin: {
        description: "Absolute destination for the future Get Started link.",
      },
      required: true,
      validate: validateURL,
    },
  ],
};
