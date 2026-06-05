# Deploying gouru.com (step-by-step)

This guide assumes you are **not** a developer. Follow it top to bottom. It
publishes this site at **https://gouru.com** using **GitHub Pages**, which is
free and serves over HTTPS.

The repository already contains an automated workflow
(`.github/workflows/deploy.yml`). Once set up, **every time you push changes to
the `main` branch, the site rebuilds and republishes automatically** — you never
have to build it by hand.

---

## Step 1 — Push this code to GitHub

The GitHub repository already exists: **`ShubanGouru/gouru.com`**.

> ⚠️ **Account note:** pushing requires the **`ShubanGouru`** account (the one
> that owns the repo). If `git push` is rejected, your computer is likely signed
> in as the read-only `shuban-gouru` account. Switch with `gh auth login` and
> choose `ShubanGouru`, then try again.

From the project folder, in Terminal:

```bash
git add -A
git commit -m "Launch Gouru & Co. LLC marketing site"
git push origin main
```

If you'd rather not use the command line, you can drag the project files into
GitHub's web uploader — but the command above is the simplest.

---

## Step 2 — Confirm GitHub Pages is set to "GitHub Actions"

The workflow **auto-enables** Pages with the correct source on its first run, so
usually there's nothing to do here. To verify:

1. In your browser, go to **https://github.com/ShubanGouru/gouru.com**.
2. Click **Settings** (top menu) → **Pages** (left sidebar).
3. Under **Build and deployment → Source**, it should say **GitHub Actions**.
   If for any reason it still says "Deploy from a branch," switch it to
   **GitHub Actions**.

---

## Step 3 — Confirm the first deploy succeeded

1. Click the **Actions** tab at the top of the repository.
2. You should see a run named **"Deploy to GitHub Pages."** Wait for it to finish
   with a green check (about 1–2 minutes).
3. If it's still yellow/spinning, give it a minute. If it ever goes red, open the
   run to see the error (most often a temporary GitHub hiccup — re-run it).

At this point the site is live at the temporary GitHub address
`https://shubangouru.github.io/gouru.com/`. Next we attach your real domain.

---

## Step 4 — Add the custom domain + enforce HTTPS

1. Back in **Settings → Pages**.
2. Under **Custom domain**, type **`gouru.com`** and click **Save**.
   *(A `CNAME` file is already included in the project, so this should match
   cleanly.)*
3. GitHub will run a **DNS check**. It will show errors until you finish Step 5 —
   that's expected. Do Step 5, then come back.
4. Once DNS is verified (can take from a few minutes up to ~24 hours), the
   **"Enforce HTTPS"** checkbox becomes available. **Tick it.** This forces all
   visitors onto the secure `https://` version — Apple's review requires HTTPS.

---

## Step 5 — Point your domain's DNS at GitHub

> 📍 **Where do you do this?** Wherever **gouru.com's DNS is managed.** Your brief
> said **GoDaddy**, so GoDaddy steps are below. (Heads-up: your earlier setup
> notes suggest gouru.com's DNS may actually live at **Squarespace**. If GoDaddy
> doesn't show a gouru.com DNS zone, add the **same records** in the Squarespace
> domain dashboard instead — the values are identical no matter the provider.)

You will add two things: **A records** for the bare domain (`gouru.com`) and a
**CNAME** for `www`.

### The exact records to add

These IPs are GitHub's **current, officially documented** GitHub Pages addresses
(verified from GitHub's docs):

**A records — host/name `@` (the bare `gouru.com`):**

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**CNAME — for the `www` subdomain:**

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `www` | `shubangouru.github.io` |

> *(Optional but recommended — IPv6 `AAAA` records, also from GitHub's docs. Add
> these too if your provider supports them; skip if it's fiddly.)*
>
> | Type | Name | Value |
> | --- | --- | --- |
> | AAAA | `@` | `2606:50c0:8000::153` |
> | AAAA | `@` | `2606:50c0:8001::153` |
> | AAAA | `@` | `2606:50c0:8002::153` |
> | AAAA | `@` | `2606:50c0:8003::153` |

### Doing it in GoDaddy

1. Sign in at **godaddy.com** → **My Products** → next to **gouru.com** click
   **DNS** (or "Manage DNS").
2. **Delete** any existing **A record** with name `@` that points somewhere else
   (e.g. a GoDaddy parking IP), and delete any **CNAME** named `www` that points
   to a GoDaddy/parked target. *(Leave MX/email records alone if you use email on
   this domain.)*
3. Click **Add** and create the **four A records** from the table above (name
   `@`, one per IP).
4. Click **Add** and create the **CNAME** record: name `www`, value
   `shubangouru.github.io`.
5. Save. DNS changes can take a little while to propagate (often minutes,
   sometimes up to 24 hours).

### Doing it in Squarespace (if that's where the DNS is)

1. Squarespace **Domains dashboard** → select **gouru.com** → **DNS settings**.
2. Remove conflicting preset `@` A records and the `www` CNAME, then add the same
   four **A** records and the **www → `shubangouru.github.io`** CNAME above.
3. Save.

---

## Step 6 — Final check

After DNS propagates:

- Visit **https://gouru.com** — it should load this site over HTTPS.
- Visit **http://gouru.com** — it should redirect to **https://** (because you
  ticked "Enforce HTTPS").
- Visit **https://www.gouru.com** — it should also work and land on the site.
- Confirm the padlock 🔒 shows a valid certificate.

You're live. 🎉

---

## Making changes later

Edit the text (see the table in `README.md`), then:

```bash
git add -A
git commit -m "Update copy"
git push origin main
```

The site rebuilds and redeploys automatically within a couple of minutes.
