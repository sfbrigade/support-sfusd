import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Automated Accessibility Suite", () => {
  test("automated scan for WCAG compliance", async ({ page }) => {
    // 1. Load your target Next.js page route
    await page.goto("/");

    // 2. Wait for Next.js to finish client-side hydration
    await page.waitForLoadState("networkidle");

    // 3. Trigger Axe-Core against standard guidelines
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    // 4. Assert no technical validation errors are surfaced
    expect(results.violations).toEqual([]);
  });
});

// NOTE: you can only automate keyboard a11y to an extent;
// manual testing is still required to validate that focus order and placement is intuitive to a human
test("automated keyboard sequence and tab-loop audit", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const focusedElements: string[] = [];
  let previousElementId = "";
  let isLoopFinished = false;

  // Continuously tab until focus returns to the beginning or gets stuck
  while (!isLoopFinished) {
    await page.keyboard.press("Tab");

    const currentInfo = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      return {
        tagName: el.tagName,
        id: el.id || "no-id",
        role: el.getAttribute("role") || "none",
        text: el.textContent?.trim().substring(0, 20) || "no-text",
      };
    });

    // Break if we hit the page body or if focus completely stalls
    if (!currentInfo || currentInfo.id === previousElementId) {
      isLoopFinished = true;
      break;
    }

    // Format a unique identifier for the captured component
    const currentIdentifier = `${currentInfo.tagName}#${currentInfo.id}[role="${currentInfo.role}"]`;

    // If the loop encounters an item it already visited, the cycle is complete
    if (focusedElements.includes(currentIdentifier)) {
      isLoopFinished = true;
    } else {
      focusedElements.push(currentIdentifier);
      previousElementId = currentInfo.id;
    }
  }

  // Print the focus path sequence directly to your terminal logs
  console.log("Captured Tab Navigation Path:", focusedElements);

  // Optional: Assert that focus didn't get trapped immediately
  expect(focusedElements.length).toBeGreaterThan(0);
});
