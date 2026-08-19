import "server-only";
import { getPayload } from "payload";
import config from "../payload.config.ts";
import type { Media, Opportunity } from "../payload-types.ts";

export type OpportunityWithMedia = Omit<Opportunity, "image"> & {
  image: Media;
};

/**
 * Reads publicly visible opportunities on the server and resolves their media.
 */
export async function getOpportunities(): Promise<OpportunityWithMedia[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "opportunities",
    depth: 1,
    overrideAccess: false,
    pagination: false,
    sort: "-createdAt",
  });

  return result.docs.map((opportunity) => {
    if (typeof opportunity.image === "number") {
      throw new Error(
        `Opportunity ${opportunity.id} returned an unresolved media reference.`,
      );
    }

    return {
      ...opportunity,
      image: opportunity.image,
    };
  });
}
