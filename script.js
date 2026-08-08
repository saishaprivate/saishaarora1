document.documentElement.classList.add("page-ready");

const content = document.querySelector(".content");
const introLayer = document.querySelector("[data-intro]");
const introVideo = document.querySelector("[data-intro-video]");

function revealContent() {
  if (content) content.classList.add("is-revealed");
}

function endIntro() {
  if (!introLayer) {
    revealContent();
    return;
  }
  introLayer.classList.add("is-hidden");
  revealContent();
  setTimeout(() => introLayer.remove(), 650);
}

if (introLayer && introVideo) {
  const maxIntroMs = 4200;
  const fallbackTimer = setTimeout(endIntro, maxIntroMs);

  introVideo.addEventListener("ended", () => {
    clearTimeout(fallbackTimer);
    endIntro();
  });

  introVideo.addEventListener("error", () => {
    clearTimeout(fallbackTimer);
    endIntro();
  });

  introLayer.addEventListener("click", () => {
    clearTimeout(fallbackTimer);
    endIntro();
  });

  introVideo.play().catch(() => {
    clearTimeout(fallbackTimer);
    endIntro();
  });
} else {
  revealContent();
}

const directLinks = document.querySelectorAll("[data-link]");

directLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const url = link.dataset.link;

    if (url) {
      window.location.href = url;
    }
  });
});

const shareBtn = document.querySelector("[data-share]");
const shareSheet = document.querySelector("[data-share-sheet]");
const shareClose = document.querySelector("[data-share-close]");

const shareData = {
  title: document.title,
  text: "Check out Saisha Arora's official links",
  url: window.location.href,
};

function openShareSheet() {
  if (!shareSheet) return;
  shareSheet.hidden = false;
  requestAnimationFrame(() => shareSheet.classList.add("is-open"));
}

function closeShareSheet() {
  if (!shareSheet) return;
  shareSheet.classList.remove("is-open");
  setTimeout(() => {
    shareSheet.hidden = true;
  }, 260);
}

if (shareBtn) {
  shareBtn.addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user dismissed the native share sheet
      }
      return;
    }

    openShareSheet();
  });
}

if (shareClose) {
  shareClose.addEventListener("click", closeShareSheet);
}

const encodedUrl = encodeURIComponent(shareData.url);
const encodedText = encodeURIComponent(shareData.text);
const shareTargets = {
  whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
  telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
  twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
  email: `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodedText}%20${encodedUrl}`,
};

document.querySelectorAll("[data-share-target]").forEach((link) => {
  const target = shareTargets[link.dataset.shareTarget];
  if (target) link.href = target;
  link.addEventListener("click", () => closeShareSheet());
});

const copyLinkBtn = document.querySelector("[data-copy-link]");
if (copyLinkBtn) {
  copyLinkBtn.dataset.copyText = shareData.url;
}

document.querySelectorAll("[data-copy-text]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copyText);
      const toast = btn.querySelector(".copy-toast");
      if (toast) toast.textContent = "Copied!";
      btn.classList.add("is-copied");
      setTimeout(() => btn.classList.remove("is-copied"), 1600);
    } catch (err) {
      // clipboard unavailable; nothing more we can do
    }
  });
});
