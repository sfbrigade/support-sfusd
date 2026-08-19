import type { CollectionConfig } from "payload";
import { authenticated } from "../access/authenticated.ts";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    useAsTitle: "filename",
  },
  upload: {
    mimeTypes: ["image/*"],
    staticDir: "media",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
