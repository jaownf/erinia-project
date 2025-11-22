const { chromium } = require("playwright");
const { HttpError } = require("../utils/errors");

const OFFICIAL_REGISTRATION_URL =
  process.env.OFFICIAL_REGISTRATION_URL ||
  "http://191.37.246.110:81/cadastro.php";

// Utility: waits for any selector in the list to appear and returns its text
async function getTextFromSelectors(page, selectors) {
  for (const selector of selectors) {
    const element = await page.$(selector);
    if (element) {
      const text = (await element.textContent())?.trim();
      if (text) {
        return { selector, text };
      }
    }
  }
  return null;
}

async function fillField(page, selectors, value, fieldLabel, options = {}) {
  const selectorsArray = Array.isArray(selectors) ? selectors : [selectors];
  for (const selector of selectorsArray) {
    const locator = page.locator(selector).first();
    try {
      await locator.waitFor({ state: "visible", timeout: 6_000 });
      if (typeof options.beforeFill === "function") {
        await options.beforeFill(locator);
      }
      await locator.fill(value);
      return;
    } catch (_) {
      // try next selector
    }
  }

  if (typeof options.fallback === "function") {
    try {
      await options.fallback();
      return;
    } catch (_) {
      // fallback failed, continue to throw generic error
    }
  }

  throw new HttpError(
    500,
    `Campo "${fieldLabel}" (${selectorsArray.join(", ")}) não foi encontrado na página oficial. Atualize os seletores.`
  );
}

async function submitOfficialRegistration(payload) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(OFFICIAL_REGISTRATION_URL, {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    });

    await page.waitForSelector("#formulario", { timeout: 20_000 });
    await page.waitForSelector("#login", { timeout: 15_000 });

    await fillField(page, "#nome", payload.fullName, "Nome completo");
    await fillField(
      page,
      ["#email", 'input[name="email"]', 'input[type="email"]'],
      payload.email,
      "E-mail",
      {
        beforeFill: async (locator) => {
          await locator.focus();
        },
        fallback: async () => {
          const emailInputs = page.locator('#formulario input[type="text"], #formulario input[type="email"]');
          if ((await emailInputs.count()) >= 2) {
            const fallbackLocator = emailInputs.nth(1);
            await fallbackLocator.focus();
            await fallbackLocator.fill(payload.email);
            return;
          }
          throw new Error("Fallback email locator not found");
        },
      }
    );

    const whatsappLocator = page.locator("#zapzap");
    if ((await whatsappLocator.count()) > 0) {
      await whatsappLocator.fill(payload.whatsapp || "");
    }

    await fillField(page, ["#login", 'input[name="login"]'], payload.username, "Usuário");
    await fillField(page, ["#senha", 'input[name="senha"]', 'input[type="password"]'], payload.password, "Senha");

    const submitSelector = 'input[type="submit"][value="Confirmar Apresentação!"]';
    await page.waitForSelector(submitSelector, { timeout: 10_000 });

    // Click submit and wait for navigation/response
    const [response] = await Promise.all([
      page.waitForResponse(
        (response) => response.status() === 200 || response.url().includes("cadastro"),
        { timeout: 15_000 }
      ).catch(() => null),
      page.click(submitSelector),
    ]);

    // Wait a bit for the page to update after submission
    await page.waitForTimeout(2000);

    // Wait for page to settle after submission
    await page.waitForTimeout(3000);

    // Check for error messages first
    const errorSelectors = [
      '[class*="erro"]',
      '[class*="error"]',
      '[id*="erro"]',
      '[id*="error"]',
      '.alert-danger',
      '.error-message',
    ];
    
    for (const selector of errorSelectors) {
      try {
        const errorElement = await page.$(selector);
        if (errorElement) {
          const errorText = (await errorElement.textContent())?.trim() || "";
          if (errorText && errorText.length > 0) {
            throw new HttpError(400, `Erro no formulário oficial: ${errorText}`);
          }
        }
      } catch (err) {
        if (err instanceof HttpError) throw err;
        // Continue checking
      }
    }

    // Try multiple selectors for the confirmation panel
    let successPanel = null;
    const possibleSelectors = [
      ".contexto",
      ".nomeperga",
      '[class*="contexto"]',
      '[class*="confirma"]',
      '[class*="sucesso"]',
    ];

    for (const selector of possibleSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 3000 }).catch(() => null);
        const element = await page.$(selector);
        if (element) {
          // Check if it's actually visible and contains relevant text
          const text = await element.textContent();
          if (text && text.length > 0) {
            successPanel = element;
            break;
          }
        }
      } catch (_) {
        // Try next selector
        continue;
      }
    }

    // If we still don't have a panel, check if the page contains confirmation text
    if (!successPanel) {
      try {
        const bodyText = await page.textContent("body");
        if (bodyText && (bodyText.includes("Login:") || bodyText.includes("Senha:") || bodyText.includes("cadastro"))) {
          // The confirmation is on the page, use body as container
          successPanel = await page.$("body");
        }
      } catch (_) {
        // Continue to error
      }
    }

    if (!successPanel) {
      // Get page info for debugging
      const pageUrl = page.url();
      const pageTitle = await page.title().catch(() => "");
      const bodyText = (await page.textContent("body").catch(() => "") || "").substring(0, 1000);
      
      console.error("=== REGISTRATION DEBUG INFO ===");
      console.error("Page URL:", pageUrl);
      console.error("Page Title:", pageTitle);
      console.error("Body text preview:", bodyText);
      
      throw new HttpError(
        504,
        `Não foi possível obter a confirmação após o envio do formulário. A página pode ter retornado um erro ou o layout mudou. Verifique os logs do servidor para mais detalhes.`
      );
    }

    // Get text from the success panel or entire page
    let successText = "";
    try {
      if (successPanel) {
        successText = (await successPanel.textContent()) || "";
      }
      // Always also get body text as fallback
      const bodyText = (await page.textContent("body")) || "";
      if (bodyText.length > successText.length) {
        successText = bodyText;
      }
    } catch (err) {
      successText = (await page.textContent("body")) || "";
    }
    
    successText = successText.trim();
    
    // Log for debugging
    console.log("Success text preview:", successText.substring(0, 200));
    
    // Extract official login and password from confirmation
    let officialLogin = null;
    let officialPassword = null;
    
    // Try multiple regex patterns to find login and password
    const loginPatterns = [
      /Login:\s*([^\s<>\n]+)/i,
      /Login[:\s]+([^\s<>\n]+)/i,
      /login[:\s]+([^\s<>\n]+)/i,
      /<strong[^>]*>Login:<\/strong>\s*([^\s<>\n]+)/i,
    ];
    
    const passwordPatterns = [
      /Senha:\s*([^\s<>\n]+)/i,
      /Senha[:\s]+([^\s<>\n]+)/i,
      /senha[:\s]+([^\s<>\n]+)/i,
      /<strong[^>]*>Senha:<\/strong>\s*([^\s<>\n]+)/i,
    ];
    
    for (const pattern of loginPatterns) {
      const match = successText.match(pattern);
      if (match && match[1]) {
        officialLogin = match[1].trim();
        break;
      }
    }
    
    for (const pattern of passwordPatterns) {
      const match = successText.match(pattern);
      if (match && match[1]) {
        officialPassword = match[1].trim();
        break;
      }
    }
    
    // Fallback: try to find in strong tags or any HTML elements
    if (!officialLogin || !officialPassword) {
      try {
        const allElements = await page.$$("strong, b, span, div, p");
        for (const element of allElements) {
          const text = (await element.textContent())?.trim() || "";
          if (text.match(/^Login:/i) || text.match(/^login:/i)) {
            const nextText = await element.evaluate((el) => {
              let node = el.nextSibling;
              while (node && node.nodeType !== 1) {
                node = node.nextSibling;
              }
              return node ? node.textContent?.trim() : "";
            });
            if (nextText) officialLogin = nextText;
          }
          if (text.match(/^Senha:/i) || text.match(/^senha:/i)) {
            const nextText = await element.evaluate((el) => {
              let node = el.nextSibling;
              while (node && node.nodeType !== 1) {
                node = node.nextSibling;
              }
              return node ? node.textContent?.trim() : "";
            });
            if (nextText) officialPassword = nextText;
          }
        }
      } catch (_) {
        // Continue with fallback values
      }
    }
    
    // Final fallback to form values
    if (!officialLogin) officialLogin = payload.username;
    if (!officialPassword) officialPassword = payload.password;
    
    // Try to get displayed name
    let displayedName = payload.fullName;
    try {
      const nomeElement = await page.$(".nomeperga");
      if (nomeElement) {
        const nomeText = (await nomeElement.textContent())?.trim();
        if (nomeText) displayedName = nomeText;
      }
    } catch (_) {
      // Use fallback
    }

    return {
      playerName: displayedName,
      officialLogin,
      officialPassword,
    };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }

    if (error.message?.includes("net::")) {
      throw new HttpError(503, "Falha ao se conectar ao site oficial. Tente novamente.");
    }

    throw new HttpError(
      500,
      `Erro ao automatizar o cadastro: ${error.message || "motivo desconhecido"}`
    );
  } finally {
    await browser.close();
  }
}

module.exports = {
  submitOfficialRegistration,
  OFFICIAL_REGISTRATION_URL,
};
